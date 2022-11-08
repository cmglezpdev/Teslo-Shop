import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import { dbUsers } from "../../../database"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [

    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@email.com' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },

      async authorize( credentials, req ) {
        const { email = '', password = '' } = credentials as { email: string, password: string };
        return await dbUsers.checkUserEmailPassword(email, password) as unknown as User;
      }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],

  // custom pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },

  // Callbacks
  callbacks: {
    async jwt({ token, account, user }:any) {
      
      if( account ) {
        token.accessToken = account.access_token;
      
        switch( account.type ) {
          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
            break;

          case 'credentials':
            token.user = user;
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }:any) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    }
  }
}

export default NextAuth(authOptions)