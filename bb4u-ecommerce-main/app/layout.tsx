import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartProvider } from "@/context/cart-context"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { AnnouncementBanner } from "@/components/anuncio"


const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <AnnouncementBanner />
            <div className="flex flex-col min-h-screen pt-8">
              <SiteHeader />
              <main className="flex-1 mt-24">{children}</main>
              <SiteFooter />
            </div>
            <WhatsAppButton />
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  )
}
