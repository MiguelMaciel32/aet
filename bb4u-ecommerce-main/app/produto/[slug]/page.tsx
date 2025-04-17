"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingCart, Heart, Share2, Truck, CreditCard, ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Product database (would normally come from a real database/API)
const productDatabase = [
  {
    id: "1",
    slug: "kit-capilar-completo",
    name: "KIT S.O.S + EXCELENCE OIL",
    price: 499.0,
    originalPrice: 665.0,
    discount: "25% OFF",
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
    images: ["kitsos.jpg", "/hair-care-set-side.png", "/overhead-haircare-set.png"],
    tags: ["Mais vendido", "Promoção"],
  },
  {
    id: "2",
    slug: "kit-nutricao-intensa-cera-antifrizz",
    name: "SHAMPOO + LEAVE-IN",
    price: 299.0,
    originalPrice: 369.9,
    discount: "19% OFF",
    rating: 4.7,
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
    images: ["shampo-leavin.jpg", "/nutrition-kit-side.png", "/nutrition-kit-overhead.png"],
    tags: ["Novo", "Edição limitada"],
  },
  {
    id: "3",
    slug: "kit-hidratacao-intensa-cera",
    name: "KIT S.O.S + PROGRESSIVA ELISS",
    price: 199.0,
    originalPrice: 269.9,
    discount: "26% OFF",
    rating: 4.3,
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
    images: [
      "soseliss.jpg",
      "/hydration-kit-side.png",
      "/placeholder.svg?height=600&width=600&query=kit hidratação vista de cima",
    ],
    tags: ["Promoção"],
  },
  {
    id: "4",
    slug: "kit-shampoo-e-condicionador",
    name: "KIT ARC-17 + HAIR",
    price: 79.9,
    originalPrice: 139.9,
    discount: "43% OFF",
    rating: 4.8,
    reviewCount: 112,
    stock: 5,
    description: "Kit com shampoo e condicionador para todos os tipos de cabelo.",
    benefits: ["Limpeza suave;", "Hidratação profunda;", "Não contém sulfatos;", "Cabelos mais macios e brilhantes;"],
    howToUse:
      "Aplique o shampoo nos cabelos molhados, massageie e enxágue. Em seguida, aplique o condicionador do meio para as pontas, deixe agir por 3 minutos e enxágue bem.",
    ingredients:
      "Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycerin, Parfum, Panthenol, Hydrolyzed Wheat Protein.",
    images: [
      "archair.jpg",
      "/placeholder.svg?height=600&width=600&query=kit shampoo vista lateral",
      "/placeholder.svg?height=600&width=600&query=kit shampoo vista de cima",
    ],
    tags: ["Mais vendido", "Últimas unidades"],
  },
  {
    id: "5",
    slug: "kit-reconstrucao-capilar",
    name: "KIT ARC-17 COMPLETO",
    price: 249.9,
    originalPrice: 329.9,
    discount: "24% OFF",
    rating: 4.6,
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
    images: [
      "arccompleto.jpg",
      "/placeholder.svg?height=600&width=600&query=kit reconstrução vista lateral",
      "/placeholder.svg?height=600&width=600&query=kit reconstrução vista de cima",
    ],
    tags: ["Recomendado"],
  },
]

// Adicione todos os produtos do carousel
const allProducts = [
  ...productDatabase,
  {
    id: "6",
    slug: "kit-crescimento-acelerado",
    name: "KIT CRESCIMENTO ACELERADO",
    price: 279.9,
    originalPrice: 349.9,
    discount: "20% OFF",
    rating: 4.4,
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
    images: [
      "/produto.jpeg",
      "/placeholder.svg?height=600&width=600&query=kit crescimento vista lateral",
      "/placeholder.svg?height=600&width=600&query=kit crescimento vista de cima",
    ],
    tags: ["Novo"],
  },
  {
    id: "7",
    slug: "kit-antiqueda-completo",
    name: "KIT ANTIQUEDA COMPLETO",
    price: 319.9,
    originalPrice: 399.9,
    discount: "20% OFF",
    rating: 4.9,
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
    images: [
      "/produto.jpeg",
      "/placeholder.svg?height=600&width=600&query=kit antiqueda vista lateral",
      "/placeholder.svg?height=600&width=600&query=kit antiqueda vista de cima",
    ],
    tags: ["Mais vendido"],
  },
  {
    id: "8",
    slug: "kit-brilho-intenso",
    name: "KIT BRILHO INTENSO",
    price: 189.9,
    originalPrice: 249.9,
    discount: "24% OFF",
    rating: 4.7,
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
    images: [
      "/produto.jpeg",
      "/placeholder.svg?height=600&width=600&query=kit brilho vista lateral",
      "/placeholder.svg?height=600&width=600&query=kit brilho vista de cima",
    ],
    tags: ["Promoção"],
  },
  {
    id: "9",
    slug: "mascara-de-reconstrucao",
    name: "SHAMPOO S.O.S",
    price: 69.9,
    originalPrice: 129.9,
    discount: "46% OFF",
    rating: 4.5,
    reviewCount: 127,
    stock: 15,
    description:
      "Nosso shampoo S.O.S é o aliado perfeito para manter seus cabelos lindos e bem cuidados. Com uma fórmula leve e nutritiva, este produto foi especialmente desenvolvido para todos os tipos de cabelo.",
    benefits: [
      "Limpeza profunda;",
      "Controle do frizz;",
      "Proteção térmica;",
      "Definição dos cachos;",
      "Brilho intenso;",
      "Sem parabenos;",
      "Sem sulfatos;",
    ],
    howToUse: "Aplique nos cabelos molhados, massageie e enxágue. Repita se necessário.",
    ingredients:
      "Aqua, Cetearyl Alcohol, Cetrimonium Chloride, Behentrimonium Chloride, Glycerin, Panthenol, Hydrolyzed Keratin, Argania Spinosa Kernel Oil, Butyrospermum Parkii Butter, Cocos Nucifera Oil, Parfum, Citric Acid, Benzyl Alcohol, Potassium Sorbate, Sodium Benzoate.",
    images: [
      "shampoosos.jpg",
      "/placeholder.svg?height=600&width=600&query=shampoo vista lateral",
      "/placeholder.svg?height=600&width=600&query=shampoo vista de cima",
    ],
    tags: ["Mais vendido", "Promoção"],
  },
  {
    id: "10",
    slug: "mascara-de-nutricao",
    name: "ARC-17",
    price: 69.9,
    originalPrice: 129.9,
    discount: "46% OFF",
    rating: 4.7,
    reviewCount: 89,
    stock: 8,
    description:
      "Nossa máscara de nutrição ARC-17 é perfeita para nutrir profundamente os fios. Com uma fórmula rica e potente, este produto foi especialmente desenvolvido para cabelos danificados.",
    benefits: [
      "Nutrição profunda;",
      "Reconstrução dos fios;",
      "Redução de pontas duplas;",
      "Maciez instantânea;",
      "Brilho intenso;",
    ],
    howToUse: "Após lavar os cabelos, aplique a máscara mecha por mecha, deixe agir por 15 minutos e enxágue bem.",
    ingredients:
      "Aqua, Cetearyl Alcohol, Cetrimonium Chloride, Behentrimonium Chloride, Glycerin, Panthenol, Hydrolyzed Keratin, Argania Spinosa Kernel Oil, Butyrospermum Parkii Butter, Cocos Nucifera Oil, Parfum, Citric Acid, Benzyl Alcohol, Potassium Sorbate, Sodium Benzoate.",
    images: [
      "arc17.jpg",
      "/placeholder.svg?height=600&width=600&query=máscara nutrição vista lateral",
      "/placeholder.svg?height=600&width=600&query=máscara nutrição vista de cima",
    ],
    tags: ["Novo", "Edição limitada"],
  },
]

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const router = useRouter()
  const product = allProducts.find((p) => p.slug === slug) || allProducts[0]

  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(0)
  const [activeTab, setActiveTab] = useState("description")
  const [isSticky, setIsSticky] = useState(false)

  const { addItem } = useCart()

  // Detectar quando o usuário rola a página para tornar o botão de compra fixo
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    addItem({ ...product, image: product.images[0] }, quantity)
  }

  const handleBuyNow = () => {
    addItem({ ...product, image: product.images[0] }, quantity)
    router.push("/checkout")
  }

  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4)

  // Calcular o preço parcelado
  const installmentPrice = (product.price / 12).toFixed(2).replace(".", ",")

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-rose-500 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/produtos" className="hover:text-rose-500 transition-colors">
              Produtos
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center text-rose-500 hover:text-rose-600 mb-4 md:hidden">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar
            </Link>

            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={product.images[mainImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
                {product.tags && product.tags.length > 0 && (
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        className={`${
                          tag === "Mais vendido"
                            ? "bg-amber-500"
                            : tag === "Novo"
                              ? "bg-emerald-500"
                              : tag === "Promoção"
                                ? "bg-rose-500"
                                : tag === "Últimas unidades"
                                  ? "bg-red-500"
                                  : "bg-blue-500"
                        } text-white px-2 py-1`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`bg-gray-50 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    mainImage === index ? "border-rose-500 scale-105" : "border-transparent hover:border-rose-300"
                  }`}
                  onClick={() => setMainImage(index)}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Imagem ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center space-x-4 pt-2">
              <button className="text-gray-500 hover:text-rose-500 flex items-center text-sm">
                <Share2 className="w-4 h-4 mr-1" />
                Compartilhar
              </button>
              <button className="text-gray-500 hover:text-rose-500 flex items-center text-sm">
                <Heart className="w-4 h-4 mr-1" />
                Favoritar
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Rating */}
            <div className="flex items-center mb-2">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviewCount} avaliações)
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-rose-500">R$ {product.price.toFixed(2).replace(".", ",")}</span>
              <span className="text-lg text-gray-500 line-through">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </span>
              <span className="bg-rose-100 text-rose-600 text-sm px-2 py-1 rounded-full font-medium">
                {product.discount}
              </span>
            </div>

            <div className="text-sm text-gray-600 mb-6">
              <p>ou 12x de R$ {installmentPrice} sem juros</p>
            </div>

            {/* Stock info */}
            <div className="mb-6">
              {product.stock <= 10 ? (
                <div className="text-amber-600 text-sm font-medium flex items-center">
                  <span className="inline-block w-2 h-2 bg-amber-600 rounded-full mr-2"></span>
                  Apenas {product.stock} unidades em estoque
                </div>
              ) : (
                <div className="text-emerald-600 text-sm font-medium flex items-center">
                  <span className="inline-block w-2 h-2 bg-emerald-600 rounded-full mr-2"></span>
                  Em estoque
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="rounded-l-md rounded-r-none h-12 w-12 border-gray-300"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="h-12 w-16 flex items-center justify-center border-y border-gray-300 font-medium">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className="rounded-r-md rounded-l-none h-12 w-12 border-gray-300"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                <Button
                  variant="outline"
                  className="border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600 h-12"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  ADICIONAR AO CARRINHO
                </Button>
                <Button className="bg-rose-500 hover:bg-rose-600 text-white h-12" onClick={handleBuyNow}>
                  <CreditCard className="w-5 h-5 mr-2" />
                  COMPRAR AGORA
                </Button>
              </div>
            </div>

            {/* Shipping info */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-start">
                <Truck className="w-5 h-5 text-rose-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Entrega rápida para todo o Brasil</h4>
                  <p className="text-sm text-gray-600">
                    Frete grátis para compras acima de R$ 199,00. Receba em até 7 dias úteis.
                  </p>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="description">Descrição</TabsTrigger>
                <TabsTrigger value="benefits">Benefícios</TabsTrigger>
                <TabsTrigger value="usage">Modo de Uso</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="text-gray-700">
                <p className="mb-4">{product.description}</p>
                <h4 className="font-bold mt-4 mb-2">Ingredientes</h4>
                <p className="text-sm">{product.ingredients}</p>
              </TabsContent>
              <TabsContent value="benefits">
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 text-rose-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="usage">
                <p>{product.howToUse}</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Sticky Buy Button (Mobile) */}
        <div
          className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden transition-transform duration-300 z-50 ${
            isSticky ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-rose-500">R$ {product.price.toFixed(2).replace(".", ",")}</div>
              <div className="text-xs text-gray-500">ou 12x de R$ {installmentPrice}</div>
            </div>
            <Button className="bg-rose-500 hover:bg-rose-600 text-white" onClick={handleBuyNow}>
              COMPRAR AGORA
            </Button>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Você também pode gostar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link href={`/produto/${relatedProduct.slug}`} key={relatedProduct.id} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="relative aspect-square">
                    <Image
                      src={relatedProduct.images[0] || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {relatedProduct.tags && relatedProduct.tags.length > 0 && (
                      <div className="absolute top-2 left-2">
                        <Badge
                          className={`${
                            relatedProduct.tags[0] === "Mais vendido"
                              ? "bg-amber-500"
                              : relatedProduct.tags[0] === "Novo"
                                ? "bg-emerald-500"
                                : relatedProduct.tags[0] === "Promoção"
                                  ? "bg-rose-500"
                                  : "bg-blue-500"
                          } text-white text-xs`}
                        >
                          {relatedProduct.tags[0]}
                        </Badge>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          addItem({ ...relatedProduct, image: relatedProduct.images[0] })
                        }}
                        className="bg-rose-500 hover:bg-rose-600 text-white"
                      >
                        Adicionar ao carrinho
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(relatedProduct.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <h3 className="font-bold text-sm mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold text-rose-500">
                        R$ {relatedProduct.price.toFixed(2).replace(".", ",")}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        R$ {relatedProduct.originalPrice.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      ou 12x de R$ {(relatedProduct.price / 12).toFixed(2).replace(".", ",")}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
