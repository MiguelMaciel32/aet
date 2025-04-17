import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function ProductPromo() {
  return (
    <div className="max-w-md mx-auto overflow-hidden rounded-lg shadow-md">
      {/* Imagem principal */}
      <div className="w-full">
        <Image
          src="mulherarc.jpg"
          alt="Pessoa segurando produto BigBoom"
          width={600}
          height={400}
          className="w-full object-cover"
        />
      </div>

      {/* Conteúdo de texto com fundo rosa claro */}
      <div className="bg-[#FFF5F5] p-6 pb-8">
        {/* Título com badge */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 w-14 h-14 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl border-[3px] border-white shadow-md relative">
            <span className="absolute inset-0 rounded-full border-[3px] border-pink-300"></span>
            <span className="z-10">#1</span>
          </div>
          <h1 className="text-4xl font-bold text-pink-500 leading-tight">
            A Primeira
            <br />
            Resconstrução Capilar <br />
            17 em 1 do
            <br />
            Brasil!
          </h1>
        </div>

        {/* Subtexto */}
        <p className="text-pink-400 text-lg mb-6">
        Você está prestes a descobrir o segredo que vai transformar completamente seus cabelos.
O ARC 17 é o primeiro reconstrutor capilar em seringa do Brasil, desenvolvido com tecnologia alemã de ponta e 17 benefícios reais em uma fórmula exclusiva.        </p>

        {/* Botão de call-to-action */}
        <div className="flex justify-center">
          <button className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-10 rounded-full transition-colors flex items-center gap-2">
            SAIBA MAIS
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      Ícone do WhatsApp
      {/* <div className="absolute bottom-4 right-4">
        <div className="bg-green-500 text-white p-3 rounded-full shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </div>
      </div> */}
    </div>
  )
}
