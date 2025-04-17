"use client"

import { PhoneIcon as WhatsApp, Mail, Clock } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface EnhancedSupportContactProps {
  whatsappNumber?: string
  email?: string
  className?: string
}

export function EnhancedSupportContact({
  whatsappNumber = "5511999999999",
  email = "suporte@seusite.com.br",
  className = "",
}: EnhancedSupportContactProps) {
  const whatsappLink = `https://wa.me/${whatsappNumber}`
  const [stars, setStars] = useState<Array<{ id: number; left: string; size: string; duration: string }>>([])

  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 1 + 0.5}rem`,
      duration: `${Math.random() * 5 + 3}s`,
    }))
    setStars(newStars)
  }, [])

  return (
    <div className={`max-w-3xl mx-auto rounded-2xl overflow-hidden relative shadow-lg ${className}`}>
      {/* Falling stars animation */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute text-rose-300 opacity-70 animate-fall"
            style={{
              left: star.left,
              fontSize: star.size,
              animationDuration: star.duration,
              top: "-20px",
            }}
          >
            ★
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-rose-400 to-rose-600 p-8 text-white relative z-10">
        <h2 className="text-3xl font-bold mb-4">Dúvidas? Fale com o suporte</h2>

        <p className="text-lg mb-6">
          Ainda tem alguma dúvida? Entre em contato com a nossa equipe no WhatsApp pelo botão abaixo!
        </p>

        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span>Horário de atendimento: Segunda a Sexta, 9h às 18h</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white hover:bg-rose-100 text-rose-500 font-medium py-3 px-6 rounded-full text-lg transition-all duration-300 flex-1"
          >
            <WhatsApp className="h-5 w-5" />
            WhatsApp
          </Link>

          <Link
            href={`mailto:${email}`}
            className="flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-medium py-3 px-6 rounded-full text-lg transition-all duration-300 flex-1"
          >
            <Mail className="h-5 w-5" />
            Email
          </Link>
        </div>
      </div>
    </div>
  )
}
