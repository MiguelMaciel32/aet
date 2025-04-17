import Link from "next/link"
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-pink-500">EXCELÊNCIA COSMÉTICOS</h3>
            <p className="text-gray-300 mb-4">
              Produtos de beleza desenvolvidos com tecnologia avançada para cuidar dos seus cabelos, pele e unhas.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-rose-300">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-rose-300">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-rose-300">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-rose-300">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-rose-300">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="text-gray-300 hover:text-rose-300">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/kits" className="text-gray-300 hover:text-rose-300">
                  Kits
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-rose-300">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-rose-300">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Help */}
          <div>
            <h3 className="text-lg font-bold mb-4">Ajuda</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-rose-300">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/envio" className="text-gray-300 hover:text-rose-300">
                  Política de Envio
                </Link>
              </li>
              <li>
                <Link href="/devolucao" className="text-gray-300 hover:text-rose-300">
                  Política de Devolução
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-gray-300 hover:text-rose-300">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-gray-300 hover:text-rose-300">
                  Termos e Condições
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <strong>Email:</strong> contato@excelenciacosmeticos.com.br
              </li>
              <li className="text-gray-300">
                <strong>WhatsApp:</strong> (11) 99999-9999
              </li>
              <li className="text-gray-300">
                <strong>Horário:</strong> Seg-Sex, 9h às 18h
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} EXCELÊNCIA COSMÉTICOS. Todos os direitos reservados.</p>
          <p className="mt-2">CNPJ: 17.831.888/0001-07 </p>
        </div>
      </div>
    </footer>
  )
}
