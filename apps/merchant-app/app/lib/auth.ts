import GoogleProvider from "next-auth/providers/google";
import prisma from "@repo/db/client";

export const authOptions = {
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
          })
    ],
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            const { name, email } = token;

            // Check if the user exists in the database
            let merchant = await prisma.merchant.findUnique({
                where: { email: email },
            });

            // If the user doesn't exist, create a new user in the database
            if (!merchant) {
                merchant = await prisma.merchant.create({
                    data: {
                        email: email,
                        name: name,
                        auth_type : "Google"
                    }
                });
            }
            // console.log(session.user.id);
            session.user.id = merchant.id
            // console.log(session.user.id);
            return session
        }
    }

}