'use client'

import RoleBasedLayout from '@/components/RoleBasedLayout'
import BookingSteps from '@/components/BookingSteps'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { COLORS } from '@/lib/colors'
import { Video, Star, Award, ShoppingCart, ArrowRight, Filter, DollarSign, CheckCircle2, X } from 'lucide-react'
import { useBooking } from '@/contexts/BookingContext'
import { useState } from 'react'

export default function SelectVideographers() {
    const router = useRouter()
    const pathname = usePathname()
    const { booking, addItem, removeItem, getItemsByType, getNextStep } = useBooking()

    const [filters, setFilters] = useState({
        grade: '',
        minPrice: '',
        maxPrice: ''
    })

    const selectedVideographers = getItemsByType('videographer')

    // Mock data for videographers
    const videographers = [
        {
            id: 'v1',
            name: 'Marcus Lee',
            grade: 'A',
            dailyRate: 4500000,
            profilePic: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
            bio: 'Cinematic wedding and event videographer with drone expertise.',
            rating: 4.9,
            completedProjects: 180,
            features: ['4K Video', 'Drone Coverage', 'Same-Day Edits', 'Cinematic Color Grading'],
            description: 'Award-winning videographer specializing in cinematic storytelling.'
        },
        {
            id: 'v2',
            name: 'Sofia Martinez',
            grade: 'B',
            dailyRate: 3500000,
            profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
            bio: 'Creative videographer with focus on corporate and promotional videos.',
            rating: 4.8,
            completedProjects: 150,
            features: ['Multi-Camera Setup', 'Professional Audio', 'Motion Graphics', 'Fast Turnaround'],
            description: 'Specialized in corporate videos and brand storytelling.'
        },
        {
            id: 'v3',
            name: 'Daniel Wong',
            grade: 'C',
            dailyRate: 2500000,
            profilePic: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
            bio: 'Event videographer with experience in conferences and live events.',
            rating: 4.7,
            completedProjects: 120,
            features: ['Live Streaming', 'Event Coverage', 'Highlight Reels', 'Social Media Clips'],
            description: 'Professional event videography and live streaming services.'
        }
    ]

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target
        setFilters(prev => ({ ...prev, [name]: value }))
    }

    const isSelected = (id: string) => {
        return selectedVideographers.some(v => v.id === id)
    }

    const toggleVideographerSelection = (videographer: typeof videographers[0]) => {
        if (isSelected(videographer.id)) {
            removeItem(videographer.id, 'videographer')
        } else {
            addItem({
                id: videographer.id,
                type: 'videographer',
                name: videographer.name,
                dailyRate: videographer.dailyRate,
                grade: videographer.grade,
                profilePic: videographer.profilePic,
                quantity: 1
            })
        }
    }

    const handleContinue = () => {
        const nextStep = getNextStep(pathname || '/booking/videographers')
        if (nextStep) {
            router.push(nextStep.path)
        }
    }

    const handleSkip = () => {
        const nextStep = getNextStep(pathname || '/booking/videographers')
        if (nextStep) {
            router.push(nextStep.path)
        }
    }

    const filteredVideographers = videographers.filter(videographer => {
        if (filters.grade && videographer.grade !== filters.grade) return false
        if (filters.minPrice && videographer.dailyRate < parseInt(filters.minPrice)) return false
        if (filters.maxPrice && videographer.dailyRate > parseInt(filters.maxPrice)) return false
        return true
    })

    return (
        <RoleBasedLayout allowedRoles={['CUSTOMER']} allowGuest={true}>
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a1219] via-[#0f1924] to-[#162533]">
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#7D97B6]/10 blur-3xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                <div className="relative min-h-screen px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <motion.div className="mb-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <h1 className="mb-3 text-[clamp(2rem,4vw,3rem)] font-bold text-white">
                                Select Your Videographer
                            </h1>
                            <p className="text-lg text-white/70">
                                Browse professional videographers for your event
                            </p>
                            {booking.location && booking.date && (
                                <div className="mt-3 flex items-center justify-center gap-4 text-sm text-white/60">
                                    <span>📍 {booking.location}</span>
                                    <span>•</span>
                                    <span>📅 {booking.date}</span>
                                </div>
                            )}
                        </motion.div>

                        <BookingSteps />

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                            <motion.div className="lg:col-span-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                                <div className="rounded-2xl border border-white/10 bg-white/95 p-6 shadow-xl backdrop-blur-xl">
                                    <div className="mb-6 flex items-center gap-2">
                                        <Filter className="h-5 w-5" style={{ color: COLORS.BLUE_LIGHT }} />
                                        <h3 className="text-lg font-bold" style={{ color: COLORS.NAVY_DARK }}>Filters</h3>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="grade" className="mb-2 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                                <Award className="h-4 w-4" />
                                                Grade
                                            </label>
                                            <select id="grade" name="grade" value={filters.grade} onChange={handleFilterChange} className="block w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-3 text-sm transition-all duration-200 focus:border-[#7D97B6] focus:outline-none focus:ring-4 focus:ring-[#7D97B6]/20" style={{ color: COLORS.NAVY_DARK }}>
                                                <option value="">All Grades</option>
                                                <option value="A">A (Premium)</option>
                                                <option value="B">B (High)</option>
                                                <option value="C">C (Mid)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="minPrice" className="mb-2 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                                <DollarSign className="h-4 w-4" />
                                                Min Price (IDR)
                                            </label>
                                            <input type="number" name="minPrice" id="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="e.g. 2000000" className="block w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-3 text-sm transition-all duration-200 focus:border-[#7D97B6] focus:outline-none focus:ring-4 focus:ring-[#7D97B6]/20" style={{ color: COLORS.NAVY_DARK }} />
                                        </div>
                                        <div>
                                            <label htmlFor="maxPrice" className="mb-2 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                                <DollarSign className="h-4 w-4" />
                                                Max Price (IDR)
                                            </label>
                                            <input type="number" name="maxPrice" id="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="e.g. 6000000" className="block w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-3 text-sm transition-all duration-200 focus:border-[#7D97B6] focus:outline-none focus:ring-4 focus:ring-[#7D97B6]/20" style={{ color: COLORS.NAVY_DARK }} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div className="lg:col-span-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                                <div className="space-y-6">
                                    {filteredVideographers.map((videographer, index) => (
                                        <motion.div key={videographer.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl transition-all duration-200 hover:shadow-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 * index }}>
                                            <div className="p-6">
                                                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                                                    <div className="flex flex-1 gap-4">
                                                        <img className="h-20 w-20 rounded-xl object-cover shadow-md" src={videographer.profilePic} alt={videographer.name} />
                                                        <div className="flex-1">
                                                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                                                <h3 className="text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>{videographer.name}</h3>
                                                                <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: COLORS.BLUE_LIGHT }}>
                                                                    <Award className="h-3 w-3" />
                                                                    Grade {videographer.grade}
                                                                </span>
                                                            </div>
                                                            <p className="mb-3 text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>{videographer.bio}</p>
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(videographer.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`} />
                                                                    ))}
                                                                </div>
                                                                <span className="text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>{videographer.rating}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-3">
                                                        <div className="text-right">
                                                            <p className="text-2xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                                                                Rp {videographer.dailyRate.toLocaleString()}
                                                            </p>
                                                            <p className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>per day</p>
                                                        </div>
                                                        <motion.button onClick={() => toggleVideographerSelection(videographer)} className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-md transition-all duration-200 ${isSelected(videographer.id) ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-[#7D97B6] text-white hover:bg-[#6a8399]'}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                            {isSelected(videographer.id) ? <><X className="h-4 w-4" />Remove</> : <><ShoppingCart className="h-4 w-4" />Add to Cart</>}
                                                        </motion.button>
                                                    </div>
                                                </div>
                                                <div className="mt-6 grid grid-cols-2 gap-3">
                                                    {videographer.features.slice(0, 4).map((feature, idx) => (
                                                        <div key={idx} className="flex items-center gap-2 text-xs" style={{ color: COLORS.SLATE_MEDIUM }}>
                                                            <CheckCircle2 className="h-3 w-3" style={{ color: COLORS.BLUE_LIGHT }} />
                                                            {feature}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                                    <div className="p-6">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <h3 className="mb-1 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>Selected Videographers ({selectedVideographers.length})</h3>
                                                <p className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                                                    {selectedVideographers.length > 0 ? 'Continue to next step or add more videographers' : 'Select videographers to continue or skip this step'}
                                                </p>
                                            </div>
                                            <div className="flex gap-3">
                                                <button onClick={() => router.back()} className="rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold transition-all duration-200 hover:border-gray-400" style={{ color: COLORS.NAVY_DARK }}>← Back</button>
                                                {selectedVideographers.length === 0 && (
                                                    <motion.button onClick={handleSkip} className="rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold transition-all duration-200 hover:border-gray-400" style={{ color: COLORS.NAVY_DARK }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Skip</motion.button>
                                                )}
                                                <motion.button onClick={handleContinue} disabled={selectedVideographers.length === 0} className={`flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 ${selectedVideographers.length === 0 ? 'cursor-not-allowed bg-gray-400' : 'bg-[#7D97B6] hover:bg-[#6a8399] hover:shadow-xl'}`} whileHover={selectedVideographers.length > 0 ? { scale: 1.02 } : {}} whileTap={selectedVideographers.length > 0 ? { scale: 0.98 } : {}}>
                                                    Next Step
                                                    <ArrowRight className="h-5 w-5" />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </RoleBasedLayout>
    )
}
