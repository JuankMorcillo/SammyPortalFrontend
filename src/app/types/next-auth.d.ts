import NextAuth from "next-auth"

declare module "next-auth" {

    interface Session {
        user: User
    }
    
    interface User {
        accessToken: string,   
        id: number,    
    }

}

declare module "next-auth/jwt" {
    interface JWT {
        token?: string,
        user: User
    }
}