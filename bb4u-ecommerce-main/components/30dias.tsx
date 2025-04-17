"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, CheckCircle, Clock, RefreshCcw, ArrowRight } from "lucide-react"

export function WarrantyBadgeAlt() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  // Simular a visibilidade quando o componente é montado
  useEffect(() => {
    setIsVisible(true)

    // Rotação automática dos passos da garantia
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Garantia Total",
      description: "Experimente sem riscos por 30 dias",
    },
    {
      icon: <RefreshCcw className="w-6 h-6" />,
      title: "Devolução Simples",
      description: "Sem burocracia ou perguntas",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Reembolso 100%",
      description: "Devolução integral do valor pago",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-br from-rose-50 to-white rounded-2xl shadow-xl p-6 max-w-md mx-auto border border-rose-100"
    >
      {/* Elementos decorativos de fundo */}
      <motion.div
        className="absolute -top-10 -right-10 w-40 h-40 bg-rose-100 rounded-full opacity-30"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute -bottom-10 -left-10 w-32 h-32 bg-rose-200 rounded-full opacity-30"
        animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      />

      <div className="relative flex flex-col items-center text-center z-10">
        {/* Badge principal animado */}
        <motion.div
          className="relative mb-6"
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              style={{ width: "140px", height: "140px" }}
            />

            <div className="relative bg-gradient-to-br from-rose-500 to-rose-600 rounded-full p-2 w-36 h-36 flex items-center justify-center">
              <motion.div
                className="bg-white rounded-full w-32 h-32 flex items-center justify-center shadow-inner"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex flex-col items-center">
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-700 text-6xl font-extrabold leading-none"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    30
                  </motion.span>
                  <motion.div
                    className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold mt-1 shadow-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    DIAS DE GARANTIA
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Selos decorativos */}
            <motion.div
              className="absolute -top-2 -right-2 bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, type: "spring" }}
            >
              <Clock className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Título com animação */}
        <motion.h3
          className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-700 text-2xl font-extrabold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          GARANTIA DE SATISFAÇÃO TOTAL
        </motion.h3>

        {/* Texto principal com animação */}
        <motion.p
          className="text-gray-700 text-sm leading-relaxed mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Na Excelência Cosméticos, sua confiança vem em primeiro lugar. Por isso, oferecemos uma{" "}
          <span className="font-semibold text-rose-500">garantia incondicional de 30 dias</span> para você experimentar
          nossos produtos com tranquilidade. Se por qualquer motivo você não estiver 100% satisfeita, devolvemos
          integralmente seu dinheiro.
        </motion.p>

        {/* Passos da garantia com animação */}
        <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-rose-100 mb-4">
          <div className="flex justify-between mb-2">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1 rounded-full flex-1 mx-1 ${index === activeStep ? "bg-rose-500" : "bg-gray-200"}`}
                animate={{
                  backgroundColor: index === activeStep ? "#f43f5e" : "#e5e7eb",
                  scale: index === activeStep ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>

          <motion.div
            className="flex items-start"
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-rose-100 p-2 rounded-full mr-3">
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-rose-500"
              >
                {steps[activeStep].icon}
              </motion.div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{steps[activeStep].title}</h4>
              <p className="text-sm text-gray-600">{steps[activeStep].description}</p>
            </div>
          </motion.div>
        </div>

        {/* Avaliações animadas */}
        <motion.div
          className="flex items-center justify-center mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="text-yellow-400 text-xl mx-0.5"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, delay: i * 0.1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
            >
              ★
            </motion.span>
          ))} */}
          {/* <span className="ml-2 text-sm font-medium text-gray-600">Mais de 10.000 clientes satisfeitos</span> */}
        </motion.div>

        {/* Botão de ação */}
        <motion.button
          className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center group transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Experimente sem riscos
          <motion.span
            className="inline-block ml-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  )
}
