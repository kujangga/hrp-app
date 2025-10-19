'use client'

import { useSession } from 'next-auth/react'
import HeroSection from '@/components/landing/HeroSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import LocationCoverage from '@/components/landing/LocationCoverage'
import CtaSection from '@/components/landing/CtaSection'
import ServiceGatewaySection from '@/components/landing/ServiceGatewaySection'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-white">
      <HeroSection session={session} />
      <ServiceGatewaySection />
      <HowItWorksSection />
      <LocationCoverage />
      <CtaSection session={session} />
    </div>
  )
}