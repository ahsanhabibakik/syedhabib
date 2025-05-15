import NextAuth from 'next-auth';
import { getAuthOptions } from '@/lib/auth.config';
import { NextAuthOptions } from 'next-auth';

const handler = NextAuth(getAuthOptions() as NextAuthOptions);

export { handler as GET, handler as POST };