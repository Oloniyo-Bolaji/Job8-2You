import GoogleProvider from "next-auth/providers/google"
import { usersTable } from "@app/database/schema"
import { eq } from "drizzle-orm"
import { db } from "@app/database/index"

// Extend token and session types with role/id
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Check if user already exists
      const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, user.email))
        .then(res => res[0])

      // Create user if not found
      if (!existingUser) {
        await db.insert(usersTable).values({
          name: user.name ?? '',
          email: user.email,
          image: user.image ?? '',
          role: 'employee', 
        })
      }

      return true
    },

    async jwt({ token, user }) {
      // Only on first login, `user` is available
      if (user?.email) {
        const dbUser = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, user.email))
          .then(res => res[0])

        if (dbUser) {
          token.id = dbUser.id
          token.role = dbUser.role
        }
      }
      return token
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
}
