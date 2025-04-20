"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, CreditCard, Heart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import Image from "next/image"
import Link from "next/link"
import { useMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { products } from "./product-carousel"

export function ProductCarousel2() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState("next")
  const isMobile = useMobile()
  const { addItem } = useCart()
  const carouselRef = useRef<HTMLDivElement>(null)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragDistance, setDragDistance] = useState(0)

  // Calculate how many products to show based on screen size
  const productsPerPage = isMobile ? 1 : 4
  const totalPages = Math.ceil(products.length / productsPerPage)

  // Handle touch/mouse start
  const handleDragStart = (clientX: number) => {
    if (isMobile) {
      setIsDragging(true)
      setStartX(clientX)
      setDragDistance(0)
    }
  }

  // Handle touch/mouse move
  const handleDragMove = (clientX: number) => {
    if (!isDragging || !isMobile) return

    const distance = startX - clientX
    setDragDistance(distance)
  }

  // Handle touch/mouse end
  const handleDragEnd = () => {
    if (!isDragging || !isMobile) return

    setIsDragging(false)

    // If dragged far enough, change the slide
    const threshold = 50 // Minimum drag distance to trigger slide change

    if (dragDistance > threshold) {
      // Dragged left - go to next slide
      handleNext()
    } else if (dragDistance < -threshold) {
      // Dragged right - go to previous slide
      handlePrev()
    }

    setDragDistance(0)
  }

  // Go to next slide with animation
  const handleNext = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setDirection("next")

    // Simplesmente mude o índice sem atrasos complexos
    if (isMobile) {
      setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1))
    } else {
      setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
    }

    // Desative a animação após a transição
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  // Go to previous slide with animation
  const handlePrev = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setDirection("prev")

    // Simplesmente mude o índice sem atrasos complexos
    if (isMobile) {
      setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1))
    } else {
      setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
    }

    // Desative a animação após a transição
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  // Auto-rotate on mobile
  useEffect(() => {
    if (isMobile && !isDragging && !isAnimating) {
      const interval = setInterval(() => {
        handleNext()
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isMobile, currentIndex, isDragging, isAnimating])

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation
    addItem(product)
  }

  const handleBuyNow = (product: any, e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation
    e.stopPropagation() // Impedir que o evento de clique propague para o Link
    // Redirecionar diretamente para o checkout específico do produto
    window.location.href = product.checkout || "/checkout"
  }

  // Modificar a função renderProductCard para passar apenas título, preço e checkout na URL
  const renderProductCard = (product: any) => (
    <div
      key={product.id}
      className="relative group w-full transform transition-transform duration-300 hover:scale-[1.02]"
    >
      <Link
        href={`/produto/${product.slug}?id=${product.id}&title=${encodeURIComponent(product.name)}&price=${product.price}&checkout=${encodeURIComponent(product.checkout || "")}`}
        className="block"
      >
        <div className="bg-white rounded-lg overflow-hidden h-[420px] shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="relative h-[220px] w-full overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 250px"
                className="transition-transform duration-500 group-hover:scale-110"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {product.discount}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                // Adicionar à lista de desejos (implementação futura)
              }}
              className="absolute top-2 left-2 bg-white/80 hover:bg-white text-pink-500 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Adicionar à lista de desejos"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 flex flex-col">
            <div className="flex mb-1">
              {[1, 2, 3, 4, 5].map((star, i) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
            </div>
            <h3 className="font-bold text-sm mb-1 line-clamp-2 h-10">{product.name}</h3>
            <div className="flex items-center gap-2 mt-auto">
              <span className="text-xl font-bold text-pink-500">R$ {product.price.toFixed(2).replace(".", ",")}</span>
              <span className="text-sm text-gray-500 line-through">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <div className="mt-1 mb-3">
              <span className="text-xs text-gray-500">
                ou 12x de R$ {(product.price / 12).toFixed(2).replace(".", ",")}
              </span>
            </div>

            {/* Botões de ação */}
            <div className="mt-auto">
              <Button
                onClick={(e) => {
                  e.stopPropagation() // Apenas impedir a propagação para não acionar o Link
                  handleBuyNow(product, e)
                }}
                className="bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center w-full"
                size="sm"
              >
                <CreditCard className="w-4 h-4 mr-1" />
                <span className="text-xs">Comprar</span>
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )

  // CSS classes for animation
  const getAnimationClasses = () => {
    return "transition-transform duration-500 ease-out"
  }

  // Calcular o número máximo de páginas
  const maxPage = Math.ceil(products.length / productsPerPage) - 1

  // Verificar se estamos na última página
  const isLastPage = currentIndex === maxPage

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-500">Nossos lançamentos</h2>
          <p className="text-lg mt-2 text-gray-600">Confira todas as novidades da Excelência Cosméticos</p>
        </div>

        <div className="relative w-[90%] mx-auto">
          <div
            className="relative overflow-hidden touch-pan-y"
            ref={carouselRef}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            <style jsx global>{`
  .carousel-item {
    transition: all 0.5s ease;
  }
`}</style>

            <div
              className={`flex ${getAnimationClasses()} ${isDragging ? "transition-none" : ""}`}
              style={{
                transform: isDragging
                  ? `translateX(${-currentIndex * (100 / productsPerPage)}% - ${dragDistance}px)`
                  : `translateX(${-currentIndex * (100 / productsPerPage)}%)`,
                padding: "0 4px",
              }}
            >
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`flex-shrink-0 carousel-item px-2`}
                  style={{
                    width: `${100 / productsPerPage}%`,
                  }}
                >
                  {renderProductCard(product)}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Only show on desktop */}
          {!isMobile && (
            <>
              <button
                onClick={handlePrev}
                className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-3 shadow-md z-10 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Produto anterior"
              >
                <ChevronLeft className="h-6 w-6 text-pink-500" />
              </button>
              <button
                onClick={handleNext}
                className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-3 shadow-md z-10 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Próximo produto"
              >
                <ChevronRight className="h-6 w-6 text-pink-500" />
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {isMobile
            ? // Mobile pagination - one dot per product
              products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? "next" : "prev")
                    setIsAnimating(true)
                    setCurrentIndex(index)
                    setTimeout(() => {
                      setIsAnimating(false)
                    }, 500)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-pink-500 w-6" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Ir para produto ${index + 1}`}
                />
              ))
            : // Desktop pagination - one dot per page
              Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? "next" : "prev")
                    setIsAnimating(true)
                    setCurrentIndex(index)
                    setTimeout(() => {
                      setIsAnimating(false)
                    }, 500)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-pink-500 w-6" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Ir para página ${index + 1}`}
                />
              ))}
        </div>
      </div>
    </section>
  ) 
}
