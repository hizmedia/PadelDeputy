import { HttpTypes } from "@medusajs/types"
import { Heading, Text, Badge } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  // Get brand from subcategories (child categories)
  const getBrand = () => {
    if (!product.categories || product.categories.length === 0) return null
    
    // Find a category that has a parent (meaning it's a subcategory/brand)
    const subcategory = product.categories.find(cat => cat.parent_category_id)
    
    return subcategory?.name
  }

  const brand = getBrand()

  // Get the main/parent category
  const getMainCategory = () => {
    if (!product.categories || product.categories.length === 0) return null
    
    // Find a category that doesn't have a parent (top-level category)
    const mainCategory = product.categories.find(cat => !cat.parent_category_id)
    
    return mainCategory
  }

  const mainCategory = getMainCategory()

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

        {/* Main Category Link */}
        {mainCategory && (
          <LocalizedClientLink
            href={`/categories/${mainCategory.handle}`}
            className="text-sm font-quicksand text-[#00AFB5] hover:text-[#FF7700] transition-colors uppercase tracking-wide font-semibold"
          >
            {mainCategory.name} →
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
          {/* Show all categories as clickable badges */}
          {product.categories && product.categories.length > 0 && (
            <>
              {product.categories.map((category) => (
                <LocalizedClientLink
                  key={category.id}
                  href={`/categories/${category.handle}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00AFB5]/10 hover:bg-[#00AFB5]/20 rounded-full text-sm font-quicksand text-[#004777] hover:text-[#FF7700] transition-colors"
                >
                  <span className="w-2 h-2 bg-[#00AFB5] rounded-full"></span>
                  {category.name}
                </LocalizedClientLink>
              ))}
            </>
          )}
          
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