import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  id: string
  slug: string
  name: string
  price: number
  originalPrice: number
  discount: string
  image: string
  rating?: number
}

export function ProductCard({ id, slug, name, price, originalPrice, discount, image, rating = 4.5 }: ProductCardProps) {
  return (
    <Link href={`/produto/${slug}`} className="block group">
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src={image || "/produto.jpeg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="flex mb-2">
            {[1, 2, 3, 4].map((star) => (
              <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <svg className="w-5 h-5 text-yellow-400 text-opacity-50" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <h3 className="font-bold text-sm mb-2">{name}</h3>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-rose-500">R$ {price.toFixed(2).replace(".", ",")}</span>
            <span className="text-sm text-gray-500 line-through">R$ {originalPrice.toFixed(2).replace(".", ",")}</span>
            <span className="bg-rose-100 text-rose-600 text-xs px-2 py-1 rounded">{discount}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
