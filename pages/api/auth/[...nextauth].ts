import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"

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
        console.log(credentials)
        // const { email, password } = credentials as { email: string, password: string };
        return { email: 'correo@goeew.com', name: 'Carlos M', role: 'admin' } as unknown as User;
      }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],

  // Callbacks
  callbacks: {
    async jwt({ token, account, user }:any) {
      
      if( account ) {
        token.accessToken = account.access_token;
      
        switch( account.type ) {
          case 'oauth':
            // TODO: crear usuario o verificar si existe en la db
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