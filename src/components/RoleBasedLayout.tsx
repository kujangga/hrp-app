'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RoleBasedLayout({
  children,
  allowedRoles,
  allowGuest = false
}: {
  children: React.ReactNode
  allowedRoles: string[]
  allowGuest?: boolean // Allow unauthenticated access for guest users
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    // If guest access is allowed and no session, allow access
    if (allowGuest && !session) {
      return
    }

    // Otherwise require authentication
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Check if user has required role
    if (!allowedRoles.includes(session.user?.role)) {
      // Redirect to appropriate dashboard based on role
      switch (session.user?.role) {
        case 'ADMIN':
          router.push('/admin/dashboard')
          break
        case 'PHOTOGRAPHER':
          router.push('/photographer/dashboard')
          break
        case 'CUSTOMER':
          router.push('/customer/dashboard')
          break
        default:
          router.push('/')
      }
    }
  }, [session, status, router, allowedRoles, allowGuest])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  // Allow access if:
  // 1. Guest access is enabled and no session, OR
  // 2. User is authenticated and has required role
  if (allowGuest && !session) {
    return <>{children}</>
  }

  if (!session || !allowedRoles.includes(session.user?.role)) {
    return null
  }

  return <>{children}</>
}