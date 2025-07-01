import NextAuth from 'next-auth'
import { authOptions } from './authOptions.js'



export const { auth, handlers } = NextAuth(authOptions)
