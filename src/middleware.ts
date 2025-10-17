export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/photographer/:path*',
    '/booking/:path*'
  ]
}