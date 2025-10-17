'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RoleBasedLayout({
  children,
  allowedRoles
}: {
  children: React.ReactNode
  allowedRoles: string[]
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/signin')
      return
    }

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
  }, [session, status, router, allowedRoles])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || !allowedRoles.includes(session.user?.role)) {
    return null
  }

  return <>{children}</>
}