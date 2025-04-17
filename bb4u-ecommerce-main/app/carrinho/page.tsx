"use client"

import Image from "next/image"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleCheckout = () => {
    setIsSubmitting(true)

    // Simulate a checkout process
    setTimeout(() => {
      clearCart()
      router.push("/checkout/success")
      setIsSubmitting(false)
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Carrinho</h1>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border">
          <p className="mb-6">Seu carrinho está vazio.</p>
          <Link href="/">
            <Button className="bg-rose-400 hover:bg-rose-500">Continuar comprando</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Carrinho</h1>

      <div className="flex items-center justify-center mb-6">
        <div className="w-full max-w-3xl mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-rose-400 w-1/3"></div>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-green-600">Você está elegível para frete grátis.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="hidden sm:grid sm:grid-cols-12 bg-gray-50 p-4 text-sm font-medium">
              <div className="col-span-6">Produto</div>
              <div className="col-span-2 text-center">Quantidade</div>
              <div className="col-span-2 text-right">Preço</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="p-4 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center">
                  <div className="sm:col-span-6 flex items-center">
                    <div className="w-16 h-16 relative mr-4 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/produto/${item.slug}`}
                        className="font-medium hover:text-rose-500 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <div className="flex sm:hidden items-center justify-between mt-2">
                        <span className="text-gray-500">R$ {item.price.toFixed(2).replace(".", ",")}</span>
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-rose-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2 mt-4 sm:mt-0 flex items-center justify-center">
                    <div className="flex items-center border rounded-md">
                      <button
                        className="px-2 py-1 hover:bg-gray-100"
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-x">{item.quantity || 1}</span>
                      <button
                        className="px-2 py-1 hover:bg-gray-100"
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-2 mt-2 sm:mt-0 hidden sm:block text-right">
                    R$ {item.price.toFixed(2).replace(".", ",")}
                  </div>

                  <div className="sm:col-span-2 mt-2 sm:mt-0 flex justify-between items-center">
                    <span className="sm:hidden">Subtotal:</span>
                    <span className="text-right font-medium flex-grow">
                      R$ {((item.quantity || 1) * item.price).toFixed(2).replace(".", ",")}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 hidden sm:block text-gray-400 hover:text-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-bold mb-4">Resumo do pedido</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span className="text-green-600">Grátis</span>
              </div>
            </div>

            <div className="my-4 border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>R$ {subtotal.toFixed(2).replace(".", ",")} BRL</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full py-6 bg-rose-400 hover:bg-rose-500 text-white"
            >
              {isSubmitting ? "Processando..." : "Finalizar Compra"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
