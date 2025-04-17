"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Check if the popup has been shown before
    const hasShownPopup = localStorage.getItem("bb4u_popup_shown")

    if (!hasShownPopup) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Submitted:", { email, phone })
    setSubmitted(true)

    // Close popup after 2 seconds
    setTimeout(() => {
      closePopup()
    }, 2000)
  }

  const closePopup = () => {
    setIsOpen(false)
    // Save to localStorage to prevent showing again in this session
    localStorage.setItem("bb4u_popup_shown", "true")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="p-6">
          {!submitted ? (
            <>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-rose-400 mb-2">Ganhe 10% de desconto!</h3>
                <p className="text-gray-600">
                  Cadastre-se para receber novidades e um cupom de 10% de desconto na sua primeira compra.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">WhatsApp</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-rose-400 hover:bg-rose-500">
                  Quero meu desconto!
                </Button>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Ao se cadastrar, você concorda com nossa política de privacidade.
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="mb-4 text-rose-500">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Obrigado!</h3>
              <p>Seu cupom de desconto foi enviado para seu e-mail.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
