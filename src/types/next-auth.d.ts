import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user_account: {
      user_id: any
    }
    name: string
  }
  interface User {
    user_account: any
    name: string
  }
}

declare module 'next-auth/jwt' {
  interface User_Account {
    email: string
    user_id: any
    name: string
  }
  interface JWT {
    user_account?: any
    name: string
  }
}
