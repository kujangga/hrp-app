'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
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

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 100,
    })
  }, [])

  return (
    <footer 
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-[#0f1924] to-[#0a1219]"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.3 } : {}}
        transition={{ duration: 1.2 }}
      >
        <motion.div
          className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-[#7D97B6]/20 to-transparent blur-3xl"
          animate={inView ? {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          } : {}}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-tl from-[#162533]/20 to-transparent blur-3xl"
          animate={inView ? {
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          } : {}}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Section - Larger column */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.01 }}
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="space-y-5">
              {/* Logo */}
              <Link 
                href="/"
                className="group inline-block"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <motion.h3 
                  className="text-3xl font-bold tracking-wider text-white transition-all"
                  whileHover={{ 
                    scale: 1.05,
                    textShadow: "0 0 20px rgba(125, 151, 182, 0.5)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  HRP
                </motion.h3>
              </Link>
              
              {/* Description */}
              <motion.p 
                className="max-w-md text-sm leading-relaxed text-white/70"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.7 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Your trusted platform for professional photography services. We connect you with talented photographers, premium equipment, and reliable transportation—all in one place.
              </motion.p>

              {/* Social Links */}
              <div 
                className="flex gap-3 pt-2"
                data-aos="fade-up"
                data-aos-delay="400"
              >
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
                        <motion.a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20"
                          aria-label={social.label}
                          style={{
                            '--hover-color': social.hoverColor,
                          } as React.CSSProperties}
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: "rgba(125, 151, 182, 0.1)",
                            boxShadow: "0 5px 15px rgba(125, 151, 182, 0.3)"
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon 
                            className="h-4 w-4 text-white/60 transition-colors duration-300 group-hover:text-white" 
                          />
                        </motion.a>
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
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <motion.h4 
                  className="mb-5 text-sm font-bold uppercase tracking-wider text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  data-aos="fade-right"
                  data-aos-delay="300"
                >
                  Services
                </motion.h4>
                <ul className="space-y-3">
                  {footerLinks.services.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                      data-aos="fade-left"
                      data-aos-delay={400 + index * 100}
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
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <motion.h4 
                  className="mb-5 text-sm font-bold uppercase tracking-wider text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  data-aos="fade-right"
                  data-aos-delay="500"
                >
                  Company
                </motion.h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                      data-aos="fade-left"
                      data-aos-delay={600 + index * 100}
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
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <motion.h4 
                  className="mb-5 text-sm font-bold uppercase tracking-wider text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 }}
                  data-aos="fade-right"
                  data-aos-delay="700"
                >
                  Support
                </motion.h4>
                <ul className="space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                      data-aos="fade-left"
                      data-aos-delay={800 + index * 100}
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
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <div className="mx-auto max-w-2xl">
            {/* Badge */}
            <div 
              className="mb-4 text-center"
              data-aos="zoom-in"
              data-aos-delay="900"
            >
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

            <motion.h4 
              className="mb-3 text-center text-xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65 }}
              data-aos="fade-up"
              data-aos-delay="1000"
            >
              Get Photography Tips & Exclusive Offers
            </motion.h4>
            <motion.p 
              className="mb-6 text-center text-sm text-white/60"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 0.6, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              data-aos="fade-up"
              data-aos-delay="1100"
            >
              Subscribe to our newsletter for the latest updates and special promotions
            </motion.p>
            
            <motion.form 
              className="flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.75 }}
              data-aos="zoom-in"
              data-aos-delay="1200"
            >
              <motion.div 
                className="relative flex-1"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-white/70" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="relative w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/40 transition-all duration-200 focus:border-white/20 focus:bg-white/10 focus:outline-none"
                />
              </motion.div>
              <Magnet>
                <motion.button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-all duration-200"
                  style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px -10px rgba(125, 151, 182, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </motion.button>
              </Magnet>
            </motion.form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 border-t border-white/10 pt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          data-aos="fade-up"
          data-aos-delay="1400"
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <motion.p 
              className="text-center text-xs text-white/50"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 0.5, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.75 }}
              data-aos="fade-right"
              data-aos-delay="1500"
            >
              © {currentYear} HRP. All rights reserved.
            </motion.p>
            <div 
              className="flex flex-wrap justify-center gap-6"
              data-aos="fade-left"
              data-aos-delay="1500"
            >
              {['Privacy', 'Terms', 'Cookies', 'Sitemap'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                  whileHover={{ y: -2 }}
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
