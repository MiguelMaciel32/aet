import Image from "next/image"

export function ProductHighlight() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-medium text-pink-500 mb-6 font-extrabold">   RECONSTRUÇÃO EM OUTRO NÍVEL
</h2>
            <p className="text-gray-700 mb-8">
            O nosso mais novo sucesso capilar, o incrível ARC 17 – Avançado Reconstrutor Capilar com 17 benefícios em uma única fórmula!
            O único no Brasil com essa tecnologia exclusiva. Resultado fora da média, fruto de longas pesquisas para oferecer 
            o que há de mais avançado em tratamento capilar. Um verdadeiro aliado da saúde dos seus fios, pensado para transformar seu cabelo de dentro pra fora!
            </p>

            <h3 className="font-medium text-xl mb-4">Confira os resultados:</h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-pink-500">98%</div>
                <div>Tiverem uma reconstrução na fibra de seus cabelos;</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-pink-500">95%</div>
                <div>Afirmaram uma hidratação magnífica;</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-pink-500">100%</div>
                <div>Relataram fortalecimento absurdo nos fios.</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="relative aspect-square max-w-xs mx-auto group">
              <Image
                src="arccompleto.jpg"
                alt="ACR-17 AVANÇADO RECONTRUTOR CAPILAR"
                fill
                className="object-contain"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-rose-300 hover:bg-rose-400 text-white py-2 px-4 rounded-md transition-colors">
                  Adicionar ao carrinho
                </button>
              </div>
            </div>

            <div className="text-center mt-4">
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg className="w-5 h-5 text-yellow-400 text-opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>

              <h3 className="font-bold mb-2">ACR-17 
                AVANÇADO RECONTRUTOR CAPILAR</h3>

              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-xl font-bold text-rose-500">R$ 189,90</span>
                <span className="text-sm text-gray-500 line-through">R$ 229,90</span>
                <span className="bg-rose-100 text-rose-600 text-xs px-2 py-1 rounded">17% OFF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
