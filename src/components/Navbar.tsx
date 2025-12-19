'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import NotificationBell from '@/components/NotificationBell'
import { useBooking } from '@/contexts/BookingContext'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/photographer', label: 'Photographer' },
  { href: '/videographer', label: 'Videographer' },
  { href: '/equipment', label: 'Equipment' },
  { href: '/transport', label: 'Transport' },
]

export default function Navbar() {
  const { data: session } = useSession()
  const { getItemCount } = useBooking()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const cartItemCount = getItemCount()

  // Prevent hydration mismatch by only showing count after client mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [...NAV_LINKS]

  if (session?.user?.role) {
    links.push({
      href: `/${String(session.user.role).toLowerCase()}/dashboard`,
      label: 'Dashboard',
    })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
        ? 'border-b border-white/10 bg-gradient-to-b from-[#0f1924] to-[#0a1219] shadow-lg shadow-black/20'
        : 'bg-transparent'
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/"
            className="group relative text-xl font-bold tracking-wider text-white transition-all hover:scale-105"
          >
            <span className="relative z-10">HRP</span>
            <motion.span
              className="absolute -inset-2 -z-10 rounded-lg bg-white/5 blur"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          className="hidden items-center gap-1 md:flex"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {links.map(({ href, label }, index) => {
            const isActive = pathname === href
            return (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              >
                <Link
                  href={href}
                  className={`relative px-4 py-2 text-[13px] font-medium tracking-wide transition-all ${isActive
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                    }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#7D97B6] to-[#E1E7F2]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Desktop Auth Buttons */}
        <motion.div
          className="hidden items-center gap-3 md:flex"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {session ? (
            <>
              <NotificationBell />
              {/* Cart Icon */}
              <Link href="/booking/cart" className="relative">
                <motion.div
                  className="relative rounded-full p-2 transition-colors hover:bg-white/5"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ShoppingCart className="h-5 w-5 text-white/90" />
                  {isMounted && cartItemCount > 0 && (
                    <motion.span
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#7D97B6] to-[#546079] text-[10px] font-bold text-white shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    >
                      {cartItemCount}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#7D97B6] to-[#546079] text-xs font-semibold text-white shadow-lg">
                  {session.user?.name?.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-medium text-white/90">{session.user?.name}</span>
              </motion.div>
              <motion.button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white/90 transition-all hover:border-white/40 hover:bg-white/5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign out
              </motion.button>
            </>
          ) : (
            <>
              {/* Cart Icon for Guests */}
              <Link href="/booking/cart" className="relative">
                <motion.div
                  className="relative rounded-full p-2 transition-colors hover:bg-white/5"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ShoppingCart className="h-5 w-5 text-white/90" />
                  {isMounted && cartItemCount > 0 && (
                    <motion.span
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#7D97B6] to-[#546079] text-[10px] font-bold text-white shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    >
                      {cartItemCount}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/auth/signin"
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#7D97B6] to-[#546079] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#7D97B6]/25 transition-all hover:shadow-xl hover:shadow-[#7D97B6]/40"
                >
                  <span className="relative z-10">Vendor Portal</span>
                  <motion.span
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-[#E1E7F2] to-[#7D97B6]"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-white/5 md:hidden"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <div className="flex h-4 w-5 flex-col justify-between">
            <motion.span
              className="h-0.5 w-full rounded-full bg-white"
              animate={
                mobileMenuOpen
                  ? { rotate: 45, y: 6 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
            <motion.span
              className="h-0.5 w-full rounded-full bg-white"
              animate={
                mobileMenuOpen
                  ? { opacity: 0 }
                  : { opacity: 1 }
              }
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="h-0.5 w-full rounded-full bg-white"
              animate={
                mobileMenuOpen
                  ? { rotate: -45, y: -6 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="overflow-hidden md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <motion.div
              className="border-t border-white/10 bg-[#162533]/95 backdrop-blur-xl"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mx-auto max-w-7xl px-6 py-6">
                <div className="space-y-1">
                  {links.map(({ href, label }, index) => {
                    const isActive = pathname === href
                    return (
                      <motion.div
                        key={href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link
                          href={href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive
                            ? 'bg-white/10 text-white'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                          {label}
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                {session ? (
                  <motion.div
                    className="mt-6 space-y-3 border-t border-white/10 pt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: links.length * 0.1 + 0.1 }}
                  >
                    <div className="flex items-center gap-3 px-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#7D97B6] to-[#546079] text-sm font-semibold text-white">
                        {session.user?.name?.charAt(0) || 'U'}
                      </div>
                      <span className="text-sm font-medium text-white">{session.user?.name}</span>
                    </div>
                    {/* Cart Icon Mobile */}
                    <Link
                      href="/booking/cart"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-white/90 transition-all hover:bg-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        <span>Shopping Cart</span>
                      </div>
                      {isMounted && cartItemCount > 0 && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#7D97B6] to-[#546079] text-xs font-bold text-white">
                          {cartItemCount}
                        </span>
                      )}
                    </Link>
                    <motion.button
                      onClick={() => {
                        setMobileMenuOpen(false)
                        signOut({ callbackUrl: '/' })
                      }}
                      className="w-full rounded-xl border border-white/20 px-4 py-3 text-sm font-medium text-white/90 transition-all hover:bg-white/5"
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign out
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    className="mt-6 space-y-3 border-t border-white/10 pt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: links.length * 0.1 + 0.1 }}
                  >
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Link
                        href="/auth/signin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full rounded-xl border border-white/20 px-4 py-3 text-center text-sm font-medium text-white/90 transition-all hover:bg-white/5"
                      >
                        Sign in
                      </Link>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Link
                        href="/auth/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full rounded-xl bg-gradient-to-r from-[#7D97B6] to-[#546079] px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                      >
                        Get Started
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
