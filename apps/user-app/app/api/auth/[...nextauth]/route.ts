import NextAuth from "next-auth"
import { authOptions } from "../../../lib/auth"

console.log(process.env.NEXTAUTH_URL+" "+process.env.NEXTAUTH_URL_USER);
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }