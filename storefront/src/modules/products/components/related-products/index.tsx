import Product from "../product-preview"
import { getRegion } from "@lib/data/regions"
import { getProductsList } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { IoTennisball } from "react-icons/io5"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

type StoreProductParamsWithTags = HttpTypes.StoreProductParams & {
  tags?: string[]
  collection_id?: string[]
  is_giftcard?: boolean
}

type StoreProductWithTags = HttpTypes.StoreProduct & {
  tags?: { value: string }[]
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // edit this function to define your related products logic
  const queryParams: StoreProductParamsWithTags = {}
  if (region?.id) {
    queryParams.region_id = region.id
  }
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }
  const productWithTags = product as StoreProductWithTags
  if (productWithTags.tags) {
    queryParams.tags = productWithTags.tags
      .map((t) => t.value)
      .filter(Boolean) as string[]
  }
  queryParams.is_giftcard = false

  const products = await getProductsList({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!products.length) {
    return null
  }

  return (
    <div className="product-page-constraint py-16 bg-gradient-to-b from-white to-gray-50">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-[#FF7700]"></div>
          <IoTennisball className="w-8 h-8 text-[#EFD28D] animate-bounce" />
          <div className="h-px w-12 bg-[#FF7700]"></div>
        </div>
        
        <span className="text-sm font-oswald uppercase tracking-widest text-[#00AFB5] font-bold mb-3">
          You Might Also Like
        </span>
        
        <h2 className="text-3xl md:text-4xl font-oswald font-bold text-[#004777] uppercase tracking-wide max-w-2xl mb-3">
          Related Products
        </h2>
        
        <p className="text-base font-quicksand text-gray-600 max-w-lg leading-relaxed">
          Complete your setup with these hand-picked items that pair perfectly with your selection.
        </p>
      </div>

      {/* Products Grid */}
      <ul className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-3 large:grid-cols-4 gap-6">
        {products.map((product) => (
          <li key={product.id} className="transform transition-all duration-300 hover:scale-105">
            {region && <Product region={region} product={product} />}
          </li>
        ))}
      </ul>

      {/* Bottom Decorative Element */}
      <div className="flex items-center justify-center gap-2 mt-12">
        <div className="w-2 h-2 rounded-full bg-[#004777]"></div>
        <div className="w-2 h-2 rounded-full bg-[#FF7700]"></div>
        <div className="w-2 h-2 rounded-full bg-[#00AFB5]"></div>
        <div className="w-2 h-2 rounded-full bg-[#EFD28D]"></div>
      </div>
    </div>
  )
}