// Third-party Imports
import CredentialProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'

import axios from 'axios'

export const authOptions: NextAuthOptions = {
  // ** Configure one or more authentication providers
  // ** Please refer to https://next-auth.js.org/configuration/options#providers for more `providers` options
  providers: [
    CredentialProvider({
      // ** The name to display on the sign in form (e.g. 'Sign in with...')
      // ** For more details on Credentials Provider, visit https://next-auth.js.org/providers/credentials
      name: 'Credentials',
      type: 'credentials',

      /*
       * As we are using our own Sign-in page, we do not need to change
       * username or password attributes manually in following credentials object.
       */
      credentials: {},
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials as { email: string; password: string }

        console.log(email)

        if (!email || !password) {
          throw new Error('Credentials not provided')
        }

        try {
          // ** Check if the provided credentials match the admin credentials
          let user = null

          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
            email: email,
            password: password
          })

          user = {
            user_account: res.data.user,
            name: 'admin'
          }

          if (res.status === 200) {
            return user
          } else {
            return null
          }

          // const users = await pool
          //   .request()
          //   .input('user_email', sql.VarChar, email)
          //   .query(`SELECT * FROM engineers WHERE user_email = @user_email`)

          // if (users.recordset.length === 0) {
          //   return null
          // }

          // const dbUser = users.recordset[0]

          // const isValid = await comparePassword(password, dbUser.user_password)

          // if (!isValid) {
          //   throw new Error('Invalid email or password')
          // }

          // user = {
          //   user_account: dbUser,
          //   name: 'admin'
          // }

          // return user
        } catch (e: any) {
          // Handle error and return null to indicate failed authentication
          console.error(e.message)

          return null
        }
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })

    // ** ...add more providers here
  ],

  // ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
  session: {
    /*
     * Choose how you want to save the user session.
     * The default is `jwt`, an encrypted JWT (JWE) stored in the session cookie.
     * If you use an `adapter` however, NextAuth default it to `database` instead.
     * You can still force a JWT session by explicitly defining `jwt`.
     * When using `database`, the session cookie will only contain a `sessionToken` value,
     * which is used to look up the session in the database.
     * If you use a custom credentials provider, user accounts will not be persisted in a database by NextAuth.js (even if one is configured).
     * The option to use JSON Web Tokens for session tokens must be enabled to use a custom credentials provider.
     */
    strategy: 'jwt',

    // ** Seconds - How long until an idle session expires and is no longer valid
    maxAge: 30 * 24 * 60 * 60 // ** 30 days
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
  pages: {
    signIn: '/login'
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
  callbacks: {
    /*
     * While using `jwt` as a strategy, `jwt()` callback will be called before
     * the `session()` callback. So we have to add custom parameters in `token`
     * via `jwt()` callback to make them accessible in the `session()` callback
     */
    async jwt({ token, user }) {
      if (user) {
        /*
         * For adding custom parameters to user in session, we first need to add those parameters
         * in token which then will be available in the `session()` callback
         */
        token.user_account = user.user_account // Adjust according to the structure of the user object you wish to persist in the token
        token.name = user.name
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // ** Add custom params to user in session which are added in `jwt()` callback via `token` parameter
        session.user_account = token.user_account // Ensure the session reflects the structure you need on the client side
        session.user.name = token.name
      }

      return session
    }
  }
}
