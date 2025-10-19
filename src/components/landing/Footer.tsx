'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { COLORS } from '@/lib/colors'
import { Magnet } from '@/components/ui/magnet'
import { WaveDivider } from '@/components/ui/wave-divider'
import { Instagram, Facebook, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react'

const footerLinks = {
  services: [
    { label: 'Browse Photographers', href: '/booking/photographers' },
    { label: 'Equipment Rental', href: '/equipment' },
    { label: 'Transportation', href: '/transport' },
    { label: 'Complete Packages', href: '/booking/location-date' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Become a Photographer', href: '/photographer/register' },
    { label: 'Blog & Stories', href: '/blog' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
}

const socialLinks = [
  { 
    icon: Instagram, 
    href: 'https://instagram.com', 
    label: 'Instagram',
    hoverColor: COLORS.BLUE_LIGHT 
  },
  { 
    icon: Facebook, 
    href: 'https://facebook.com', 
    label: 'Facebook',
    hoverColor: COLORS.BLUE_LIGHT 
  },
  { 
    icon: Twitter, 
    href: 'https://twitter.com', 
    label: 'Twitter',
    hoverColor: COLORS.BLUE_LIGHT 
  },
  { 
    icon: Linkedin, 
    href: 'https://linkedin.com', 
    label: 'LinkedIn',
    hoverColor: COLORS.BLUE_LIGHT 
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <footer 
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-[#0f1924] to-[#0a1219]"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Section - Larger column */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-5">
              {/* Logo */}
              <Link 
                href="/"
                className="group inline-block"
              >
                <h3 className="text-3xl font-bold tracking-wider text-white transition-all hover:scale-105">
                  HRP
                </h3>
              </Link>
              
              {/* Description */}
              <p className="max-w-md text-sm leading-relaxed text-white/70">
                Your trusted platform for professional photography services. We connect you with talented photographers, premium equipment, and reliable transportation—all in one place.
              </p>

              {/* Social Links */}
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.div
                      key={social.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    >
                      <Magnet>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20"
                          aria-label={social.label}
                          style={{
                            '--hover-color': social.hoverColor,
                          } as React.CSSProperties}
                        >
                          <Icon 
                            className="h-4 w-4 text-white/60 transition-colors duration-300 group-hover:text-white" 
                          />
                        </a>
                      </Magnet>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Links Grid - Remaining columns */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
              {/* Services Column */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
                  Services
                </h4>
                <ul className="space-y-3">
                  {footerLinks.services.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="group inline-flex items-center text-sm text-white/60 transition-colors duration-200 hover:text-white"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-[#7D97B6] to-transparent transition-all duration-300 group-hover:w-full" 
                            style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                          />
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Company Column */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
                  Company
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="group inline-flex items-center text-sm text-white/60 transition-colors duration-200 hover:text-white"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-[#7D97B6] to-transparent transition-all duration-300 group-hover:w-full" 
                            style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                          />
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Support Column */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
                  Support
                </h4>
                <ul className="space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="group inline-flex items-center text-sm text-white/60 transition-colors duration-200 hover:text-white"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-[#7D97B6] to-transparent transition-all duration-300 group-hover:w-full" 
                            style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                          />
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="mt-16 border-t border-white/10 pt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="mx-auto max-w-2xl">
            {/* Badge */}
            <div className="mb-4 text-center">
              <motion.div
                className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider"
                style={{ color: COLORS.BLUE_LIGHT }}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.div
                  className="h-px w-8"
                  style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: 32 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                />
                Stay Updated
                <motion.div
                  className="h-px w-8"
                  style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: 32 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                />
              </motion.div>
            </div>

            <h4 className="mb-3 text-center text-xl font-bold text-white">
              Get Photography Tips & Exclusive Offers
            </h4>
            <p className="mb-6 text-center text-sm text-white/60">
              Subscribe to our newsletter for the latest updates and special promotions
            </p>
            
            <form className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-white/70" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="relative w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/40 transition-all duration-200 focus:border-white/20 focus:bg-white/10 focus:outline-none"
                />
              </div>
              <Magnet>
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </Magnet>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 border-t border-white/10 pt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-xs text-white/50">
              © {currentYear} HRP. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {['Privacy', 'Terms', 'Cookies', 'Sitemap'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                >
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-xs text-white/50 transition-colors duration-200 hover:text-white"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
