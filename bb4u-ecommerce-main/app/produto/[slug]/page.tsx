"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Truck, CreditCard, ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { products } from "@/components/product-carousel"
import { url } from "inspector"

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // Usar React.use para desembrulhar o objeto params
  const resolvedParams = use(params)
  const { slug } = resolvedParams

  const router = useRouter()

  // Estado para armazenar o produto
  const [product, setProduct] = useState<any>(null)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    // Tentar obter os dados do produto da URL
    if (typeof window !== "undefined") {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const productId = urlParams.get("id")
        const productTitle = urlParams.get("title")
        const productPrice = urlParams.get("price")
        const image = urlParams.get('image')
        const productCheckout = urlParams.get("checkout")

        if (productId && productTitle && productPrice) {
          // Primeiro, tentar encontrar o produto completo pelo ID
          const foundProduct = products.find((p) => p.id === productId)

          if (foundProduct && foundProduct.slug === slug) {
            setProduct(foundProduct)
            return
          }

          // Se não encontrou o produto completo, criar um produto básico com os dados da URL
          const basicProduct = {
            id: productId,
            slug: slug,
            name: productTitle,
            price: Number.parseFloat(productPrice),
            originalPrice: Number.parseFloat(productPrice) * 1.3, // Estimativa do preço original
            discount: "Oferta",
            image: image,
            images: ["/placeholder.svg"],
            rating: 4.5,
            reviewCount: 0,
            stock: 10,
            checkout: productCheckout || "/checkout",
            description: "Detalhes do produto não disponíveis.",
          }

          setProduct(basicProduct)
          return
        }

        // Se não encontrou os parâmetros básicos, tenta encontrar pelo slug
        const foundProduct = products.find((p) => p.slug === slug)
        if (foundProduct) {
          setProduct(foundProduct)
          return
        }

        // Se não encontrou o produto, mostra erro
        setError(true)
      } catch (e) {
        console.error("Erro ao processar a URL:", e)
        setError(true)
      }
    }
  }, [slug])

  const [quantity, setQuantity] = useState(1)
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

  // Esconder o footer
  useEffect(() => {
    // Selecionar o footer e escondê-lo
    const footer = document.querySelector("footer")
    if (footer) {
      footer.style.display = "none"
    }

    // Restaurar o footer quando o componente for desmontado
    return () => {
      if (footer) {
        footer.style.display = ""
      }
    }
  }, [])

  // Se ocorreu um erro, mostrar mensagem de erro
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="mb-8 text-pink-500">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Produto não encontrado</h1>
        <p className="text-gray-600 mb-8">
          Não foi possível carregar as informações deste produto. Por favor, tente novamente.
        </p>
        <Link
          href="/"
          className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-full transition-colors"
        >
          Voltar para a página inicial
        </Link>
      </div>
    )
  }

  // Se o produto ainda não foi carregado, mostrar um indicador de carregamento
  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    )
  }

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

  const handleBuyNow = () => {
    // Redirecionar diretamente para o checkout específico do produto
    if (product.checkout) {
      // Verificar se é uma URL externa
      if (product.checkout.startsWith("http")) {
        window.location.href = product.checkout
      } else {
        router.push(product.checkout)
      }
    } else {
      router.push("/checkout")
    }
  }

  // Calcular o preço parcelado
  const installmentPrice = (product.price / 12).toFixed(2).replace(".", ",")

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-pink-500 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/produtos" className="hover:text-pink-500 transition-colors">
              Produtos
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image - Apenas uma imagem */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center text-pink-500 hover:text-pink-600 mb-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar para Home
            </Link>

            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={
                    `/` + (product.image || 
                    (product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg"))
                  }
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
                {product.tags && product.tags.length > 0 && (
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.tags.map((tag: any, index: any) => (
                      <Badge
                        key={index}
                        className={`${
                          tag === "Mais vendido"
                            ? "bg-amber-500"
                            : tag === "Novo"
                              ? "bg-emerald-500"
                              : tag === "Promoção"
                                ? "bg-pink-500"
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
                      i < Math.floor(product.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating || 0} ({product.reviewCount || 0} avaliações)
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-pink-500">R$ {product.price.toFixed(2).replace(".", ",")}</span>
              <span className="text-lg text-gray-500 line-through">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </span>
              <span className="bg-pink-100 text-pink-600 text-sm px-2 py-1 rounded-full font-medium">
                {product.discount}
              </span>
            </div>

            <div className="text-sm text-gray-600 mb-6">
              <p>ou 12x de R$ {installmentPrice} sem juros</p>
            </div>

            {/* Stock info */}
            <div className="mb-6">
              {(product.stock || 0) <= 10 ? (
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
                  disabled={quantity >= (product.stock || 1)}
                  className="rounded-r-md rounded-l-none h-12 w-12 border-gray-300"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="w-full">
                <Button
                  className="bg-pink-500 hover:bg-pink-600 text-white h-12 w-full text-base font-bold"
                  onClick={handleBuyNow}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  COMPRAR AGORA
                </Button>
              </div>
            </div>

            {/* Shipping info */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-start">
                <Truck className="w-5 h-5 text-pink-500 mt-1 mr-3 flex-shrink-0" />
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
                <p className="mb-4">{product.description || "Sem descrição disponível."}</p>
                {product.ingredients && (
                  <>
                    <h4 className="font-bold mt-4 mb-2">Ingredientes</h4>
                    <p className="text-sm">{product.ingredients}</p>
                  </>
                )}
              </TabsContent>
              <TabsContent value="benefits">
                {product.benefits && product.benefits.length > 0 ? (
                  <ul className="space-y-2">
                    {product.benefits.map((benefit: any, index: any) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 mt-1 text-pink-500">
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
                ) : (
                  <p>Sem benefícios listados para este produto.</p>
                )}
              </TabsContent>
              <TabsContent value="usage">
                <p>{product.howToUse || "Instruções de uso não disponíveis."}</p>
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
              <div className="text-lg font-bold text-pink-500">R$ {product.price.toFixed(2).replace(".", ",")}</div>
              <div className="text-xs text-gray-500">ou 12x de R$ {installmentPrice}</div>
            </div>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white" onClick={handleBuyNow}>
              COMPRAR AGORA
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
