'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

export default function SignOut() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    signOut({ redirect: false }).then(() => {
      setLoading(false)
      router.push('/auth/signin')
    })
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {loading ? 'Signing out...' : 'You have been signed out'}
          </h2>
        </div>
      </div>
    </div>
  )
}