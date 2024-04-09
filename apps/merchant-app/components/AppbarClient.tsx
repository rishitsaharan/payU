"use client"
import { AppBar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export const AppbarClient = () => {
    const session = useSession();
    const router = useRouter();

    async function handleSignOut(){
        await signOut();
        router.push("/api/auth/signin");
    }
    return (
        <div>
            <AppBar title="PayU for Merchant" onSignIn={signIn} onSignOut={handleSignOut} user={session.data?.user}/>
        </div>
    )
}