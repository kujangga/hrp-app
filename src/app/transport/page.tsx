'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { WaveDivider } from '@/components/ui/wave-divider';
import { LocationDateWidget } from '@/components/landing/LocationDateWidget';
import { COLORS } from '@/lib/colors';
import Footer from '@/components/landing/Footer';
import {
  Truck,
  CheckCircle2,
  Star,
  Shield,
  Lock,
  Zap,
  Users,
  MapPin,
  Clock
} from 'lucide-react';

const TransportPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  const vehicleTypes = [
    {
      id: 1,
      name: 'Luxury Van',
      capacity: '6-8 people',
      features: ['AC', 'Power Outlets', 'Wi-Fi', 'Comfortable Seating', 'Professional Driver'],
      price: 'Rp 1,200,000/day',
      description: 'Perfect for transporting your entire crew with comfort and style.',
      icon: '🚐'
    },
    {
      id: 2,
      name: 'Professional SUV',
      capacity: '4-5 people',
      features: ['All-Terrain', 'GPS Tracking', 'Premium Audio', 'Reclining Seats', 'Climate Control'],
      price: 'Rp 850,000/day',
      description: 'Ideal for smaller crews and challenging terrains.',
      icon: '🚙'
    },
    {
      id: 3,
      name: 'Cargo Transport',
      capacity: 'Equipment & Gear',
      features: ['Climate Control', 'Secure Locks', 'GPS Tracking', 'Large Capacity', 'Loading Ramp'],
      price: 'Rp 1,500,000/day',
      description: 'Safe and secure transportation for all your equipment and gear.',
      icon: '🚚'
    },
    {
      id: 4,
      name: 'Executive Sedan',
      capacity: '3-4 people',
      features: ['Premium Leather', 'Privacy Glass', 'Champagne Service', 'Professional Driver', 'Charging Ports'],
      price: 'Rp 950,000/day',
      description: 'Luxury option for VIP clients or small executive teams.',
      icon: '🚗'
    },
    {
      id: 5,
      name: 'Motorcycle Courier',
      capacity: 'Equipment Delivery',
      features: ['Fast Delivery', 'GPS Tracking', 'Secure Packaging', 'Same-Day Service', 'Flexible Scheduling'],
      price: 'Rp 300,000/day',
      description: 'Quick transport for urgent equipment delivery needs.',
      icon: '🏍️'
    },
    {
      id: 6,
      name: 'Hybrid Van',
      capacity: '4-6 people',
      features: ['Eco-Friendly', 'Fuel Efficient', 'Quiet Operation', 'Spacious Interior', 'Modern Amenities'],
      price: 'Rp 1,000,000/day',
      description: 'Environmentally friendly option with modern comfort features.',
      icon: '🚛'
    }
  ];

  const benefits = [
    {
      title: 'Reliability',
      description: 'Punctual arrival and professional drivers with extensive experience',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Team Capacity',
      description: 'Perfect for crews of all sizes and equipment needs',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Location Coverage',
      description: 'Nation-wide coverage with local expertise and knowledge',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: 'Flexible Scheduling',
      description: '24/7 availability with custom scheduling options',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const [costCalculation, setCostCalculation] = useState({
    from: '',
    to: '',
    teamSize: '1-3',
    vehicleType: 'luxury-van'
  });

  const [calculatedCost, setCalculatedCost] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateCost = () => {
    // Simple cost calculation logic (in a real app, this would be more complex)
    let baseCost = 0;
    switch(costCalculation.vehicleType) {
      case 'luxury-van': baseCost = 1200000; break;
      case 'professional-suv': baseCost = 850000; break;
      case 'cargo-transport': baseCost = 1500000; break;
      case 'executive-sedan': baseCost = 950000; break;
      case 'motorcycle-courier': baseCost = 300000; break;
      case 'hybrid-van': baseCost = 1000000; break;
      default: baseCost = 1000000;
    }

    // Distance-based cost factor
    const distanceFactor = costCalculation.from.toLowerCase() === costCalculation.to.toLowerCase() ? 1 : 1.5;
    
    // Team size factor
    const sizeFactor = 
      costCalculation.teamSize === '1-3' ? 1 : 
      costCalculation.teamSize === '4-6' ? 1.2 : 
      costCalculation.teamSize === '7-10' ? 1.5 : 2;

    const finalCost = baseCost * distanceFactor * sizeFactor;
    setCalculatedCost(Math.round(finalCost));
    setIsCalculated(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCostCalculation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFindTransport = () => {
    if (!selectedLocation || !selectedDate) {
      alert('Please select both a location and a date to continue');
      return;
    }
    router.push(`/transport/search?location=${encodeURIComponent(selectedLocation)}&date=${selectedDate}`);
  };

  const TRANSPORT_STATS = [
    { value: '200+', label: 'Vehicles Available', icon: Truck },
    { value: '12K+', label: 'Successful Trips', icon: CheckCircle2 },
    { value: '99.2%', label: 'On-Time Arrival', icon: Clock },
    { value: '4.9/5', label: 'Customer Rating', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a1219] via-[#0f1924] to-[#162533]">
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

        {/* Wave Divider */}
        <WaveDivider position="bottom" color={COLORS.POWDER_LIGHT} />

        <div className="relative mx-auto flex h-full w-full max-w-7xl items-center px-4 pt-24 pb-[120px] sm:px-6 lg:px-8 lg:pt-32">
          {/* 2-COLUMN LAYOUT */}
          <div className="grid w-full gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">

            {/* Left Column - Content */}
            <div className="flex flex-col justify-center">
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7D97B6]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Transport • Professional Drivers • Safe Journey
              </motion.div>

              {/* Main Title */}
              <motion.h1
                className="mt-10 max-w-xl text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              >
                Book Professional
                <br />
                <span className="bg-gradient-to-r from-[#7D97B6] via-[#E1E7F2] to-[#7D97B6] bg-clip-text text-transparent">
                  Transport
                </span>{' '}
                Services
              </motion.h1>

              {/* Description */}
              <motion.p
                className="mt-5 max-w-lg text-base leading-relaxed text-white/70"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Reliable and professional transportation services for your photography and videography crews. 
                Safe, punctual, and comfortable transport for your team and equipment.
              </motion.p>

              {/* Compact Stats Row */}
              <motion.div
                className="mt-6 flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {TRANSPORT_STATS.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7D97B6]/20">
                        <Icon className="h-5 w-5 text-[#7D97B6]" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-white/60">{stat.label}</div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Vehicle Types - Compact */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                  Vehicle Types Available
                </p>
                <div className="flex flex-wrap gap-2">
                  {vehicleTypes.slice(0, 4).map((vehicle, index) => (
                    <button
                      key={index}
                      type="button"
                      className="group flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm transition-all hover:border-[#7D97B6]/50 hover:bg-[#7D97B6]/20"
                    >
                      <Truck className="h-3 w-3 transition-transform group-hover:scale-110" />
                      <span>{vehicle.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Search Card */}
            <motion.div
              className="flex items-center lg:w-[500px]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="w-full rounded-3xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-xl">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#162533]">Find Transport</h3>
                  <p className="mt-2 text-sm text-[#546079]">
                    Select location and date to see available vehicles
                  </p>
                </div>

                <div className="space-y-4">
                  <LocationDateWidget
                    selectedLocation={selectedLocation}
                    selectedDate={selectedDate}
                    onLocationChange={setSelectedLocation}
                    onDateChange={setSelectedDate}
                  />
                </div>

                <motion.button
                  type="button"
                  onClick={handleFindTransport}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#162533] to-[#0f1924] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#162533]/30 transition-all hover:shadow-xl"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Truck className="h-5 w-5" />
                  <span>Search Transport</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>

                <div className="mt-6 space-y-3 border-t border-[#E1E7F2] pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {['AP', 'SR', 'BS'].map((initials) => (
                        <div
                          key={initials}
                          className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#7D97B6] to-[#546079] text-xs font-bold text-white shadow-md"
                        >
                          {initials}
                        </div>
                      ))}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-[#7D97B6] text-[#7D97B6]" />
                        ))}
                        <span className="ml-1 text-sm font-semibold text-[#162533]">4.9</span>
                      </div>
                      <p className="text-xs text-[#546079]">Trusted by 12,000+ clients</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-[#7D97B6]/30 bg-[#7D97B6]/10 px-4 py-2.5 text-xs font-semibold text-[#162533]">
                    <CheckCircle2 className="h-4 w-4 text-[#7D97B6]" />
                    99.2% on-time arrival guaranteed
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section id="benefits" className="relative overflow-hidden py-16 lg:py-24" style={{ backgroundColor: COLORS.POWDER_LIGHT }}>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <motion.div
              className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider"
              style={{ color: COLORS.BLUE_LIGHT }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Why Choose Us
            </motion.div>

            <motion.h2
              className="mb-4 text-[clamp(1.875rem,3.5vw,2.5rem)] font-bold tracking-tight"
              style={{ color: COLORS.NAVY_DARK }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Why Choose Our Transport Services?
            </motion.h2>

            <motion.p
              className="mx-auto max-w-2xl text-base"
              style={{ color: COLORS.SLATE_MEDIUM }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Professional, reliable, and efficient transport solutions for your team
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="group relative h-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-full rounded-2xl bg-white p-7 text-center shadow-md transition-all duration-300 hover:shadow-xl">
                  <div
                    className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: `${COLORS.BLUE_LIGHT}15` }}
                  >
                    <div style={{ color: COLORS.BLUE_LIGHT }}>
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: COLORS.SLATE_MEDIUM }}>
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Wave Divider */}
        <WaveDivider position="bottom" color="#ffffff" />
      </section>

      {/* Vehicle Types */}
      <section id="services" className="py-16 px-4 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <motion.div
              className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider"
              style={{ color: COLORS.BLUE_LIGHT }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Our Fleet
            </motion.div>

            <motion.h2
              className="mb-4 text-[clamp(1.875rem,3.5vw,2.5rem)] font-bold tracking-tight"
              style={{ color: COLORS.NAVY_DARK }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Our Vehicle Fleet
            </motion.h2>

            <motion.p
              className="mx-auto max-w-2xl text-base"
              style={{ color: COLORS.SLATE_MEDIUM }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Choose from our diverse range of vehicles to match your specific needs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicleTypes.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="mb-6 text-center">
                    <div className="mb-3 text-5xl">{vehicle.icon}</div>
                    <h3 className="mb-1 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                      {vehicle.name}
                    </h3>
                    <p className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                      {vehicle.capacity}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="mb-3 text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                      {vehicle.description}
                    </p>
                    <p className="mb-3 text-2xl font-bold" style={{ color: COLORS.BLUE_LIGHT }}>
                      {vehicle.price}
                    </p>
                  </div>
                  <ul className="mb-6 space-y-2">
                    {vehicle.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                        <CheckCircle2 className="mr-2 h-4 w-4" style={{ color: COLORS.BLUE_LIGHT }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    type="button"
                    className="w-full rounded-xl py-3 font-medium transition-all"
                    style={{ 
                      backgroundColor: `${COLORS.BLUE_LIGHT}15`, 
                      color: COLORS.BLUE_LIGHT 
                    }}
                    whileHover={{ scale: 1.02, backgroundColor: COLORS.BLUE_LIGHT, color: '#ffffff' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Calculator */}
      <section id="calculate" className="relative overflow-hidden py-16 lg:py-24" style={{ backgroundColor: COLORS.POWDER_LIGHT }}>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <motion.div
              className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider"
              style={{ color: COLORS.BLUE_LIGHT }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Cost Calculator
            </motion.div>

            <motion.h2
              className="mb-4 text-[clamp(1.875rem,3.5vw,2.5rem)] font-bold tracking-tight"
              style={{ color: COLORS.NAVY_DARK }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Calculate Your Transport Cost
            </motion.h2>

            <motion.p
              className="mx-auto max-w-2xl text-base"
              style={{ color: COLORS.SLATE_MEDIUM }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Get an instant estimate for your transport needs
            </motion.p>
          </div>

          <motion.div
            className="mb-10 rounded-3xl bg-white p-8 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium" style={{ color: COLORS.NAVY_DARK }}>
                  From Location
                </label>
                <input 
                  type="text" 
                  name="from"
                  placeholder="Departure city or address" 
                  className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7D97B6]"
                  style={{ 
                    backgroundColor: COLORS.POWDER_LIGHT,
                    borderColor: COLORS.SLATE_MEDIUM + '40',
                    color: COLORS.NAVY_DARK
                  }}
                  value={costCalculation.from}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium" style={{ color: COLORS.NAVY_DARK }}>
                  To Location
                </label>
                <input 
                  type="text" 
                  name="to"
                  placeholder="Destination city or address" 
                  className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7D97B6]"
                  style={{ 
                    backgroundColor: COLORS.POWDER_LIGHT,
                    borderColor: COLORS.SLATE_MEDIUM + '40',
                    color: COLORS.NAVY_DARK
                  }}
                  value={costCalculation.to}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium" style={{ color: COLORS.NAVY_DARK }}>
                  Team Size
                </label>
                <select 
                  name="teamSize"
                  className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7D97B6]"
                  style={{ 
                    backgroundColor: COLORS.POWDER_LIGHT,
                    borderColor: COLORS.SLATE_MEDIUM + '40',
                    color: COLORS.NAVY_DARK
                  }}
                  value={costCalculation.teamSize}
                  onChange={handleInputChange}
                >
                  <option value="1-3">1-3 people</option>
                  <option value="4-6">4-6 people</option>
                  <option value="7-10">7-10 people</option>
                  <option value="10+">10+ people</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium" style={{ color: COLORS.NAVY_DARK }}>
                  Vehicle Type
                </label>
                <select 
                  name="vehicleType"
                  className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7D97B6]"
                  style={{ 
                    backgroundColor: COLORS.POWDER_LIGHT,
                    borderColor: COLORS.SLATE_MEDIUM + '40',
                    color: COLORS.NAVY_DARK
                  }}
                  value={costCalculation.vehicleType}
                  onChange={handleInputChange}
                >
                  <option value="luxury-van">Luxury Van</option>
                  <option value="professional-suv">Professional SUV</option>
                  <option value="cargo-transport">Cargo Transport</option>
                  <option value="executive-sedan">Executive Sedan</option>
                  <option value="motorcycle-courier">Motorcycle Courier</option>
                  <option value="hybrid-van">Hybrid Van</option>
                </select>
              </div>
            </div>

            <div className="mb-8 text-center">
              {isCalculated ? (
                <div className="rounded-2xl p-6" style={{ backgroundColor: `${COLORS.BLUE_LIGHT}15` }}>
                  <p className="mb-2" style={{ color: COLORS.SLATE_MEDIUM }}>
                    Estimated Cost:
                  </p>
                  <p className="text-3xl font-bold" style={{ color: COLORS.BLUE_LIGHT }}>
                    Rp {calculatedCost.toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                    Price may vary based on actual distance and requirements
                  </p>
                </div>
              ) : (
                <p style={{ color: COLORS.SLATE_MEDIUM }}>
                  Enter your details to get an estimate
                </p>
              )}
            </div>

            <div className="text-center">
              <motion.button 
                type="button"
                onClick={calculateCost}
                className="rounded-xl px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl"
                style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Calculate Transport Cost
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <WaveDivider position="bottom" color="#ffffff" />
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <motion.div
              className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider"
              style={{ color: COLORS.BLUE_LIGHT }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Testimonials
            </motion.div>

            <motion.h2
              className="mb-4 text-[clamp(1.875rem,3.5vw,2.5rem)] font-bold tracking-tight"
              style={{ color: COLORS.NAVY_DARK }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              What Our Clients Say
            </motion.h2>

            <motion.p
              className="mx-auto max-w-2xl text-base"
              style={{ color: COLORS.SLATE_MEDIUM }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Don't just take our word for it - hear from our satisfied clients
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                name: 'Andi Pratama',
                role: 'Wedding Photographer',
                initials: 'AP',
                text: 'The transport service was exceptional. Our crew arrived on time and comfortable. Highly recommend!'
              },
              {
                name: 'Siti Rahma',
                role: 'Event Videographer',
                initials: 'SR',
                text: 'Professional drivers and well-maintained vehicles made our multi-location shoot stress-free.'
              },
              {
                name: 'Budi Santoso',
                role: 'Commercial Director',
                initials: 'BS',
                text: 'Reliable and punctual. Exactly what we needed for our team during the corporate event.'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="rounded-2xl p-6"
                style={{ backgroundColor: COLORS.POWDER_LIGHT }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4 flex items-center">
                  <div 
                    className="flex h-16 w-16 items-center justify-center rounded-xl text-lg font-bold text-white"
                    style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                  >
                    {testimonial.initials}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold" style={{ color: COLORS.NAVY_DARK }}>
                      {testimonial.name}
                    </h4>
                    <p className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="italic" style={{ color: COLORS.SLATE_MEDIUM }}>
                  "{testimonial.text}"
                </p>
                <div className="mt-3 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#7D97B6] text-[#7D97B6]" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section + CTA */}
      <section className="relative overflow-hidden py-16 lg:py-24" style={{ backgroundColor: COLORS.POWDER_LIGHT }}>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            <motion.div
              className="group p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${COLORS.BLUE_LIGHT}20` }}
              >
                <Shield className="h-8 w-8" style={{ color: COLORS.BLUE_LIGHT }} />
              </div>
              <h3 className="mb-3 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                Verified Drivers
              </h3>
              <p className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                All drivers are professionally licensed and background checked
              </p>
            </motion.div>

            <motion.div
              className="group p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${COLORS.BLUE_LIGHT}20` }}
              >
                <Lock className="h-8 w-8" style={{ color: COLORS.BLUE_LIGHT }} />
              </div>
              <h3 className="mb-3 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                Secure Transport
              </h3>
              <p className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                All vehicles are equipped with safety features and insurance coverage
              </p>
            </motion.div>

            <motion.div
              className="group p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${COLORS.BLUE_LIGHT}20` }}
              >
                <Zap className="h-8 w-8" style={{ color: COLORS.BLUE_LIGHT }} />
              </div>
              <h3 className="mb-3 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                Punctual Service
              </h3>
              <p className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                On-time arrival guaranteed with real-time tracking
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: COLORS.NAVY_DARK }}>
              Ready to Book Transport Services?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg" style={{ color: COLORS.SLATE_MEDIUM }}>
              Experience reliable and comfortable transport for your team and equipment.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.button
                type="button"
                onClick={() => router.push('/booking')}
                className="rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl"
                style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Transport Now
              </motion.button>
              <motion.button
                type="button"
                onClick={() => router.push('/contact')}
                className="rounded-full border-2 px-8 py-4 text-lg font-bold transition-all"
                style={{ 
                  borderColor: COLORS.BLUE_LIGHT,
                  color: COLORS.BLUE_LIGHT
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  backgroundColor: COLORS.BLUE_LIGHT,
                  color: '#ffffff'
                }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Support
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <WaveDivider position="bottom" color="#ffffff" />
      </section>

      <Footer />
    </div>
  );
};

export default TransportPage;