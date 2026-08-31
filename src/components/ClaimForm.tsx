"use client";

import { useCallback, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  AlertCircle,
  CheckCircle2,
  LogIn,
  LogOut,
  RefreshCw,
} from "lucide-react";
import Turnstile from "@/components/Turnstile";

const ETH_WALLET_REGEX = /^0x[a-fA-F0-9]{40}$/;

interface ClaimStatus {
  claimed: number;
  allocation: number;
  full: boolean;
  eligible: boolean | null;
}

export default function ClaimForm() {
  const { data: session, status: sessionStatus } = useSession();

  const [claimStatus, setClaimStatus] = useState<ClaimStatus | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/claim");
      const data = await res.json();
      setClaimStatus(data);
    } catch {
      // Non-fatal — counter just won't render if this fails.
    }
  }, []);

  // Fetch the live allocation counter on mount (and after a successful
  // claim, or when the session status changes e.g. right after login).
  useEffect(() => {
    fetchStatus();
  }, [isSubmitted, sessionStatus, fetchStatus]);

  async function handleRefreshStatus() {
    setIsRefreshing(true);
    setErrorMsg(null);
    await fetchStatus();
    setIsRefreshing(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedWallet = walletAddress.trim();
    if (!trimmedWallet || !ETH_WALLET_REGEX.test(trimmedWallet)) {
      setErrorMsg("Please enter a valid wallet address.");
      return;
    }
    if (!turnstileToken) {
      setErrorMsg("Please complete the verification challenge.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: trimmedWallet,
          turnstileToken,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setTurnstileToken(null);
        setTurnstileKey((k) => k + 1);
        return;
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Claim submission error:", err);
      setErrorMsg("Something went wrong. Please try again.");
      setTurnstileToken(null);
      setTurnstileKey((k) => k + 1);
    } finally {
      setIsSubmitting(false);
    }
  }

  const isFull = claimStatus?.full ?? false;

  return (
    <div className="bg-hood-card border-2 border-hood-primary rounded-hood-lg p-6 sm:p-8 shadow-hood space-y-6">
      {/* ALLOCATION COUNTER */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-hood-primary">
          <span>Bearlist Claimed</span>
          <span className="font-pixel text-hood-accent">
            {claimStatus
              ? `${claimStatus.claimed.toLocaleString()} / ${claimStatus.allocation.toLocaleString()}`
              : "—"}
          </span>
        </div>
        <div className="h-2.5 w-full rounded-hood bg-hood-bg border border-hood-primary/30 overflow-hidden">
          <div
            className="h-full bg-hood-accent transition-all duration-500"
            style={{
              width: claimStatus
                ? `${Math.min(
                    100,
                    (claimStatus.claimed / claimStatus.allocation) * 100,
                  )}%`
                : "0%",
            }}
          />
        </div>
      </div>

      {/* FULL STATE — overrides everything else below */}
      {isFull && !isSubmitted && (
        <div className="text-center py-8 space-y-2 border-t-2 border-hood-primary/20 pt-6">
          <h3 className="font-display text-2xl font-bold text-hood-primary uppercase">
            The Hood Is Full
          </h3>
          <p className="text-sm text-hood-primary/80 font-medium">
            All {claimStatus?.allocation.toLocaleString()} allocation spots are
            claimed. Stay tuned for the next move.
          </p>
        </div>
      )}

      {/* SUCCESS STATE */}
      {isSubmitted && (
        <div className="text-center py-8 space-y-3 border-t-2 border-hood-primary/20 pt-6">
          <CheckCircle2 className="w-10 h-10 text-hood-accent mx-auto" />
          <h3 className="font-display text-2xl font-bold text-hood-primary uppercase">
            Claim Received
          </h3>
          <p className="text-sm text-hood-primary/80 font-medium">
            Your wallet is locked in for the HoodBear allowlist.
          </p>
        </div>
      )}

      {/* NOT LOGGED IN */}
      {!isSubmitted && !isFull && sessionStatus !== "authenticated" && (
        <div className="border-t-2 border-hood-primary/20 pt-6 space-y-4">
          <p className="text-sm text-hood-primary/80 font-medium">
            Log in with Discord to check your verified holder status and claim
            your spot.
          </p>
          <button
            onClick={() => signIn("discord")}
            disabled={sessionStatus === "loading"}
            className="w-full py-4 px-6 rounded-hood font-display text-sm uppercase tracking-wider font-bold border-2 border-hood-primary bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-hood hover:shadow-hood-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            LOGIN WITH DISCORD
          </button>
        </div>
      )}

      {/* LOGGED IN BUT NOT VERIFIED */}
      {!isSubmitted &&
        !isFull &&
        sessionStatus === "authenticated" &&
        claimStatus &&
        claimStatus.eligible === false && (
          <div className="border-t-2 border-hood-primary/20 pt-6 space-y-4">
            <div className="p-4 rounded-hood bg-amber-500/10 border-2 border-amber-700/30 text-amber-900 text-sm font-bold flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                You need to verify as a holder in one of our partner collections
                first. Head to the{" "}
                <span className="font-pixel text-xs">#verify-holder</span>{" "}
                channel in the HoodBear Discord, then hit refresh below.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefreshStatus}
                disabled={isRefreshing}
                className="text-xs font-bold text-hood-primary hover:text-hood-accent transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
                />
                {isRefreshing ? "Checking..." : "Refresh Status"}
              </button>
              <button
                onClick={() => signOut()}
                className="text-xs font-bold text-hood-primary/60 hover:text-hood-accent transition-colors flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                Log out
              </button>
            </div>
          </div>
        )}

      {/* LOGGED IN & VERIFIED — wallet form */}
      {!isSubmitted &&
        !isFull &&
        sessionStatus === "authenticated" &&
        claimStatus?.eligible === true && (
          <form
            onSubmit={handleSubmit}
            className="border-t-2 border-hood-primary/20 pt-6 space-y-4"
          >
            <div className="flex items-center justify-between text-xs font-bold text-hood-primary/70">
              <span>
                Logged in as{" "}
                <span className="text-hood-primary">
                  {session?.user?.discordUsername || session?.user?.name}
                </span>
              </span>
              <button
                type="button"
                onClick={() => signOut()}
                className="flex items-center gap-1 hover:text-hood-accent transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Log out
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-hood-primary">
                Wallet Address <span className="text-hood-accent">*</span>
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="0x... or wallet address"
                className="w-full px-4 py-3.5 rounded-hood border-2 border-hood-primary bg-hood-bg text-hood-primary font-medium placeholder:text-hood-primary/40 focus:outline-none focus:border-hood-accent transition-colors"
              />
              <p className="text-xs text-hood-primary/60">
                Enter a valid Ethereum-compatible wallet address. Manual input
                only — no wallet connection required.
              </p>
            </div>

            <div className="pt-1">
              <Turnstile
                key={turnstileKey}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                onVerify={(token) => {
                  setTurnstileToken(token);
                  setErrorMsg(null);
                }}
                onExpire={() => setTurnstileToken(null)}
              />
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-hood bg-red-500/10 border-2 border-red-700/30 text-red-800 text-xs font-bold flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !turnstileToken}
              className={`w-full py-4 px-6 rounded-hood font-display text-sm uppercase tracking-wider font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                !isSubmitting && turnstileToken
                  ? "bg-hood-accent hover:bg-amber-700 text-hood-light border-hood-primary shadow-hood hover:shadow-hood-sm hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
                  : "bg-hood-secondary/30 text-hood-primary/40 border-hood-secondary/60 cursor-not-allowed shadow-none"
              }`}
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT CLAIM"}
            </button>
          </form>
        )}
    </div>
  );
}
