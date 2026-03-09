import NextAuth from "next-auth"

declare module "next-auth" {

    interface Session {
        user: User
    }
    
    interface User {
        token: string,   
        user_id: number,    
    }

}

declare module "next-auth/jwt" {
    interface JWT {
        token?: string,
        user: User
    }
}