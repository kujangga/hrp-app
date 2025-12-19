import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import SessionProvider from '@/components/SessionProvider'
import { BookingProvider } from '@/contexts/BookingContext'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HRP - Human Resource Photographer',
  description: 'Connect talented photographers with clients through intelligent matching and comprehensive service management.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <BookingProvider>
            <Navbar />
            <main>{children}</main>
          </BookingProvider>
        </SessionProvider>
      </body>
    </html>
  )
}