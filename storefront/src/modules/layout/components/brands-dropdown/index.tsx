"use client"

import { useState } from "react"
import { IoTennisball } from "react-icons/io5"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Brand = {
  id: string
  name: string
  slug: string
}

export default function BrandsDropdown({ brands }: { brands: Brand[] }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!brands || brands.length === 0) {
    return null
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger */}
      <button
        className="text-sm font-oswald font-medium text-[#004777] hover:text-[#FF7700] transition-colors whitespace-nowrap uppercase"
        data-testid="nav-brands-link"
      >
        Brands
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] z-50
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
          <div className="bg-[#004777] border-b-2 border-[#00AFB5] px-6 py-4">
            <div className="flex items-center gap-3">
              <IoTennisball className="w-6 h-6 text-[#EFD28D]" />
              <h3 className="text-xl font-oswald font-bold text-white uppercase">
                Shop by Brand
              </h3>
            </div>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-3 gap-2 p-4 max-h-[400px] overflow-y-auto">
            {brands.map((brand) => (
              <LocalizedClientLink
                key={brand.id}
                href={`/store?type=${encodeURIComponent(brand.name)}`}
                className="
                  group flex items-center gap-2 px-4 py-3 rounded-lg
                  bg-[#004777] hover:bg-[#FF7700]
                  border border-[#00AFB5]/30 hover:border-[#00AFB5]
                  transition-all duration-200
                "
              >
                <IoTennisball className="w-4 h-4 text-[#EFD28D] group-hover:rotate-45 transition-transform duration-300" />
                <span className="text-white font-quicksand text-sm font-medium">
                  {brand.name}
                </span>
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
