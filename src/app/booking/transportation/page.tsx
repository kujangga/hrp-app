'use client'

import RoleBasedLayout from '@/components/RoleBasedLayout'
import BookingSteps from '@/components/BookingSteps'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { COLORS } from '@/lib/colors'
import { Truck, ShoppingCart, ArrowRight, Filter, DollarSign, CheckCircle2, X, Minus, Plus } from 'lucide-react'
import { useBooking } from '@/contexts/BookingContext'
import { useState } from 'react'

export default function SelectTransportation() {
    const router = useRouter()
    const pathname = usePathname()
    const { booking, addItem, removeItem, updateItemQuantity, getItemsByType, getNextStep } = useBooking()

    const [filters, setFilters] = useState({
        type: '',
        minPrice: '',
        maxPrice: ''
    })

    const selectedTransport = getItemsByType('transport')

    // Mock data for transportation
    const transportation = [
        {
            id: 'tr1',
            name: 'Toyota Avanza',
            type: 'Car',
            dailyRate: 500000,
            capacity: '7 passengers',
            description: 'Comfortable MPV perfect for small teams and equipment transport.',
            features: ['AC', '7 Seats', 'Spacious Cargo', 'Fuel Efficient'],
        },
        {
            id: 'tr2',
            name: 'Mitsubishi L300',
            type: 'Van',
            dailyRate: 700000,
            capacity: '12 passengers',
            description: 'Spacious van ideal for larger crews and bulky equipment.',
            features: ['15 Seats', 'Large Cargo Space', 'Reliable', 'Air Conditioned'],
        },
        {
            id: 'tr3',
            name: 'Toyota Hiace',
            type: 'Van',
            dailyRate: 900000,
            capacity: '14 passengers',
            description: 'Premium van with excellent comfort for long-distance shoots.',
            features: ['Comfortable Seats', 'Entertainment System', 'Large Luggage Space', 'Professional Driver'],
        },
        {
            id: 'tr4',
            name: 'Pick-up Truck',
            type: 'Truck',
            dailyRate: 600000,
            capacity: '3 passengers + cargo',
            description: 'Perfect for transporting heavy equipment and props.',
            features: ['Open Cargo Bed', 'Heavy Duty', '1 Ton Capacity', '4x4 Available'],
        }
    ]

    const types = ['All', 'Car', 'Van', 'Truck']

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target
        setFilters(prev => ({ ...prev, [name]: value }))
    }

    const getQuantity = (id: string) => {
        const item = selectedTransport.find(t => t.id === id)
        return item?.quantity || 0
    }

    const handleQuantityChange = (item: typeof transportation[0], delta: number) => {
        const currentQty = getQuantity(item.id)
        const newQty = currentQty + delta

        if (newQty <= 0) {
            if (currentQty > 0) {
                removeItem(item.id, 'transport')
            }
        } else if (currentQty === 0) {
            addItem({
                id: item.id,
                type: 'transport',
                name: item.name,
                dailyRate: item.dailyRate,
                quantity: newQty
            })
        } else {
            updateItemQuantity(item.id, 'transport', newQty)
        }
    }

    const handleContinue = () => {
        const nextStep = getNextStep(pathname || '/booking/transportation')
        if (nextStep) {
            router.push(nextStep.path)
        }
    }

    const handleSkip = () => {
        const nextStep = getNextStep(pathname || '/booking/transportation')
        if (nextStep) {
            router.push(nextStep.path)
        }
    }

    const filteredTransportation = transportation.filter(item => {
        if (filters.type && filters.type !== 'All' && item.type !== filters.type) return false
        if (filters.minPrice && item.dailyRate < parseInt(filters.minPrice)) return false
        if (filters.maxPrice && item.dailyRate > parseInt(filters.maxPrice)) return false
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
                                Select Transportation
                            </h1>
                            <p className="text-lg text-white/70">
                                Book transportation for your crew and equipment
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
                                            <label htmlFor="type" className="mb-2 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                                <Truck className="h-4 w-4" />
                                                Vehicle Type
                                            </label>
                                            <select id="type" name="type" value={filters.type} onChange={handleFilterChange} className="block w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-3 text-sm transition-all duration-200 focus:border-[#7D97B6] focus:outline-none focus:ring-4 focus:ring-[#7D97B6]/20" style={{ color: COLORS.NAVY_DARK }}>
                                                {types.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="minPrice" className="mb-2 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                                <DollarSign className="h-4 w-4" />
                                                Min Price (IDR)
                                            </label>
                                            <input type="number" name="minPrice" id="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="e.g. 400000" className="block w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-3 text-sm transition-all duration-200 focus:border-[#7D97B6] focus:outline-none focus:ring-4 focus:ring-[#7D97B6]/20" style={{ color: COLORS.NAVY_DARK }} />
                                        </div>
                                        <div>
                                            <label htmlFor="maxPrice" className="mb-2 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                                <DollarSign className="h-4 w-4" />
                                                Max Price (IDR)
                                            </label>
                                            <input type="number" name="maxPrice" id="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="e.g. 1000000" className="block w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-3 text-sm transition-all duration-200 focus:border-[#7D97B6] focus:outline-none focus:ring-4 focus:ring-[#7D97B6]/20" style={{ color: COLORS.NAVY_DARK }} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div className="lg:col-span-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {filteredTransportation.map((item, index) => (
                                        <motion.div key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl transition-all duration-200 hover:shadow-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 * index }}>
                                            <div className="p-6">
                                                <div className="mb-3 flex items-center justify-between">
                                                    <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${COLORS.BLUE_LIGHT}20`, color: COLORS.BLUE_LIGHT }}>
                                                        {item.type}
                                                    </span>
                                                    <span className="text-xs font-semibold text-gray-600">{item.capacity}</span>
                                                </div>
                                                <h3 className="mb-2 text-lg font-bold" style={{ color: COLORS.NAVY_DARK }}>
                                                    {item.name}
                                                </h3>
                                                <p className="mb-4 text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                                                    {item.description}
                                                </p>
                                                <div className="mb-4 space-y-1">
                                                    {item.features.slice(0, 3).map((feature, idx) => (
                                                        <div key={idx} className="flex items-center gap-2 text-xs" style={{ color: COLORS.SLATE_MEDIUM }}>
                                                            <CheckCircle2 className="h-3 w-3" style={{ color: COLORS.BLUE_LIGHT }} />
                                                            {feature}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                                                            Rp {item.dailyRate.toLocaleString()}
                                                        </p>
                                                        <p className="text-xs" style={{ color: COLORS.SLATE_MEDIUM }}>per day</p>
                                                    </div>
                                                    <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-1">
                                                        <motion.button
                                                            onClick={() => handleQuantityChange(item, -1)}
                                                            className="rounded p-2 text-gray-600 transition-colors hover:bg-gray-200"
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </motion.button>
                                                        <span className="w-8 text-center font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                                                            {getQuantity(item.id)}
                                                        </span>
                                                        <motion.button
                                                            onClick={() => handleQuantityChange(item, 1)}
                                                            className="rounded p-2 text-gray-600 transition-colors hover:bg-gray-200"
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                                    <div className="p-6">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <h3 className="mb-1 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>Selected Vehicles ({selectedTransport.length})</h3>
                                                <p className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                                                    {selectedTransport.length > 0 ? 'Continue to review your booking' : 'Select vehicles to continue or skip this step'}
                                                </p>
                                            </div>
                                            <div className="flex gap-3">
                                                <button onClick={() => router.back()} className="rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold transition-all duration-200 hover:border-gray-400" style={{ color: COLORS.NAVY_DARK }}>← Back</button>
                                                {selectedTransport.length === 0 && (
                                                    <motion.button onClick={handleSkip} className="rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold transition-all duration-200 hover:border-gray-400" style={{ color: COLORS.NAVY_DARK }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Skip</motion.button>
                                                )}
                                                <motion.button onClick={handleContinue} disabled={selectedTransport.length === 0} className={`flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 ${selectedTransport.length === 0 ? 'cursor-not-allowed bg-gray-400' : 'bg-[#7D97B6] hover:bg-[#6a8399] hover:shadow-xl'}`} whileHover={selectedTransport.length > 0 ? { scale: 1.02 } : {}} whileTap={selectedTransport.length > 0 ? { scale: 0.98 } : {}}>
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
