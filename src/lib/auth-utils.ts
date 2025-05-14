import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Session } from 'next-auth';

export async function isUserAdmin() {
  const session = await getServerSession(authOptions) as Session & {
    user: { role?: string };
  } | null;
  return session?.user?.role === 'admin';
}
