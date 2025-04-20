"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, CreditCard } from "lucide-react"
import { useCart } from "@/context/cart-context"
import Image from "next/image"
import Link from "next/link"
import { useMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"

// Dados dos produtos - estes dados podem ser movidos para um arquivo separado
export const products = [
  {
    id: "1",
    slug: "kit-capilar-completo",
    name: "KIT S.O.S + EXCELENCE OIL",
    price: 499.0,
    originalPrice: 665.0,
    discount: "25% OFF",
    image: "kitsos.jpg",
    images: ["kitsos.jpg", "/hair-care-set-side.png", "/overhead-haircare-set.png"],
    rating: 4.5,
    reviewCount: 127,
    stock: 15,
    description:
      "Nosso kit completo é o aliado perfeito para manter seus cabelos lindos e bem cuidados. Com uma fórmula leve e nutritiva, este kit foi especialmente desenvolvido para todos os tipos de cabelo, proporcionando hidratação profunda e controle do frizz.",
    benefits: [
      "Hidratação profunda;",
      "Controle do frizz;",
      "Proteção térmica;",
      "Definição dos cachos;",
      "Brilho intenso;",
      "Sem parabenos;",
      "Sem sulfatos;",
    ],
    howToUse:
      "Aplique o shampoo nos cabelos molhados, massageie e enxágue. Em seguida, aplique o condicionador do meio para as pontas, deixe agir por 3 minutos e enxágue bem. Finalize com o óleo nas pontas para um brilho extra.",
    ingredients:
      "Aqua, Cetearyl Alcohol, Cetrimonium Chloride, Behentrimonium Chloride, Glycerin, Panthenol, Hydrolyzed Keratin, Argania Spinosa Kernel Oil, Butyrospermum Parkii Butter, Cocos Nucifera Oil, Parfum, Citric Acid, Benzyl Alcohol, Potassium Sorbate, Sodium Benzoate.",
    checkout: "https://excelencia-cosmeticos-ltda.pay.yampi.com.br/r/BQXF79WD2H",
  },
  {
    id: "2",
    slug: "kit-nutricao-intensa-cera-antifrizz",
    name: "SHAMPOO + LEAVE-IN",
    price: 299.0,
    originalPrice: 369.9,
    discount: "19% OFF",
    image: "shampo-leavin.jpg",
    images: ["shampo-leavin.jpg", "/nutrition-kit-side.png", "/nutrition-kit-overhead.png"],
    rating: 4.5,
    reviewCount: 89,
    stock: 8,
    description:
      "Nosso kit de nutrição intensa com cera antifrizz é perfeito para domar os fios rebeldes e controlar o frizz instantaneamente. Formato prático para levar na bolsa e usar a qualquer momento.",
    benefits: [
      "Controle imediato do frizz;",
      "Formato prático;",
      "Não pesa nos fios;",
      "Efeito natural;",
      "Pode ser usado em qualquer tipo de cabelo;",
    ],
    howToUse:
      "Use o shampoo normalmente e após secar os cabelos, aplique o leave-in nas pontas. Para um efeito mais suave, aplique primeiro nas mãos e depois distribua nos fios.",
    ingredients:
      "Cera de Abelha, Óleo de Coco, Óleo de Argan, Manteiga de Karité, Vitamina E, Cera de Carnaúba, Óleo de Jojoba, Extrato de Aloe Vera.",
    checkout: "/checkout/shampoo-leavein",
  },
  {
    id: "3",
    slug: "kit-hidratacao-intensa-cera",
    name: "KIT S.O.S + PROGRESSIVA ELISS",
    price: 199.0,
    originalPrice: 269.9,
    discount: "26% OFF",
    image: "soseliss.jpg",
    images: ["soseliss.jpg", "/hydration-kit-side.png", "/hydration-kit-overhead.png"],
    rating: 4.5,
    reviewCount: 56,
    stock: 20,
    description:
      "A poderosa combinação do Kit S.O.S com a Progressiva Eliss, uma fórmula exclusiva que contém a última tecnologia para tratar você de dentro para fora!",
    benefits: [
      "Hidratação intensa;",
      "Efeito liso duradouro;",
      "Redução do volume;",
      "Cabelos mais sedosos e brilhantes;",
      "Proteção contra danos externos;",
    ],
    howToUse:
      "Aplique o shampoo, enxágue e seque os cabelos. Aplique a progressiva mecha por mecha e deixe agir por 30 minutos. Enxágue e finalize como desejar.",
    ingredients:
      "Silício Orgânico, Queratina, Óleos Essenciais, Proteínas da Seda, Colágeno Hidrolisado, Extrato de Bambu.",
    checkout: "/checkout/sos-eliss",
  },
  {
    id: "4",
    slug: "kit-shampoo-e-condicionador",
    name: "KIT ARC-17 + HAIR",
    price: 79.9,
    originalPrice: 139.9,
    discount: "43% OFF",
    image: "archair.jpg",
    images: ["archair.jpg", "/shampoo-kit-side.png", "/shampoo-kit-overhead.png"],
    rating: 4.5,
    reviewCount: 112,
    stock: 5,
    description: "Kit com shampoo e condicionador para todos os tipos de cabelo.",
    benefits: ["Limpeza suave;", "Hidratação profunda;", "Não contém sulfatos;", "Cabelos mais macios e brilhantes;"],
    howToUse:
      "Aplique o shampoo nos cabelos molhados, massageie e enxágue. Em seguida, aplique o condicionador do meio para as pontas, deixe agir por 3 minutos e enxágue bem.",
    ingredients:
      "Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycerin, Parfum, Panthenol, Hydrolyzed Wheat Protein.",
    checkout: "/checkout/arc-hair",
  },
  {
    id: "5",
    slug: "kit-reconstrucao-capilar",
    name: "KIT ARC-17 COMPLETO",
    price: 249.9,
    originalPrice: 329.9,
    discount: "24% OFF",
    image: "arccompleto.jpg",
    images: ["arccompleto.jpg", "/side-view-reconstruction-kit.png", "/reconstruction-kit-overhead.png"],
    rating: 4.5,
    reviewCount: 78,
    stock: 12,
    description:
      "Kit completo com todos os produtos essenciais para o tratamento capilar. Ideal para recuperação total dos fios.",
    benefits: [
      "Tratamento completo;",
      "Recuperação de fios danificados;",
      "Hidratação intensiva;",
      "Nutrição profunda;",
      "Controle de frizz;",
      "Brilho e maciez;",
    ],
    howToUse: "Siga as instruções de cada produto na sequência recomendada para melhores resultados.",
    ingredients: "Veja a composição de cada produto individualmente nas respectivas embalagens.",
    checkout: "/checkout/arc-completo",
  },
  {
    id: "6",
    slug: "kit-crescimento-acelerado",
    name: "KIT CRESCIMENTO ACELERADO",
    price: 279.9,
    originalPrice: 349.9,
    discount: "20% OFF",
    image: "/produto.jpeg",
    images: ["/produto.jpeg", "/lateral-hair-growth-kit.png", "/hair-growth-top-view.png"],
    rating: 4.5,
    reviewCount: 65,
    stock: 10,
    description:
      "Kit especialmente formulado para acelerar o crescimento dos cabelos. Contém ingredientes que estimulam os folículos capilares.",
    benefits: [
      "Crescimento acelerado;",
      "Fortalecimento dos fios;",
      "Prevenção de quebra;",
      "Estímulo da circulação no couro cabeludo;",
      "Nutrição profunda;",
    ],
    howToUse:
      "Use o shampoo e condicionador normalmente. Aplique o tônico no couro cabeludo diariamente e massageie por 5 minutos.",
    ingredients:
      "Biotina, Cafeína, Extrato de Gengibre, Óleo de Rícino, Pantenol, Vitaminas do Complexo B, Proteínas Hidrolisadas.",
    checkout: "/checkout/crescimento-acelerado",
  },
  {
    id: "7",
    slug: "kit-antiqueda-completo",
    name: "KIT ANTIQUEDA COMPLETO",
    price: 319.9,
    originalPrice: 399.9,
    discount: "20% OFF",
    image: "/produto.jpeg",
    images: ["/produto.jpeg", "/anti-hair-loss-kit-side.png", "/overhead-hair-loss-kit.png"],
    rating: 4.5,
    reviewCount: 94,
    stock: 7,
    description:
      "Kit completo para combater a queda de cabelo. Formulado com ingredientes que fortalecem os fios desde a raiz.",
    benefits: [
      "Redução da queda;",
      "Fortalecimento dos fios;",
      "Estímulo do crescimento;",
      "Melhora da circulação no couro cabeludo;",
      "Nutrição profunda;",
    ],
    howToUse:
      "Use o shampoo e condicionador normalmente. Aplique o sérum no couro cabeludo à noite e massageie por 3 minutos.",
    ingredients:
      "Minoxidil, Cafeína, Extrato de Ginseng, Óleo de Argan, Biotina, Zinco, Vitaminas do Complexo B, Proteínas Hidrolisadas.",
    checkout: "/checkout/antiqueda-completo",
  },
  {
    id: "8",
    slug: "kit-brilho-intenso",
    name: "KIT BRILHO INTENSO",
    price: 189.9,
    originalPrice: 249.9,
    discount: "24% OFF",
    image: "/produto.jpeg",
    images: ["/produto.jpeg", "/side-view-sparkle.png", "/city-lights-aerial.png"],
    rating: 4.5,
    reviewCount: 82,
    stock: 15,
    description: "Kit desenvolvido para proporcionar brilho intenso aos cabelos. Ideal para cabelos opacos e sem vida.",
    benefits: [
      "Brilho intenso;",
      "Maciez extrema;",
      "Selamento das cutículas;",
      "Proteção contra danos externos;",
      "Efeito espelhado;",
    ],
    howToUse:
      "Use o shampoo e condicionador normalmente. Aplique o sérum de brilho nos cabelos úmidos ou secos para finalizar.",
    ingredients:
      "Óleo de Argan, Óleo de Coco, Extrato de Pérola, Proteínas da Seda, Vitamina E, Pantenol, Queratina Hidrolisada.",
    checkout: "/checkout/brilho-intenso",
  },
]

export function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState("next")
  const isMobileInitial = useMobile()
  const [isMobile, setIsMobile] = useState(isMobileInitial)

  useEffect(() => {
    setIsMobile(isMobileInitial)
  }, [isMobileInitial])

  const { addItem } = useCart()
  const carouselRef = useRef<HTMLDivElement>(null)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragDistance, setDragDistance] = useState(0)

  // Calculate how many products to show based on screen size
  const productsPerPage = isMobile ? 1 : 4
  const totalPages = Math.ceil(products.length / productsPerPage)

  // Get visible products based on current index and products per page
  const visibleProducts = isMobile
    ? products.slice(currentIndex, currentIndex + 1)
    : products.slice(currentIndex * productsPerPage, (currentIndex + 1) * productsPerPage)

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

  const handleBuyNow = (product: any, e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation
    e.stopPropagation() // Impedir que o evento de clique propague para o Link
    // Redirecionar diretamente para o checkout específico do produto
    window.location.href = product.checkout || "/checkout"
  }

  // Modificar a função renderProductCard para passar apenas título, preço e checkout na URL
  const renderProductCard = (product: any) => (
    <div key={product.id} className="relative group w-full max-w-xs mx-auto">
      <Link
        href={`/produto/${product.slug}?id=${product.id}&title=${encodeURIComponent(product.name)}&price=${product.price}&image=${product.image}&checkout=${encodeURIComponent(product.checkout || "")}`}
        className="block"
      >
        <div className="bg-gray-50 rounded-lg overflow-hidden h-[480px] shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="relative h-[250px] w-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 250px"
                className="transition-transform duration-300 group-hover:scale-105"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {product.discount}
            </div>
          </div>
          <div className="p-4 h-[230px] flex flex-col">
            <div className="flex mb-2">
              {[1, 2, 3, 4].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588 1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg className="w-5 h-5 text-yellow-400 text-opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588 1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h3 className="font-bold text-sm mb-2 line-clamp-2 h-10">{product.name}</h3>
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

            {/* Botão de compra */}
            <div className="mt-auto">
              <Button
                onClick={(e) => {
                  e.stopPropagation() // Apenas impedir a propagação para não acionar o Link
                  handleBuyNow(product, e)
                }}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center"
                size="sm"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Comprar agora
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

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-pink-500">Kits de tratamento completo</h2>
          <p className="text-lg mt-2">Confira os melhores KITS para cabelos do Brasil</p>
        </div>

        <div className="relative">
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
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`flex-shrink-0 carousel-item ${isMobile ? "w-full" : "w-1/4"} px-3`}
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
                className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-3 shadow-md z-10 transition-transform duration-300 hover:scale-110"
                aria-label="Produto anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-3 shadow-md z-10 transition-transform duration-300 hover:scale-110"
                aria-label="Próximo produto"
              >
                <ChevronRight className="h-6 w-6" />
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
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-black w-5" : "bg-gray-300 hover:bg-gray-400"
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
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-black w-5" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Ir para página ${index + 1}`}
                />
              ))}
        </div>
      </div>
    </section>
  )
}
