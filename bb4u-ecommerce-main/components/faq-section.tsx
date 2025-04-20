"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    question: "O site é seguro?",
    answer:
      "Sim, nosso site utiliza certificado SSL e todas as transações são criptografadas. Seus dados estão protegidos e não são compartilhados com terceiros.",
  },
  {
    question: "Qual é o prazo de entrega?",
    answer:
      "O prazo de entrega varia de acordo com a sua localização. Após a confirmação do pagamento, o prazo médio é de 3 a 7 dias úteis para capitais e regiões metropolitanas, e 7 a 15 dias úteis para demais localidades.",
  },
  {
    question: "Qual é o valor do frete?",
    answer:
      "O valor do frete é calculado no momento da finalização da compra, de acordo com o CEP informado. Para compras acima de R$ 199,90, o frete é grátis.",
  },
  {
    question: "Como faço para comprar?",
    answer:
      "Escolha os produtos desejados, adicione ao carrinho, informe seu CEP para cálculo do frete, preencha seus dados pessoais e escolha a forma de pagamento. É rápido e fácil!",
  },
  {
    question: "Tem contra-indicação?",
    answer:
      "Nossos produtos são formulados para serem seguros para a maioria das pessoas. No entanto, se você tem alguma alergia conhecida a ingredientes específicos, recomendamos verificar a composição completa na descrição do produto. Em caso de dúvidas, consulte seu dermatologista.",
  },
  {
    question: "Terei resultados em quanto tempo?",
    answer:
      "Os resultados podem variar de pessoa para pessoa. Em geral, os primeiros resultados começam a aparecer após 15 a 30 dias de uso contínuo e conforme as instruções de uso.",
  },
  {
    question: "É vegano?",
    answer:
      "Sim, todos os nossos produtos são veganos, livres de crueldade animal e não contêm ingredientes de origem animal.",
  },
]

export function FaqSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-center mb-8">
          <span className="font-normal">PERGUNTAS </span>
          <span className="font-bold text-pink-500">FREQUENTES</span>
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg overflow-hidden border border-pink-200 mb-4"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-medium hover:no-underline hover:bg-pink-50">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-700">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
