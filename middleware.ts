import { NextRequest, NextResponse } from 'next/server';

export const NEXT_AUTH_SESSION_COOKIE = process.env.NEXTAUTH_URL?.startsWith(
  'https://'
)
  ? '__Secure-next-auth.session-token'
  : 'next-auth.session-token';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 2. /_next/ (Next.js internals)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
     */
    '/((?!_next/|_static|_vercel|monitoring|[\\w-]+\\.\\w+).*)',
  ],
};

export default async function middleware(req: NextRequest) {
  console.log('DUMMY MIDDLEWARE\n\n\n');

  console.log(`req.headers.get('Baggage'): `, req.headers.get('Baggage'));

  // Given an incoming request...
  const newHeaders = new Headers(req.headers);
  // Add a new header
  newHeaders.set('x-version-testing-foo', '123');
  // And produce a response with the new headers
  return NextResponse.next({
    request: {
      // New request headers
      headers: newHeaders,
    },
  });
}
