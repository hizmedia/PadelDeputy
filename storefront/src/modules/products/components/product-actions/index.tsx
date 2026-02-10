"use client"

import { Button } from "@medusajs/ui"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { IoTennisball } from "react-icons/io5"
import { ShoppingCart, Check } from "lucide-react"

import { useIntersection } from "@lib/hooks/use-in-view"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"

import MobileActions from "./mobile-actions"
import ProductPrice from "../product-price"
import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (variantOptions: any) => {
  return variantOptions?.reduce(
    (acc: Record<string, string | undefined>, varopt: any) => {
      if (
        varopt.option &&
        varopt.value !== null &&
        varopt.value !== undefined
      ) {
        acc[varopt.option.title] = varopt.value
      }
      return acc
    },
    {}
  )
}

export default function ProductActions({
  product,
  region,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (title: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [title]: value,
    }))
  }

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })

    setIsAdding(false)
    setJustAdded(true)

    // Reset "just added" state after 2 seconds
    setTimeout(() => {
      setJustAdded(false)
    }, 2000)
  }

  // ... keep all the imports and logic the same ...

  return (
    <>
      <div
        className="flex flex-col gap-y-6 bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
        ref={actionsRef}
      >
        {/* Options Section */}
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-6">
              <div className="flex items-center gap-2 pb-2">
                <IoTennisball className="w-5 h-5 text-[#EFD28D]" />
                <span className="text-sm font-oswald uppercase tracking-wider text-[#004777] font-bold">
                  Customize Your Selection
                </span>
              </div>
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.title ?? ""]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider className="border-[#00AFB5]/30" />
            </div>
          )}
        </div>

        {/* Price Section - NO WRAPPER DIV */}
        <ProductPrice product={product} variant={selectedVariant} />

        {/* Rest remains the same... */}
        {/* Stock Status */}
        {selectedVariant && (
          <div className="flex items-center gap-2 text-sm">
            {inStock ? (
              <>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-green-600 font-quicksand font-semibold">
                  In Stock & Ready to Ship
                </span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-red-600 font-quicksand font-semibold">
                  Out of Stock
                </span>
              </>
            )}
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock || !selectedVariant || !!disabled || isAdding}
          className={`
            relative w-full h-14 rounded-xl font-oswald font-bold uppercase tracking-wide text-base
            transition-all duration-300 shadow-lg overflow-hidden
            ${
              !inStock || !selectedVariant || !!disabled || isAdding
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : justAdded
                ? "bg-green-500 text-white"
                : "bg-[#FF7700] hover:bg-[#FF7700]/90 text-white hover:shadow-2xl hover:scale-105"
            }
          `}
          data-testid="add-product-button"
        >
          {/* Background Animation */}
          {!disabled &&
            !isAdding &&
            inStock &&
            selectedVariant &&
            !justAdded && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            )}

          {/* Button Content */}
          <span className="relative flex items-center justify-center gap-3">
            {isAdding ? (
              <>
                <IoTennisball className="w-5 h-5 animate-spin" />
                <span>Adding to Cart...</span>
              </>
            ) : justAdded ? (
              <>
                <Check className="w-5 h-5" />
                <span>Added to Cart!</span>
              </>
            ) : !selectedVariant ? (
              <>
                <IoTennisball className="w-5 h-5" />
                <span>Select a Variant</span>
              </>
            ) : !inStock ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </>
            )}
          </span>
        </button>

        {/* Additional Info */}
        <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-600 font-quicksand">
            <Check className="w-4 h-4 text-[#00AFB5]" />
            <span>Free shipping on orders over $100</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 font-quicksand">
            <Check className="w-4 h-4 text-[#00AFB5]" />
            <span>30-day hassle-free returns</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 font-quicksand">
            <Check className="w-4 h-4 text-[#00AFB5]" />
            <span>Expert customer support</span>
          </div>
        </div>
      </div>

      {/* Mobile Actions */}
      <MobileActions
        product={product}
        variant={selectedVariant}
        options={options}
        updateOptions={setOptionValue}
        inStock={inStock}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
        show={!inView}
        optionsDisabled={!!disabled || isAdding}
      />
    </>
  )
}
