import { getAuthOptions } from '@/lib/auth.config';
import NextAuth from 'next-auth';
import { env } from '@/lib/env';

const handler = async (req: any, res: any) => {
  try {
    const authOptions = await getAuthOptions();
    // @ts-ignore - NextAuth type issue
    return await NextAuth(req, res, {
      ...authOptions,
      secret: env.NEXTAUTH_SECRET,
      debug: env.NODE_ENV === 'development',
    });
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ 
      error: 'Authentication error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

export { handler as GET, handler as POST };