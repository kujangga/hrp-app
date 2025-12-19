'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { useEffect } from 'react'
import { COLORS } from '@/lib/colors'

interface CartConfirmDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    variant?: 'danger' | 'warning'
}

export default function CartConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'warning'
}: CartConfirmDialogProps) {
    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    const handleConfirm = () => {
        onConfirm()
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Dialog */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                                aria-label="Close dialog"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Content */}
                            <div className="p-6">
                                {/* Icon */}
                                <div className="mb-4 flex justify-center">
                                    <div
                                        className={`flex h-16 w-16 items-center justify-center rounded-full ${variant === 'danger' ? 'bg-red-100' : 'bg-yellow-100'
                                            }`}
                                    >
                                        <AlertTriangle
                                            className={`h-8 w-8 ${variant === 'danger' ? 'text-red-600' : 'text-yellow-600'
                                                }`}
                                        />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3
                                    className="mb-2 text-center text-xl font-bold"
                                    style={{ color: COLORS.NAVY_DARK }}
                                >
                                    {title}
                                </h3>

                                {/* Message */}
                                <p className="mb-6 text-center text-gray-600">
                                    {message}
                                </p>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <motion.button
                                        onClick={onClose}
                                        className="flex-1 rounded-xl border-2 border-gray-300 py-3 font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {cancelText}
                                    </motion.button>
                                    <motion.button
                                        onClick={handleConfirm}
                                        className={`flex-1 rounded-xl py-3 font-semibold text-white shadow-lg transition-all ${variant === 'danger'
                                                ? 'bg-red-600 hover:bg-red-700'
                                                : 'bg-yellow-600 hover:bg-yellow-700'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {confirmText}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
