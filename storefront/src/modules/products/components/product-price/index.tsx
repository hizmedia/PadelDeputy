import { clx } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse rounded-lg" />
  }

  return (
    <div className="flex flex-col font-quicksand">
      <div className="flex items-baseline gap-2">
        {!variant && (
          <span className="text-sm text-[#00AFB5] font-medium font-oswald uppercase tracking-wide">From</span>
        )}
        <span
          className={clx("text-3xl md:text-4xl font-bold font-oswald", {
            "text-[#004777]": selectedPrice.price_type !== "sale",
            "text-[#FF7700]": selectedPrice.price_type === "sale",
          })}
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </div>
      {selectedPrice.price_type === "sale" && (
        <div className="flex items-center gap-3 mt-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Original:</span>
            <span
              className="line-through text-sm text-gray-400"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
          </div>
          <span className="inline-flex items-center px-2.5 py-1 bg-[#FF7700] text-white text-xs font-bold rounded-full font-oswald uppercase">
            -{selectedPrice.percentage_diff}% OFF
          </span>
        </div>
      )}
    </div>
  )
}