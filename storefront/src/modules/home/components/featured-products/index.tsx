import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  // Filter collections with products
  const collectionsWithProducts = collections.filter(
    (collection) => collection.products && collection.products.length > 0
  )

  if (collectionsWithProducts.length === 0) {
    return null
  }

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50">
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23004777' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} 
          />
        </div>

        {/* Section Header */}
        <div className="content-container pt-20 pb-8 text-center relative z-10">
          <h2 className="font-oswald font-bold text-4xl md:text-6xl text-[#004777] uppercase tracking-tight mb-4">
            Featured Collections
          </h2>
          <p className="font-quicksand text-xl text-gray-600 max-w-3xl mx-auto">
            Handpicked products for every player. From championship rackets to essential gear.
          </p>
        </div>

        {/* Collections */}
        <div className="relative z-10">
          {collectionsWithProducts.map((collection, index) => (
            <div key={collection.id}>
              <ProductRail collection={collection} region={region} />
              
              {/* Divider between collections */}
              {index < collectionsWithProducts.length - 1 && (
                <div className="content-container py-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}