import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      // We only need identity — no email, no guild list, nothing extra.
      authorization: { params: { scope: "identify" } },
    }),
  ],
  session: {
    // JWT sessions — no session table needed, keeps this fully
    // separate from the applications/claim_applications database work.
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, profile }) {
      // `profile` is only present on the initial sign-in request.
      if (profile?.id) {
        token.discordId = profile.id as string;
        token.discordUsername = (profile.username as string) || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (token.discordId) {
        session.user.discordId = token.discordId as string;
        session.user.discordUsername = (token.discordUsername as string) || "";
      }
      return session;
    },
  },
});