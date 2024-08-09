import { clerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default clerkMiddleware();

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Define public routes
  const publicRoutes = [
    '/',
    '/events/:id',
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing'
  ]

  // Define routes to ignore (no middleware processing)
  const ignoredRoutes = [
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing'
  ]

  // Check if the current route matches any ignore route
  if (ignoredRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // If the current route is public, continue without checking for authentication
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for authentication
  const { userId } = getAuth(req);

  // If the user is not authenticated, redirect to the sign-in page
  if (!userId) {
    const signInUrl = new URL('/sign-in', req.url);
    return NextResponse.redirect(signInUrl);
  }

  // If authenticated, proceed to the requested page
  return NextResponse.next();
}
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};