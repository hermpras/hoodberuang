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

/**
 * Adds the Bearlist role to a user after a successful claim.
 * Additive only — never removes the verified-holder role that granted
 * eligibility. Failures here are logged but treated as non-fatal by the
 * caller, since the claim itself (the database record) is the source of
 * truth, not the Discord role.
 */
export async function assignBearlistRole(
  discordUserId: string,
): Promise<{ success: boolean }> {
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const guildId = CLAIM_CONFIG.GUILD_ID;
  const bearlistRoleId = CLAIM_CONFIG.BEARLIST_ROLE_ID;

  if (!botToken || !guildId || !bearlistRoleId) {
    console.error(
      "Bearlist role assignment is misconfigured (missing bot token, guild ID, or DISCORD_BEARLIST_ROLE_ID).",
    );
    return { success: false };
  }

  try {
    const res = await fetch(
      `${DISCORD_API_BASE}/guilds/${guildId}/members/${discordUserId}/roles/${bearlistRoleId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bot ${botToken}`,
        },
      },
    );

    // Discord returns 204 No Content on success.
    if (!res.ok && res.status !== 204) {
      console.error(
        `Failed to assign Bearlist role: ${res.status} ${res.statusText}. ` +
          `Check that the bot has "Manage Roles" permission and that its own role is positioned above the Bearlist role in Server Settings > Roles.`,
      );
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error("Bearlist role assignment request failed:", error);
    return { success: false };
  }
}
