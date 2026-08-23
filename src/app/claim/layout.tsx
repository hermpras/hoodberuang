import { SessionProvider } from "next-auth/react";

export default function ClaimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
