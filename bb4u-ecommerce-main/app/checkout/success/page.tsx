import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold mb-4">Pedido realizado com sucesso!</h1>

        <p className="mb-6 text-gray-600">
          Obrigado pela sua compra. Você receberá um e-mail com os detalhes do seu pedido em breve.
        </p>

        <div className="space-y-4">
          <Link href="/">
            <Button className="bg-rose-400 hover:bg-rose-500">Continuar comprando</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
