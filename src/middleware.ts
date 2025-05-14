import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow access to the login page and API routes
  if (pathname.startsWith('/admin/login') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Check if the user is authenticated
  const token = await getToken({ req: request });
  
  // If not authenticated, redirect to login
  if (!token) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/dashboard/:path*',
    // Add other protected admin routes here
  ],
};
