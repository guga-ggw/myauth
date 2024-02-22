import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '@/lib/prismadb'
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider  from "next-auth/providers/credentials";


export default NextAuth({
    adapter : PrismaAdapter(prisma),
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID as string,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        // }),
        CredentialsProvider({
            name : 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Email and password are required')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user || !user.hashedPassword){
                    throw new Error('Invalid email or password')
                }

                const isCorrectPassword = user.hashedPassword == credentials.password ? true : false

                if(!isCorrectPassword) throw new Error('Invalid password')

                return user
            }
        })
  ],
  pages : {
    signIn : 'SignIn'
  },
  debug : process.env.NODE_ENV === 'development',
  session : {
    strategy : "jwt"
  },
  secret : process.env.NEXTAUTH_SECRET
})