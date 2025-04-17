"use client"

import { useState } from "react"
import Link from "next/link"
import { X, Instagram, Youtube, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MainNav() {
  const [open, setOpen] = useState(false)

  const menuItems = [
    { title: "Início", href: "/" },
    { title: "Kits mais vendidos", href: "/kits" },
    { title: "Todos os produtos", href: "/produtos" },
    { title: "Entrar em contato", href: "/contato" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="p-2" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="12" r="2" fill="currentColor" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <circle cx="20" cy="12" r="2" fill="currentColor" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-md p-0">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="flex-1 px-8 py-8">
            <ul className="space-y-8">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-2xl font-medium hover:text-rose-300 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto p-8 flex justify-center space-x-6">
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <Youtube className="h-6 w-6" />
            </Link>
            <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              <Music className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
