"use client"

import { useEffect, useState } from "react"

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll to hide banner
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Optional: Add ability to dismiss the banner
  const hideBanner = () => {
    setIsVisible(false)
    // Optional: Save to localStorage to keep it hidden on refresh
    localStorage.setItem("announcementBannerHidden", "true")
  }

  // Optional: Check localStorage on component mount
  useEffect(() => {
    const isHidden = localStorage.getItem("announcementBannerHidden") === "true"
    if (isHidden) {
      setIsVisible(false)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] overflow-hidden bg-rose-400 text-white py-1 text-xs whitespace-nowrap transition-transform duration-300 ${
        isScrolled ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="animate-marquee flex">
        <span className="mx-4">SUL / SUDESTE FRETE GRÁTIS ACIMA DE R$ 199,90</span>
        <span className="mx-4">•</span>
        <span className="mx-4">SUL / SUDESTE FRETE GRÁTIS ACIMA DE R$ 199,90</span>
        <span className="mx-4">•</span>
        <span className="mx-4">SUL / SUDESTE FRETE GRÁTIS ACIMA DE R$ 199,90</span>
        <span className="mx-4">•</span>
      </div>
    </div>
  )
}
