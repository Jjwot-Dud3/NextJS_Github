import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github"

//Define el provider de autenticacion(Github) y le setea los token del .env 
const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ]
})

export {handler as GET, handler as POST};