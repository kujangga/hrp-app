'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useBooking } from '@/contexts/BookingContext'

export default function BookingSteps() {
  const pathname = usePathname()
  const { getBookingSteps } = useBooking()
  const steps = getBookingSteps()

  const getCurrentStepIndex = () => {
    if (!pathname) return 0
    return steps.findIndex(step => pathname.includes(step.path))
  }

  const currentStepIndex = getCurrentStepIndex()

  return (
    <motion.div
      className="mb-12 flex items-center justify-center gap-4 overflow-x-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {steps.map((step, index) => {
        const isActive = index === currentStepIndex
        const isCompleted = index < currentStepIndex
        const isFuture = index > currentStepIndex

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-[#7D97B6] text-white shadow-lg'
                    : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-white/10 text-white/50'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <span className="font-semibold">{step.number}</span>
                )}
              </div>
              <span
                className={`hidden whitespace-nowrap text-sm font-medium transition-all duration-200 sm:block ${
                  isActive
                    ? 'text-white'
                    : isCompleted
                    ? 'text-green-300'
                    : 'text-white/50'
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-4 h-0.5 w-12 flex-shrink-0 transition-all duration-200 ${
                  isCompleted ? 'bg-green-500' : 'bg-white/20'
                }`}
              />
            )}
          </div>
        )
      })}
    </motion.div>
  )
}
