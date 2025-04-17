"use client"

import { PhoneIcon as WhatsApp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface SupportContactProps {
  whatsappNumber?: string
  className?: string
}

export function SupportContactPink({ whatsappNumber = "5511999999999", className = "" }: SupportContactProps) {
  const whatsappLink = `https://wa.me/${whatsappNumber}`
  const [stars, setStars] = useState<Array<{ id: number; left: string; size: string; duration: string }>>([])

  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 1 + 0.5}rem`,
      duration: `${Math.random() * 3 + 2}s`,
    }))
    setStars(newStars)
  }, [])

  return (
    <div className={`max-w-3xl mx-auto rounded-2xl overflow-hidden relative ${className}`}>
      {/* Falling stars animation */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute text-white opacity-70 animate-fall"
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

      <div className="bg-rose-500 p-8 text-white relative z-10">
        <h2 className="text-3xl font-bold mb-4">Dúvidas? Fale com o suporte</h2>

        <p className="text-lg mb-8">
          Ainda tem alguma dúvida? Entre em contato com a nossa equipe no WhatsApp pelo botão abaixo!
        </p>

        <Link
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-white hover:bg-rose-100 text-rose-500 font-medium py-4 px-6 rounded-full text-lg transition-all duration-300 w-full max-w-md mx-auto"
        >
          <WhatsApp className="h-6 w-6" />
          Falar com o suporte
        </Link>
      </div>
    </div>
  )
}
