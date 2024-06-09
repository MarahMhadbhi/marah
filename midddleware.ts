import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Example: Check if the user is authenticated
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Redirect unauthenticated users to the login page
  if (!token) {
    if (
      url.pathname.startsWith('/reservations') ||
      url.pathname.startsWith('/accommodations') ||
      url.pathname.startsWith('/properties') ||
      url.pathname.startsWith('/favorites')
    ) {
      url.pathname = '/auth/signin';
      return NextResponse.redirect(url);
    }
  }

  // Dynamic route handling
  if (url.searchParams.has('userId')) {
    const userId = url.searchParams.get('userId');
    url.pathname = `/user/${userId}`;
    return NextResponse.rewrite(url);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/reservations',
    '/accommodations',
    '/properties',
    '/favorites',
    '/:path*', // Match all paths
  ],
};
