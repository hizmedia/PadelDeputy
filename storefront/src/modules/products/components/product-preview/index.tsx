import { Text } from "@medusajs/ui"
import { Star, CheckCircle } from "lucide-react"
import { IoTennisball } from "react-icons/io5";
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  // Get brand from TYPE field (not metadata)
  const brand = product.type?.value || product.type?.id || (typeof product.type === 'string' ? product.type : undefined)
  const isPopular = product.metadata?.popular === "true" || product.metadata?.popular === true

  // Debug: Log to see if brand and price exists
  console.log("Product:", product.title)
  console.log("Brand from type:", brand)
  console.log("Type object:", product.type)
  console.log("Price data:", cheapestPrice)

  return (
    <LocalizedClientLink 
      href={`/products/${product.handle}`} 
      className="group block h-full"
    >
      <div 
        data-testid="product-wrapper"
        className="relative bg-[#004777] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-visible h-full flex flex-col"
      >
        {/* Header Badges - Aiwas Style */}
        {(brand || isPopular) && (
          <div className="absolute inset-x-0 top-0 z-10">
            <div className="flex h-10 overflow-hidden rounded-t-xl">
              {/* Brand Badge (Left) */}
              {brand && (
                <div
                  className={`flex items-center gap-2 px-4 text-white bg-[#004777] font-oswald uppercase tracking-wide ${
                    isPopular
                      ? "rounded-tr-none rounded-tl-xl flex-1"
                      : "rounded-t-xl w-full justify-start"
                  }`}
                >
                  <span className="text-sm font-bold">{brand}</span>
                </div>
              )}

              {/* Popular Badge (Right) */}
              {isPopular && (
                <div
                  className={`flex items-center gap-2 px-4 text-white bg-[#FF7700] ${
                    brand
                      ? "rounded-tl-none rounded-tr-xl flex-1 justify-end"
                      : "rounded-t-xl w-full justify-start"
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold font-oswald">POPULAR</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Price Tag - Sticking out from right side */}
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 z-20">
          <div className="relative">
            {/* Price Tag Shape */}
            <div className="bg-[#FF7700] text-white px-4 py-3 pr-6 rounded-l-xl shadow-xl flex items-center gap-2 group-hover:shadow-2xl group-hover:pr-7 transition-all duration-300">
              {/* Hole punch effect */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full border border-[#CC5F00]"></div>
              
              {/* Price content */}
              <div className="flex flex-col items-end ml-3">
                {cheapestPrice?.price_type === "sale" && cheapestPrice?.original_price && (
                  <span className="text-xs line-through opacity-75 font-quicksand">
                    {cheapestPrice.original_price}
                  </span>
                )}
                <span className="text-2xl font-bold font-oswald whitespace-nowrap">
                  {cheapestPrice?.calculated_price || "$99.99"}
                </span>
              </div>
            </div>
            
            {/* Triangle notch at the bottom for price tag effect */}
            <div className="absolute -bottom-2 left-0 w-0 h-0 border-l-[16px] border-l-transparent border-t-[8px] border-t-[#CC5F00]"></div>
          </div>
        </div>

        {/* Image Container - Perfect Square */}
        <div className={(brand || isPopular) ? "pt-10" : ""}>
          <div className="relative w-full aspect-square overflow-hidden rounded-t-xl">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="square"
              isFeatured={isFeatured}
              className="!p-0 !shadow-none !rounded-none group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Content Section - Aiwas Style */}
        <div className="p-6 pb-4 flex flex-col grow">
          {/* Title */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white group-hover:text-[#FF7700] transition-colors font-oswald uppercase tracking-wide">
              {product.title}
            </h3>
            {product.variants && product.variants.length > 1 && (
              <div className="text-xs text-white font-quicksand mt-1">
                {product.variants.length} variants available
              </div>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-white text-sm mb-4 leading-relaxed font-quicksand line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Footer Icons - Aiwas Style */}
          <div className="mt-auto pt-4 border-t border-[#00AFB5]/30">
            <div className="flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-[#00AFB5]" />
                  <span className="font-quicksand">In Stock</span>
                </div>
                {product.collection && (
                  <div className="flex items-center gap-1">
                    <span className="font-quicksand text-[#EFD28D]">
                      {product.collection.title}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Tennis Ball Icon */}
              <div className="text-[#EFD28D] group-hover:rotate-45 transition-transform duration-300">
                <IoTennisball className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}