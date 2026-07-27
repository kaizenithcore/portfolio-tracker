import { Hero } from '@/components/marketing/Hero'
import { HowItWorks } from '@/components/marketing/HowItWorks'
import { CatalogPreview } from '@/components/marketing/CatalogPreview'
import { LegalDisclaimer } from '@/components/marketing/LegalDisclaimer'

export function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <div className="flex-1">
        <Hero />
        <HowItWorks />
        <CatalogPreview />
      </div>
      <LegalDisclaimer />
    </div>
  )
}
