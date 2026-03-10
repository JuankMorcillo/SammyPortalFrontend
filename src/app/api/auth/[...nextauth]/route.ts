import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { FetchApi } from '@/src/lib/api/fetchApi'
import { API_BASE_URL } from "@/src/lib/api/config"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password"
                },
            },
            async authorize(credentials, req) {
                try {

                    const options = {
                        url: `${API_BASE_URL}/auth/login`,
                        method: 'POST' as const,
                        body: credentials,
                    }

                    const res = await FetchApi(options)

                    if (res) return { ...res, email: credentials?.email };


                } catch (error) {
                    console.error("Authorize Error:", error);
                    return null;
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.token = user.accessToken
                token.email = user.email
                token.user_id = user.id
            }
            return token
        },
        session({ session, token }) {

            if (token && session.user) {
                session.user.accessToken = token.token as string
                session.user.email = token.email as string
                session.user.id = token.user_id as number
            }
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 8 * 60 * 60, // 8 hours
    },
    pages: {
        signIn: 'login'
    }
})

export { handler as GET, handler as POST }