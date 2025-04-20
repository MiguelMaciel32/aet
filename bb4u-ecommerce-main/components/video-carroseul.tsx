"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react"

type Video = {
  id: number
  src: string
  caption: string
}

export default function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [isMobile, setIsMobile] = useState(false)

  const videos: Video[] = [
    {
      id: 1,
      src: "/video.mp4",
      caption: "tá esperando o que pra adicionar BB4U",
    },
    {
      id: 2,
      src: "/video.mp4",
      caption: "tá esperando o que pra adicionar BB4U",
    },
    {
      id: 3,
      src: "/video.mp4",
      caption: "tá esperando o que pra adicionar BB4U",
    },
    {
      id: 4,
      src: "/video.mp4",
      caption: "tá esperando o que pra adicionar BB4U",
    },
    {
      id: 5,
      src: "/video.mp4",
      caption: "tá esperando o que pra adicionar BB4U",
    },
  ]

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1))
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  // Suporte para gestos de deslize (swipe)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current

    // Se o deslize for significativo (mais de 50px)
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        // Deslize para a esquerda -> próximo vídeo
        handleNext()
      } else {
        // Deslize para a direita -> vídeo anterior
        handlePrev()
      }
    }
  }

  // Pause all videos except the current one
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.currentTime = 0
          video.play().catch((e) => console.log("Auto-play prevented:", e))
        } else {
          video.pause()
        }
      }
    })
  }, [currentIndex])

  // Update mute status for all videos
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = isMuted
      }
    })
  }, [isMuted])

  return (
    <div className="w-full mx-auto bg-pink-400 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Layout responsivo com grid para desktop */}
        <div className="md:grid md:grid-cols-12 md:gap-6 md:items-center md:min-h-[500px]">
          {/* Título - Ocupa toda a largura no mobile, apenas 4 colunas no desktop */}
          <div className="md:col-span-4 p-6 md:p-8">
            <h2 className="text-white text-center md:text-left font-bold text-3xl md:text-4xl lg:text-5xl">
              Experiências Reais.
              <br />
              Resultados Incríveis!
            </h2>

            {/* Indicadores de página visíveis apenas no desktop */}
            <div className="hidden md:flex md:flex-col md:gap-3 md:mt-8">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="flex items-center gap-2 text-white text-left opacity-70 hover:opacity-100 transition-opacity"
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex ? "bg-white scale-110" : "bg-white bg-opacity-50"
                    }`}
                  />
                  <span className={`text-sm ${index === currentIndex ? "font-bold" : ""}`}>Vídeo {index + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Carrossel de vídeos - Ocupa toda a largura no mobile, 8 colunas no desktop */}
          <div className="md:col-span-8 px-4 md:px-0 pb-12 md:pb-0">
            <div
              className="relative rounded-xl overflow-hidden mx-auto"
              style={{
                aspectRatio: isMobile ? "9/16" : "16/9",
                maxHeight: isMobile ? "70vh" : "unset",
                maxWidth: isMobile ? "400px" : "unset",
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el
                    }}
                    src={video.src}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    muted={isMuted}
                  />

                  {/* Legenda do vídeo */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                    {video.caption}
                  </div>
                </div>
              ))}

              {/* Botão de som */}
              <button
                onClick={toggleMute}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-pink-300 hover:bg-pink-400 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-2 transition-colors text-sm md:text-base"
              >
                {isMuted ? <VolumeX size={isMobile ? 16 : 18} /> : <Volume2 size={isMobile ? 16 : 18} />}
                <span>Clique para {isMuted ? "ouvir" : "silenciar"}</span>
              </button>
            </div>

            {/* Botões de navegação */}
            <button
              onClick={handlePrev}
              className="absolute left-0 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1 md:p-2 ml-1 text-pink-500 transition-all"
              aria-label="Vídeo anterior"
            >
              <ChevronLeft size={isMobile ? 20 : 24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1 md:p-2 mr-1 text-pink-500 transition-all"
              aria-label="Próximo vídeo"
            >
              <ChevronRight size={isMobile ? 20 : 24} />
            </button>

            {/* Indicadores de página visíveis apenas no mobile */}
            <div className="md:hidden flex justify-center gap-2 mt-4">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex ? "bg-white scale-110" : "bg-white bg-opacity-50 hover:bg-opacity-75"
                  }`}
                  aria-label={`Ir para o slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
