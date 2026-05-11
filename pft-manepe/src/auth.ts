import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      // Define los campos esperados
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { correo: credentials.email as string }
        })

        if (!user || !user.contrasena) return null

        const isValid = await bcrypt.compare(
          credentials.password as string, 
          user.contrasena
        )

        return isValid ? { id: user.id, name: user.nombre, email: user.correo } : null
      }
    })
  ]
})