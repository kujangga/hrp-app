export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/photographer/dashboard/:path*',
    '/videographer/dashboard/:path*',
    '/booking/:path*'
  ]
}