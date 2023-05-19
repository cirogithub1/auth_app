import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"

import connectMongo from '../../../database/conn'

import Users from '../../../model/Schema'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_CALETA,
    }),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_CALETA
		}),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        connectMongo().catch((error) => {error:"Connection to Mongo failed...!"})

        // search in Mongo for the user
        const user = await Users.findOne({email:credentials.email})
        if (!user) {throw new Error("No user found...")}
        const checkPwd = await compare(credentials.password, user.password)
        if (!checkPwd || user.email !== credentials.email) {
          console.log("User doesn't match..., checkPwd =", checkPwd)
          throw new Error("User doesn't match...")
        }
        return user
      }
    })
    // ...add more providers here
  ],
  //in the command line: openssl rand -base64 32
  secret: process.env.NEXTAUTH_CALETA
}

export default NextAuth(authOptions)
