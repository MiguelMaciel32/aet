import { HeroCarousel } from "@/components/hero-carousel"
import { ProductCarousel } from "@/components/product-carousel"
import { ProductHighlight } from "@/components/product-highlight"
import { FaqSection } from "@/components/faq-section"
import { NewsletterPopup } from "@/components/newsletter-popup"
import { WhatsAppButton } from "@/components/whatsapp-button"
import ProductPromo from "@/components/quality-badges-carousel"
import { ProductCarousel2 } from "@/components/product-carousel2"
import VideoCarousel from "@/components/video-carroseul"
import { WarrantyBadgeAlt } from "@/components/30dias"
import { EnhancedSupportContact } from "@/components/enhanced-support-contact"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Announcement Bar */}

      <main className="flex-1">

      <HeroCarousel />

{/* Product Carousel */}
<ProductCarousel />

{/* Product Highlight */}
<ProductHighlight />

{/* Quality Badges Carousel */}
<ProductPromo />

<ProductCarousel2/>

<VideoCarousel />

    <div className="mt-12 "></div>
    

<WarrantyBadgeAlt />
<div className="mt-12 "></div>

{/* FAQ Section */}
<FaqSection />

<div className="container mx-auto py-12 px-4 bg-rose-50 mb-12 ">
      <h1 className="text-2xl font-bold text-center text-rose-600 mb-4">Suporte ao Cliente</h1>
      <EnhancedSupportContact whatsappNumber="5511999999999" email="suporte@seusite.com.br" />
    </div>

      </main>

      <NewsletterPopup />

 
      <WhatsAppButton />
    </div>
  )
}
