import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Youtube } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Efeito de luz melhorado com degradê */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-80"></div>
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-pink-500/10 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-1/2 h-24 bg-pink-500/5 blur-xl rounded-full"></div>
      <div className="absolute top-0 left-1/3 w-1/3 h-12 bg-pink-400/10 blur-lg"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3">
                <Image width={60} height={60} src="/logo.png" alt="Logo" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">EXCELÊNCIA COSMÉTICOS</h3>
                <p className="text-sm text-gray-400">Beleza e cuidado para você</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Produtos de beleza desenvolvidos com tecnologia avançada para cuidar dos seus cabelos, pele e unhas.
            </p>
            <p className="text-gray-400 text-sm">CNPJ: 17.831.888/0001-07</p>
          </div>

          {/* Column 2 - Support and Social (anteriormente era Column 3) */}
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4">Suporte:</h3>
              <p className="text-gray-300 flex items-center mb-3">
                <span className="mr-2">📞</span> (11) 99999-9999
              </p>
              <Link
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full inline-block text-center transition-colors"
              >
                WhatsApp
              </Link>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Nossas redes:</h3>
              <div className="flex space-x-4">
                <Link
                  href="https://www.instagram.com/excelencia.cosmeticos/"
                  className="bg-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <Instagram className="h-5 w-5 text-black" />
                </Link>
                <Link
                  href="#"
                  className="bg-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <Facebook className="h-5 w-5 text-black" />
                </Link>
                <Link
                  href="#"
                  className="bg-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <Youtube className="h-5 w-5 text-black" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} EXCELÊNCIA COSMÉTICOS. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
