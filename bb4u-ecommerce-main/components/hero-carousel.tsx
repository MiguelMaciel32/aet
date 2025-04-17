"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"

// Slides com imagens diferentes para mobile e desktop
const slides = [
  {
    id: 1,
    desktopImage: "apc.png",
    mobileImage: "ggg.png",
    bgColor: "from-rose-500/70",
  },
  {
    id: 2,
    desktopImage: "/carousel/slide2-desktop.jpg",
    mobileImage: "/carousel/slide2-mobile.jpg",
    bgColor: "from-rose-500/70",
  },
  {
    id: 3,
    desktopImage: "/carousel/slide3-desktop.jpg",
    mobileImage: "/carousel/slide3-mobile.jpg",
    bgColor: "from-rose-500/70",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useMobile()

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  // Reset autoplay timer
  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }

    autoplayRef.current = setInterval(() => {
      nextSlide()
    }, 5000) // Aumentado para 5 segundos para dar mais tempo para visualizar as imagens
  }

  // Initialize autoplay
  useEffect(() => {
    resetAutoplay()

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [])

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    handleSwipe()
  }

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grabbing"
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    touchEndX.current = e.clientX
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab"
    }
    handleSwipe()
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (touchStartX.current !== 0) {
      touchEndX.current = e.clientX
      if (carouselRef.current) {
        carouselRef.current.style.cursor = "grab"
      }
      handleSwipe()
    }
  }

  // Handle swipe logic
  const handleSwipe = () => {
    const swipeDistance = touchEndX.current - touchStartX.current
    const minSwipeDistance = 50 // Minimum distance to register as a swipe

    if (swipeDistance > minSwipeDistance) {
      // Swiped right, go to previous slide
      prevSlide()
    } else if (swipeDistance < -minSwipeDistance) {
      // Swiped left, go to next slide
      nextSlide()
    }

    // Reset touch positions
    touchStartX.current = 0
    touchEndX.current = 0

    // Reset autoplay timer after user interaction
    resetAutoplay()
  }

  return (
    <div
      className="relative overflow-hidden"
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "grab" }}
    >
      {/* Main Carousel */}
      <div className="relative">
        {/* Slides - Increased height for mobile from 400px to 500px */}
        <div className="relative h-[600px] md:h-[600px]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${
                index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
              } absolute inset-0 transition-opacity duration-500 ease-in-out`}
            >
              {/* Imagem diferente para mobile e desktop */}
              <div className="relative w-full h-full">
                {/* Imagem para desktop - escondida em mobile */}
                <div className="hidden md:block w-full h-full">
                  <Image
                    src={slide.desktopImage || "/placeholder.svg"}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover object-center"
                    priority={index === 0}
                  />
                </div>

                {/* Imagem para mobile - escondida em desktop */}
                <div className="block md:hidden w-full h-full">
                  <Image
                    src={slide.mobileImage || "/placeholder.svg"}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover object-center"
                    priority={index === 0}
                  />
                </div>

                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} to-transparent opacity-70`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index)
              resetAutoplay()
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
