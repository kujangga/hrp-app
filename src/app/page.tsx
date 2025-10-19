'use client'

import { useSession } from 'next-auth/react'
import HeroSection from '@/components/landing/HeroSection'
import WhyHRPSection from '@/components/landing/WhyHRPSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import TalentShowcase from '@/components/landing/PhotographerShowcase' // Updated component name
import HowItWorks from '@/components/landing/HowItWorks'
import PortfolioGallery from '@/components/landing/PortfolioGallery'
import Testimonials from '@/components/landing/Testimonials'
import LocationCoverage from '@/components/landing/LocationCoverage'
import CtaSection from '@/components/landing/CtaSection'
import ServiceGatewaySection from '@/components/landing/ServiceGatewaySection'
import EquipmentPreviewSection from '@/components/landing/EquipmentPreviewSection'
import TransportSection from '@/components/landing/TransportSection'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-white">
      <HeroSection session={session} />
      <WhyHRPSection />
      <HowItWorksSection />
      <ServiceGatewaySection />
      <TalentShowcase />
      <EquipmentPreviewSection />
      <TransportSection />
      <HowItWorks />
      <PortfolioGallery />
      <Testimonials />
      <LocationCoverage />
      <CtaSection session={session} />
    </div>
  )
}