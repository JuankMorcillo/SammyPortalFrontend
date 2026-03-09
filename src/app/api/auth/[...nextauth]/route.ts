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
                        url: `${process.env.NEXT_PUBLIC_REQ_RES_URL}login`,
                        method: 'POST' as const,
                        body: credentials,
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': `${process.env.NEXT_PUBLIC_API_REQ_RES_KEY}`
                        }
                    }

                    const res = await FetchApi(options)
                    let user_id = { id: 0 };

                    if (res) {

                        if (res.token) {
                            const options: OptionsProps = {
                                url: `${API_BASE_URL}/users/${credentials?.email}`,
                                method: 'GET' as const,
                            }
                            user_id = await FetchApi(options);
                        }

                        return { ...res, email: credentials?.email, user_id: user_id.id };
                    }

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
                token.token = user.token
                token.email = user.email
                token.user_id = user.user_id
            }
            return token
        },
        session({ session, token }) {

            if (token && session.user) {
                session.user.token = token.token as string
                session.user.email = token.email as string
                session.user.user_id = token.user_id as number
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