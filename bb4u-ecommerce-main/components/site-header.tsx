"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function SiteHeader() {
  const { itemCount } = useCart()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [isScrolledPast, setIsScrolledPast] = useState(false)

  // Detectar scroll para adicionar sombra e opacidade quando a página é rolada
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      const isScrolledPast = window.scrollY > 10 // Same threshold as the banner

      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }

      setIsScrolledPast(isScrolledPast)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <header
      className={`fixed left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/70 backdrop-blur-md shadow-md" : "bg-white/50 backdrop-blur-sm"
      } ${isScrolledPast ? "top-0" : "top-6"}`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <MainNav />
        <Link href={"/"} className="absolute left-1/2 transform -translate-x-1/2 p-2">
          <Image src="/logo.png" alt="Logo" width={10} height={40} className="h-24 w-auto" />
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="p-2 relative hover:bg-white/20"
          aria-label="Cart"
          onClick={() => router.push("/carrinho")}
        >
          <ShoppingBag className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  )
}
