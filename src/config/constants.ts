/**
 * HoodBear Single-Source-of-Truth Social Constants & Configuration
 * Used across Phase 2 Allowlist Application checklist & social links.
 */

export const HOODBEAR_CONFIG = {
  // Official HoodBear X Profile URL (Task 01)
  X_PROFILE_URL:
    process.env.NEXT_PUBLIC_HOODBEAR_X_URL || "https://x.com/hoodbearNFT",

  // Official HoodBear Featured Post URL for Like & RT (Task 02) and Comment (Task 03)
  X_POST_URL:
    process.env.NEXT_PUBLIC_HOODBEAR_POST_URL ||
    "https://x.com/hoodbearNFT/status/2097682620880650432?s=20",

  // Official HoodBear Discord invite URL
  DISCORD_URL:
    process.env.NEXT_PUBLIC_HOODBEAR_DISCORD_URL ||
    "https://discord.gg/peGeJTtn8",

  // Collection metadata
  TOTAL_SUPPLY: "5,555",
  ALLOWLIST_MAX_PER_WALLET: 1,
} as const;

/**
 * Config for the partner-collection holder claim flow (/claim).
 * Fully independent from HOODBEAR_CONFIG above.
 */
export const CLAIM_CONFIG = {
  // Total number of WL spots reserved for partner-collection holders.
  // Adjustable at any time via env var — no code changes needed.
  ALLOCATION: Number(process.env.NEXT_PUBLIC_CLAIM_ALLOCATION || 3000),

  // Discord server (guild) users must be a member of to verify.
  GUILD_ID: process.env.DISCORD_GUILD_ID || "",

  // Comma-separated list of role IDs that count as "verified holder"
  // (one per partner collection configured in Vulcan).
  VERIFIED_ROLE_IDS: (process.env.DISCORD_VERIFIED_ROLE_IDS || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean),

  // Role auto-assigned on a successful claim (added alongside whichever
  // verified-holder role the user already has — never removed).
  BEARLIST_ROLE_ID: process.env.DISCORD_BEARLIST_ROLE_ID || "",
} as const;
