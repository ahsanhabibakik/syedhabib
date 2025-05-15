import NextAuth from 'next-auth';
import { getAuthOptions } from '@/lib/auth.config';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const authOptions = await getAuthOptions();
  return NextAuth(authOptions)(req);
}

export async function POST(req: NextRequest) {
  const authOptions = await getAuthOptions();
  return NextAuth(authOptions)(req);
}