import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { claimDbOperations } from "@/db";
import { checkVerifiedRole, assignBearlistRole } from "@/lib/discord";
import { CLAIM_CONFIG } from "@/config/constants";

const ETH_WALLET_REGEX = /^0x[a-fA-F0-9]{40}$/;
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

async function verifyTurnstileToken(
  token: string,
  remoteIp: string | null,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not set.");
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secret);
    formData.append("response", token);
    if (remoteIp) formData.append("remoteip", remoteIp);

    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body: formData,
    });

    const outcome = await res.json();
    return outcome?.success === true;
  } catch (error) {
    console.error("Turnstile verification request failed:", error);
    return false;
  }
}

// GET — public allocation counter, used by the /claim page to render
// "X / Y CLAIMED" and to know whether to show the full state. If the
// caller has an authenticated session, also reports their verified-role
// eligibility so the UI can gate the wallet form before submit.
export async function GET() {
  try {
    const claimed = await claimDbOperations.count();
    const session = await auth();

    let eligible: boolean | null = null;
    if (session?.user?.discordId) {
      const result = await checkVerifiedRole(session.user.discordId);
      eligible = result.eligible;
    }

    return NextResponse.json({
      claimed,
      allocation: CLAIM_CONFIG.ALLOCATION,
      full: claimed >= CLAIM_CONFIG.ALLOCATION,
      eligible,
    });
  } catch (error) {
    console.error("Failed to fetch claim count:", error);
    return NextResponse.json(
      { error: "Failed to load claim status." },
      { status: 500 },
    );
  }
}

// POST — submit a claim. Requires an authenticated Discord session with
// a verified holder role, a valid Turnstile token, and an open allocation.
export async function POST(request: Request) {
  try {
    // 1. Session check
    const session = await auth();
    const discordId = session?.user?.discordId;
    const discordUsername = session?.user?.discordUsername || "unknown";

    if (!discordId) {
      return NextResponse.json(
        { error: "You must be logged in with Discord to claim." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { walletAddress, turnstileToken } = body || {};

    // 2. Turnstile check
    if (typeof turnstileToken !== "string" || !turnstileToken) {
      return NextResponse.json(
        { error: "Verification challenge missing. Please try again." },
        { status: 400 },
      );
    }
    const remoteIp =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      null;
    const isHuman = await verifyTurnstileToken(turnstileToken, remoteIp);
    if (!isHuman) {
      return NextResponse.json(
        { error: "Verification failed. Please try again." },
        { status: 403 },
      );
    }

    // 3. Wallet validation
    const trimmedWallet =
      typeof walletAddress === "string" ? walletAddress.trim() : "";
    if (!trimmedWallet || !ETH_WALLET_REGEX.test(trimmedWallet)) {
      return NextResponse.json(
        { error: "Please enter a valid wallet address." },
        { status: 400 },
      );
    }

    // 4. Role check (server-side — never trust the client on this)
    const { eligible, matchedRoleId } = await checkVerifiedRole(discordId);
    if (!eligible) {
      return NextResponse.json(
        {
          error:
            "You need to verify as a holder in one of our partner collections first.",
        },
        { status: 403 },
      );
    }

    // 5. Allocation check (best-effort — small overshoot possible under
    // concurrent load, accepted tradeoff per project decision)
    const claimedCount = await claimDbOperations.count();
    if (claimedCount >= CLAIM_CONFIG.ALLOCATION) {
      return NextResponse.json(
        { error: "THE HOOD IS FULL — all allocation spots are claimed." },
        { status: 409 },
      );
    }

    // 6. Duplicate checks
    const existingDiscord = await claimDbOperations.findByDiscordId(discordId);
    if (existingDiscord) {
      return NextResponse.json(
        { error: "THIS DISCORD ACCOUNT HAS ALREADY CLAIMED." },
        { status: 409 },
      );
    }

    const existingWallet = await claimDbOperations.findByWallet(trimmedWallet);
    if (existingWallet) {
      return NextResponse.json(
        { error: "THIS WALLET HAS ALREADY CLAIMED." },
        { status: 409 },
      );
    }

    // 7. Save
    const record = await claimDbOperations.createClaim({
      discordId,
      discordUsername,
      walletAddress: trimmedWallet,
      verifiedCollection: matchedRoleId,
    });

    // 8. Assign the Bearlist role (best-effort — the database record above
    // is the source of truth for the claim; a role-assignment hiccup
    // should never make a successful claim look like it failed).
    await assignBearlistRole(discordId);

    return NextResponse.json({
      success: true,
      message: "Your HoodBear claim has been received.",
      claim: {
        id: record.id,
        walletAddress: record.walletAddress,
      },
    });
  } catch (error) {
    console.error("Claim submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
