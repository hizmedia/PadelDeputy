"use client"

import { useState } from "react"
import { IoTennisball } from "react-icons/io5"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type Brand = {
  id: string
  name: string
  slug: string
}

export default function CategoryWithBrands({ 
  category,
  brands 
}: { 
  category: HttpTypes.StoreProductCategory
  brands: Brand[]
}) {
  const [isOpen, setIsOpen] = useState(false)

  // Safety check for category handle
  if (!category?.handle) {
    return (
      <span className="text-sm font-oswald font-medium text-[#004777] uppercase">
        {category?.name || 'Category'}
      </span>
    )
  }

  const hasBrands = brands && brands.length > 0

  return (
    <div
      className="relative"
      onMouseEnter={() => hasBrands && setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Category Link */}
      <LocalizedClientLink
        href={`/categories/${category.handle}`}
        className="text-sm font-oswald font-medium text-[#004777] hover:text-[#FF7700] transition-colors whitespace-nowrap uppercase"
        data-testid="nav-category-link"
      >
        {category.name}
      </LocalizedClientLink>

      {/* Brands Dropdown - only show if there are brands in this category */}
      {hasBrands && (
        <div
          className={`
            absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[400px] z-50
            transition-all duration-300 ease-out
            ${
              isOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }
          `}
        >
          <div className="bg-[#004777] rounded-xl shadow-2xl border-2 border-[#00AFB5] overflow-hidden">
            {/* Header */}
            <div className="bg-[#004777] border-b-2 border-[#00AFB5] px-4 py-3">
              <div className="flex items-center gap-2">
                <IoTennisball className="w-5 h-5 text-[#EFD28D]" />
                <h3 className="text-sm font-oswald font-bold text-white uppercase">
                  Brands in {category.name}
                </h3>
              </div>
            </div>

            {/* Brands List */}
            <div className="grid grid-cols-2 gap-2 p-3 max-h-[300px] overflow-y-auto">
              {brands.map((brand) => (
                <LocalizedClientLink
                  key={brand.id}
                  href={`/categories/${category.handle}?type=${encodeURIComponent(brand.name)}`}
                  className="
                    group flex items-center gap-2 px-3 py-2 rounded-lg
                    bg-[#004777] hover:bg-[#FF7700]
                    border border-[#00AFB5]/30 hover:border-[#00AFB5]
                    transition-all duration-200
                  "
                >
                  <IoTennisball className="w-3 h-3 text-[#EFD28D] group-hover:rotate-45 transition-transform duration-300" />
                  <span className="text-white font-quicksand text-xs font-medium">
                    {brand.name}
                  </span>
                </LocalizedClientLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
