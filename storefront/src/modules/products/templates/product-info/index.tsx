import { HttpTypes } from "@medusajs/types"
import { Heading, Text, Badge } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  // Get brand from TYPE field
  const brand = product.type?.value || product.type?.id || (typeof product.type === 'string' ? product.type : undefined)

  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {/* Brand Badge - Top */}
        {brand && (
          <div className="flex items-center gap-2">
            <Badge 
              size="large" 
              className="bg-[#004777] text-white font-oswald uppercase tracking-wider px-4 py-2 rounded-lg"
            >
              {brand}
            </Badge>
          </div>
        )}

        {/* Collection Link */}
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-sm font-quicksand text-[#00AFB5] hover:text-[#FF7700] transition-colors uppercase tracking-wide font-semibold"
          >
            {product.collection.title} →
          </LocalizedClientLink>
        )}

        {/* Product Title */}
        <Heading
          level="h2"
          className="text-4xl lg:text-5xl leading-tight text-[#004777] font-oswald font-bold uppercase tracking-wide"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        {/* Decorative Divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="h-1 w-16 bg-[#FF7700] rounded-full"></div>
          <div className="h-1 w-8 bg-[#00AFB5] rounded-full"></div>
          <div className="h-1 w-4 bg-[#EFD28D] rounded-full"></div>
        </div>

        {/* Product Description */}
        <Text
          className="text-base lg:text-lg text-gray-700 leading-relaxed font-quicksand whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </Text>

        {/* Product Meta Info */}
        <div className="flex flex-wrap gap-3 pt-2">
          {product.variants && product.variants.length > 1 && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm font-quicksand text-gray-700">
              <span className="w-2 h-2 bg-[#00AFB5] rounded-full"></span>
              {product.variants.length} Variants Available
            </div>
          )}
          {product.weight && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm font-quicksand text-gray-700">
              <span className="w-2 h-2 bg-[#FF7700] rounded-full"></span>
              Weight: {product.weight}g
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductInfo