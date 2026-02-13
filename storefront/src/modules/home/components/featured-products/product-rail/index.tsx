import { HttpTypes } from "@medusajs/types"
import { ArrowRight } from "lucide-react"
import { IoTennisball } from "react-icons/io5"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

export default function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const { products } = collection

  if (!products || products.length === 0) {
    return null
  }

  // Determine collection color theme based on title hash
  const getCollectionTheme = (title: string) => {
    const themes = [
      { 
        primary: "#FF7700", 
        gradient: "from-[#FF7700] to-[#FF9933]",
        bg: "from-orange-50 to-orange-100/50",
        text: "text-[#FF7700]",
        border: "border-[#FF7700]"
      },
      { 
        primary: "#00AFB5", 
        gradient: "from-[#00AFB5] to-[#00D4DD]",
        bg: "from-cyan-50 to-cyan-100/50",
        text: "text-[#00AFB5]",
        border: "border-[#00AFB5]"
      },
      { 
        primary: "#004777", 
        gradient: "from-[#004777] to-[#0066AA]",
        bg: "from-blue-50 to-blue-100/50",
        text: "text-[#004777]",
        border: "border-[#004777]"
      }
    ]
    
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return themes[hash % themes.length]
  }

  const theme = getCollectionTheme(collection.title || '')
  const collectionDescription = collection.metadata?.description 
    ? String(collection.metadata.description) 
    : null

  return (
    <div className="content-container py-16 md:py-24">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
          {/* Left Side - Title & Description */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 mb-3">
              <IoTennisball className={`w-5 h-5 ${theme.text}`} />
              <span className="font-oswald text-sm uppercase tracking-wider font-semibold text-gray-500">
                Featured Collection
              </span>
            </div>
            
            <h2 className={`font-oswald font-bold text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-3 ${theme.text}`}>
              {collection.title}
            </h2>
            
            {collectionDescription && (
              <p className="font-quicksand text-lg text-gray-600 max-w-2xl">
                {collectionDescription}
              </p>
            )}
          </div>

          {/* Right Side - View All Link */}
          <div className="flex-shrink-0">
            <LocalizedClientLink 
              href={`/collections/${collection.handle}`}
              className={`group inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-xl border-2 ${theme.border} transition-all duration-300 hover:scale-105`}
            >
              <span className={`font-oswald font-semibold uppercase tracking-wider text-sm ${theme.text}`}>
                View All
              </span>
              <ArrowRight 
                className={`w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ${theme.text}`}
                strokeWidth={2.5}
              />
            </LocalizedClientLink>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="relative h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className={`absolute top-0 left-0 h-full w-24 bg-gradient-to-r ${theme.gradient} rounded-full`} />
        </div>
      </div>

      {/* Products Grid */}
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {products.slice(0, 8).map((product) => (
          <li key={product.id} className="group">
            <div className="relative">
              {/* Product Card Wrapper with Animations */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                {/* @ts-ignore */}
                <ProductPreview product={product} region={region} isFeatured />
                
                {/* Bottom Accent Bar */}
                <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r ${theme.gradient}`} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Show More Products Button */}
      {products.length > 8 && (
        <div className="mt-12 text-center">
          <LocalizedClientLink 
            href={`/collections/${collection.handle}`}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-br ${theme.bg} border-2 ${theme.border} hover:shadow-lg transition-all duration-300 hover:scale-105`}
          >
            <span className={`font-oswald font-bold uppercase tracking-wider ${theme.text}`}>
              View {products.length - 8} More Products
            </span>
            <ArrowRight 
              className={`w-5 h-5 ${theme.text}`}
              strokeWidth={2.5}
            />
          </LocalizedClientLink>
        </div>
      )}
    </div>
  )
}