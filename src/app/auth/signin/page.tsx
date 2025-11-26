'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { COLORS } from '@/lib/colors'
import { Camera, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function SignIn() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password
    })

    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a1219] via-[#0f1924] to-[#162533]">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#7D97B6]/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#E1E7F2]/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7D97B6]/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            
            {/* Left Column - Branding */}
            <motion.div
              className="flex flex-col justify-center text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Logo/Brand */}
              <motion.div
                className="mb-8 inline-flex items-center justify-center gap-3 lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7D97B6]/20">
                  <Camera className="h-7 w-7 text-[#7D97B6]" />
                </div>
                <div className="text-left">
                  <h1 className="text-2xl font-bold text-white">HRP</h1>
                  <p className="text-xs text-white/60">Human Resource Photographer</p>
                </div>
              </motion.div>

              {/* Welcome Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-bold leading-tight text-white">
                  Welcome Back
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-white/70">
                  Sign in to access your account and manage your photography projects with professional talent.
                </p>
              </motion.div>

              {/* Features */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[
                  'Access to 850+ professional photographers',
                  'Manage bookings and availability',
                  'Real-time project tracking'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7D97B6]/20">
                      <CheckCircle2 className="h-4 w-4 text-[#7D97B6]" />
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Sign In Form */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-xl">
                <div className="mb-8">
                  <h3 className="mb-2 text-2xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                    Sign In
                  </h3>
                  <p className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                    Enter your credentials to access your account
                  </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Error Message */}
                  {error && (
                    <motion.div
                      className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <div className="text-sm text-red-700">{error}</div>
                    </motion.div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email-address" className="mb-2 block text-sm font-medium" style={{ color: COLORS.NAVY_DARK }}>
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <Mail className="h-5 w-5" style={{ color: COLORS.SLATE_MEDIUM }} />
                      </div>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full rounded-xl border py-3 pl-12 pr-4 transition-all focus:outline-none focus:ring-2 focus:ring-[#7D97B6]"
                        style={{ 
                          backgroundColor: COLORS.POWDER_LIGHT,
                          borderColor: COLORS.SLATE_MEDIUM + '40',
                          color: COLORS.NAVY_DARK
                        }}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium" style={{ color: COLORS.NAVY_DARK }}>
                      Password
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <Lock className="h-5 w-5" style={{ color: COLORS.SLATE_MEDIUM }} />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full rounded-xl border py-3 pl-12 pr-4 transition-all focus:outline-none focus:ring-2 focus:ring-[#7D97B6]"
                        style={{ 
                          backgroundColor: COLORS.POWDER_LIGHT,
                          borderColor: COLORS.SLATE_MEDIUM + '40',
                          color: COLORS.NAVY_DARK
                        }}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {/* Remember & Forgot */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-[#7D97B6] focus:ring-[#7D97B6]"
                      />
                      <span className="ml-2 text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                        Remember me
                      </span>
                    </label>
                    <Link 
                      href="/auth/forgot-password" 
                      className="text-sm font-medium hover:underline"
                      style={{ color: COLORS.BLUE_LIGHT }}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                    whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </motion.button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t" style={{ borderColor: COLORS.SLATE_MEDIUM + '20' }} />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-4" style={{ color: COLORS.SLATE_MEDIUM }}>
                        Don't have an account?
                      </span>
                    </div>
                  </div>

                  {/* Sign Up Link */}
                  <Link href="/auth/register">
                    <motion.button
                      type="button"
                      className="w-full rounded-xl border-2 py-3.5 font-semibold transition-all"
                      style={{ 
                        borderColor: COLORS.BLUE_LIGHT,
                        color: COLORS.BLUE_LIGHT
                      }}
                      whileHover={{ 
                        scale: 1.02, 
                        y: -2,
                        backgroundColor: COLORS.BLUE_LIGHT,
                        color: '#ffffff'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Create New Account
                    </motion.button>
                  </Link>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  )
}