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
  Camera,
  Package,
  CheckCircle2,
  Star,
  Shield,
  Lock,
  Zap
} from 'lucide-react';

const EquipmentPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  const equipmentItems = [
    {
      id: 1,
      name: 'Professional Camera Body',
      price: 'Rp 500,000/day',
      category: 'Cameras',
      image: '/placeholder-camera.jpg',
      features: ['Full Frame Sensor', '4K Video', 'Weather Sealed', '24.2 MP Resolution'],
      description: 'High-quality camera for professional photography and videography with exceptional image quality.'
    },
    {
      id: 2,
      name: 'Drone with Gimbal',
      price: 'Rp 350,000/day',
      category: 'Aerial',
      image: '/placeholder-drone.jpg',
      features: ['4K Video', 'GPS Stabilization', '20min Flight', 'Foldable Design'],
      description: 'Professional drone for capturing stunning aerial shots with smooth gimbal stabilization.'
    },
    {
      id: 3,
      name: 'Professional Lighting Kit',
      price: 'Rp 250,000/day',
      category: 'Lighting',
      image: '/placeholder-lighting.jpg',
      features: ['LED Panel', 'Softbox Included', 'Battery Powered', 'Adjustable Color Temperature'],
      description: 'Complete lighting solution for studio and outdoor photography with adjustable brightness.'
    },
    {
      id: 4,
      name: 'Professional Audio Kit',
      price: 'Rp 200,000/day',
      category: 'Audio',
      image: '/placeholder-audio.jpg',
      features: ['Wireless Mics', 'Audio Mixer', 'Digital Recorder', 'XLR Connectors'],
      description: 'Professional audio setup for high-quality sound recording during video shoots.'
    },
    {
      id: 5,
      name: 'Stabilizer Gimbal',
      price: 'Rp 180,000/day',
      category: 'Stabilizers',
      image: '/placeholder-gimbal.jpg',
      features: ['3-Axis Stabilization', 'Pan-Follow Mode', 'Camera Control', '12 Hour Battery'],
      description: 'Advanced gimbal system for smooth, cinematic camera movements and shots.'
    },
    {
      id: 6,
      name: 'Travel Tripod',
      price: 'Rp 120,000/day',
      category: 'Support',
      image: '/placeholder-tripod.jpg',
      features: ['Aluminum Construction', 'Adjustable Height', 'Panoramic Head', 'Carry Bag Included'],
      description: 'Lightweight yet sturdy tripod for all your photography needs while traveling.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Equipment' },
    { id: 'cameras', name: 'Cameras' },
    { id: 'aerial', name: 'Aerial' },
    { id: 'lighting', name: 'Lighting' },
    { id: 'audio', name: 'Audio' },
    { id: 'stabilizers', name: 'Stabilizers' },
    { id: 'support', name: 'Support' }
  ];

  const bundleSavings = [
    '25% discount on photographer + equipment bundles',
    'Free transport for orders over 5 items',
    'Priority availability during peak seasons'
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEquipment = equipmentItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || 
      item.category.toLowerCase().includes(selectedCategory);
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === equipmentItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? equipmentItems.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleFindEquipment = () => {
    if (!selectedLocation || !selectedDate) {
      alert('Please select both a location and a date to continue');
      return;
    }
    router.push(`/equipment/search?location=${encodeURIComponent(selectedLocation)}&date=${selectedDate}`);
  };

  const EQUIPMENT_STATS = [
    { value: '500+', label: 'Equipment Items', icon: Package },
    { value: '4,500+', label: 'Bookings Completed', icon: CheckCircle2 },
    { value: '99%', label: 'Customer Satisfaction', icon: Star },
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
                Equipment • Rental • Professional Grade
              </motion.div>

              {/* Main Title */}
              <motion.h1
                className="mt-10 max-w-xl text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              >
                Rent Professional
                <br />
                <span className="bg-gradient-to-r from-[#7D97B6] via-[#E1E7F2] to-[#7D97B6] bg-clip-text text-transparent">
                  Equipment
                </span>{' '}
                in Minutes
              </motion.h1>

              {/* Description */}
              <motion.p
                className="mt-5 max-w-lg text-base leading-relaxed text-white/70"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Access high-quality photography and videography equipment for your projects. 
                From cameras to drones, lighting to audio - everything you need to bring your vision to life.
              </motion.p>

              {/* Compact Stats Row */}
              <motion.div
                className="mt-6 flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {EQUIPMENT_STATS.map((stat, index) => {
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

              {/* Categories - Compact */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                  Browse by Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(1, 7).map((category, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      className="group flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm transition-all hover:border-[#7D97B6]/50 hover:bg-[#7D97B6]/20"
                    >
                      <Package className="h-3 w-3 transition-transform group-hover:scale-110" />
                      <span>{category.name}</span>
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
                  <h3 className="text-xl font-bold text-[#162533]">Find Equipment</h3>
                  <p className="mt-2 text-sm text-[#546079]">
                    Select location and date to see available equipment
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
                  onClick={handleFindEquipment}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#162533] to-[#0f1924] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#162533]/30 transition-all hover:shadow-xl"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Package className="h-5 w-5" />
                  <span>Search Equipment</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>

                <div className="mt-6 space-y-3 border-t border-[#E1E7F2] pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {['AB', 'CD', 'EF'].map((initials) => (
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
                      <p className="text-xs text-[#546079]">Trusted by 4,500+ clients</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-[#7D97B6]/30 bg-[#7D97B6]/10 px-4 py-2.5 text-xs font-semibold text-[#162533]">
                    <CheckCircle2 className="h-4 w-4 text-[#7D97B6]" />
                    Professional grade equipment guaranteed
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Featured Equipment Carousel */}
      <section id="featured" className="relative overflow-hidden py-16 lg:py-24" style={{ backgroundColor: COLORS.POWDER_LIGHT }}>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <motion.div
              className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider"
              style={{ color: COLORS.BLUE_LIGHT }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Featured Equipment
            </motion.div>

            <motion.h2
              className="mb-4 text-[clamp(1.875rem,3.5vw,2.5rem)] font-bold tracking-tight"
              style={{ color: COLORS.NAVY_DARK }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Most Popular Equipment Rentals
            </motion.h2>

            <motion.p
              className="mx-auto max-w-2xl text-base"
              style={{ color: COLORS.SLATE_MEDIUM }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Check out our most popular equipment rentals for your next project
            </motion.p>
          </div>

          {/* Bundle Savings Callout */}
          <motion.div
            className="mb-12 rounded-2xl border p-8 shadow-md"
            style={{ 
              backgroundColor: `${COLORS.BLUE_LIGHT}10`, 
              borderColor: `${COLORS.BLUE_LIGHT}30` 
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-3 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
              Bundle Package Savings
            </h3>
            <p className="mb-4" style={{ color: COLORS.SLATE_MEDIUM }}>
              Save big when you book talent, equipment, and transport together!
            </p>
            <ul className="space-y-2">
              {bundleSavings.map((savings, index) => (
                <li key={index} className="flex items-center" style={{ color: COLORS.SLATE_MEDIUM }}>
                  <CheckCircle2 className="mr-2 h-5 w-5" style={{ color: COLORS.BLUE_LIGHT }} />
                  {savings}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Equipment Carousel */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
              {/* Carousel Slide */}
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {equipmentItems.slice(0, 3).map((item, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-8 py-10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="md:w-1/2 flex justify-center">
                        <div className="relative overflow-hidden rounded-2xl border-2 border-dashed p-8 w-full max-w-md aspect-square flex items-center justify-center" style={{ borderColor: COLORS.BLUE_LIGHT, backgroundColor: `${COLORS.POWDER_LIGHT}` }}>
                          <div className="text-center">
                            <Package className="mx-auto mb-3 h-16 w-16" style={{ color: COLORS.BLUE_LIGHT }} />
                            <span style={{ color: COLORS.SLATE_MEDIUM }}>Equipment Image: {item.name}</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-1/2 text-center md:text-left">
                        <div className="mb-3 inline-block rounded-full px-4 py-1.5 text-sm font-medium" style={{ backgroundColor: `${COLORS.BLUE_LIGHT}20`, color: COLORS.BLUE_LIGHT }}>
                          {item.category}
                        </div>
                        <h3 className="mb-2 text-3xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                          {item.name}
                        </h3>
                        <p className="mb-4 text-2xl font-bold" style={{ color: COLORS.BLUE_LIGHT }}>
                          {item.price}
                        </p>
                        <p className="mb-6" style={{ color: COLORS.SLATE_MEDIUM }}>
                          {item.description}
                        </p>
                        <div className="mb-6">
                          <h4 className="mb-3 font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                            Key Features:
                          </h4>
                          <ul className="space-y-2">
                            {item.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center" style={{ color: COLORS.SLATE_MEDIUM }}>
                                <CheckCircle2 className="mr-2 h-4 w-4" style={{ color: COLORS.BLUE_LIGHT }} />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <motion.button
                          type="button"
                          className="rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                          style={{ backgroundColor: COLORS.BLUE_LIGHT }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Rent Equipment
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
                style={{ color: COLORS.NAVY_DARK }}
                aria-label="Previous equipment"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
                style={{ color: COLORS.NAVY_DARK }}
                aria-label="Next equipment"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {equipmentItems.slice(0, 3).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="h-3 w-3 rounded-full transition-all"
                  style={{ 
                    backgroundColor: currentSlide === index ? COLORS.BLUE_LIGHT : COLORS.SLATE_MEDIUM + '40'
                  }}
                  aria-label={`Go to equipment ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <WaveDivider position="bottom" color="#ffffff" />
      </section>

      {/* Full Inventory Section */}
      <section id="inventory" className="py-16 px-4 lg:py-24 bg-white">
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
              Complete Inventory
            </motion.div>

            <motion.h2
              className="mb-4 text-[clamp(1.875rem,3.5vw,2.5rem)] font-bold tracking-tight"
              style={{ color: COLORS.NAVY_DARK }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Full Equipment Inventory
            </motion.h2>

            <motion.p
              className="mx-auto max-w-2xl text-base"
              style={{ color: COLORS.SLATE_MEDIUM }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Browse our complete equipment catalog and find everything you need
            </motion.p>
          </div>

          {/* Search and Filter */}
          <motion.div
            className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search equipment..."
                className="w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-[#7D97B6] transition-all"
                style={{ 
                  borderColor: COLORS.SLATE_MEDIUM + '40'
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="rounded-full px-4 py-2 text-sm font-medium transition-all"
                  style={{
                    backgroundColor: selectedCategory === category.id ? COLORS.BLUE_LIGHT : COLORS.POWDER_LIGHT,
                    color: selectedCategory === category.id ? '#ffffff' : COLORS.SLATE_MEDIUM
                  }}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Equipment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map((item, index) => (
              <motion.div
                key={item.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="relative mb-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed" style={{ borderColor: COLORS.BLUE_LIGHT, backgroundColor: COLORS.POWDER_LIGHT }}>
                    <div className="text-center">
                      <Camera className="mx-auto mb-2 h-12 w-12" style={{ color: COLORS.BLUE_LIGHT }} />
                      <span className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                        {item.name}
                      </span>
                    </div>
                  </div>
                  <div className="mb-3 inline-block rounded-full px-3 py-1 text-sm font-medium" style={{ backgroundColor: `${COLORS.BLUE_LIGHT}20`, color: COLORS.BLUE_LIGHT }}>
                    {item.category}
                  </div>
                  <h3 className="mb-2 text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>
                    {item.name}
                  </h3>
                  <p className="mb-4 text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                    {item.description}
                  </p>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xl font-bold" style={{ color: COLORS.BLUE_LIGHT }}>
                      {item.price}
                    </p>
                    <motion.button
                      type="button"
                      className="rounded-lg px-4 py-2 font-medium transition-all"
                      style={{ 
                        backgroundColor: `${COLORS.BLUE_LIGHT}15`, 
                        color: COLORS.BLUE_LIGHT 
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                    </motion.button>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold" style={{ color: COLORS.NAVY_DARK }}>
                      Features:
                    </h4>
                    <ul className="space-y-1">
                      {item.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-xs" style={{ color: COLORS.SLATE_MEDIUM }}>
                          <CheckCircle2 className="mr-2 h-3 w-3" style={{ color: COLORS.BLUE_LIGHT }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative overflow-hidden py-16 lg:py-24" style={{ backgroundColor: COLORS.POWDER_LIGHT }}>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                Verified Equipment
              </h3>
              <p className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                All equipment is professionally maintained and verified for quality
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
                Secure Transactions
              </h3>
              <p className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                All bookings are secure with our guarantee and insurance coverage
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
                Fast Delivery
              </h3>
              <p className="text-sm" style={{ color: COLORS.SLATE_MEDIUM }}>
                Equipment delivered on time and ready to use for your shoot
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: COLORS.NAVY_DARK }}>
              Ready to Rent Professional Equipment?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg" style={{ color: COLORS.SLATE_MEDIUM }}>
              Join thousands of photographers and videographers who trust our equipment for their projects.
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
                Book Equipment Now
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

export default EquipmentPage;