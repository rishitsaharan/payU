"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { AppBar } from "@repo/ui/appbar";

export default function Page(): JSX.Element {
  const session = useSession();
  return (
   <div>
      <AppBar onSignIn={signIn} onSignOut={signOut} user={session.data?.user} />
   </div>
  );
}