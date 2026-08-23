import { CLAIM_CONFIG } from "@/config/constants";

const DISCORD_API_BASE = "https://discord.com/api/v10";

export interface VerifiedRoleResult {
  eligible: boolean;
  matchedRoleId: string | null;
}

/**
 * Checks whether a Discord user (by ID) currently holds one of the
 * configured "Verified Holder" roles in the HoodBear guild.
 *
 * Requires the bot (added to the guild in the OAuth2 setup step) to have
 * the Server Members Intent enabled, and to have been invited with the
 * `bot` scope + View Channels permission.
 */
export async function checkVerifiedRole(
  discordUserId: string,
): Promise<VerifiedRoleResult> {
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const guildId = CLAIM_CONFIG.GUILD_ID;
  const verifiedRoleIds = CLAIM_CONFIG.VERIFIED_ROLE_IDS;

  if (!botToken || !guildId || verifiedRoleIds.length === 0) {
    console.error(
      "Discord claim verification is misconfigured (missing bot token, guild ID, or role IDs).",
    );
    return { eligible: false, matchedRoleId: null };
  }

  const res = await fetch(
    `${DISCORD_API_BASE}/guilds/${guildId}/members/${discordUserId}`,
    {
      headers: {
        Authorization: `Bot ${botToken}`,
      },
      // Always fetch fresh — role membership can change at any time.
      cache: "no-store",
    },
  );

  if (res.status === 404) {
    // User authenticated with Discord but isn't a member of the guild.
    return { eligible: false, matchedRoleId: null };
  }

  if (!res.ok) {
    console.error(
      `Discord guild member lookup failed: ${res.status} ${res.statusText}`,
    );
    return { eligible: false, matchedRoleId: null };
  }

  const member = await res.json();
  const memberRoleIds: string[] = member?.roles || [];

  const matchedRoleId =
    memberRoleIds.find((roleId) => verifiedRoleIds.includes(roleId)) || null;

  return {
    eligible: matchedRoleId !== null,
    matchedRoleId,
  };
}
