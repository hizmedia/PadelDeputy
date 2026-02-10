import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { getCategoriesList } from "@lib/data/categories"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"
import {
  ShoppingCartIcon,
  UserCircleIcon,
  MagnifyingGlassCircleIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const { product_categories } = await getCategoriesList(0, 10)

  const MAX_NAVBAR_CATEGORIES = 5

  const topLevelCategories =
    product_categories?.filter((cat) => !cat.parent_category) || []

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus flex items-center w-full h-full text-small-regular">
          {/* Left column */}
          <div className="flex-1 small:flex-[1] flex items-center h-full">
            {/* Mobile hamburger */}
            <div className="h-full small:hidden">
              <SideMenu
                regions={regions}
                categories={product_categories || []}
              />
            </div>

            {/* Desktop logo */}
            <LocalizedClientLink
              href="/"
              className="hidden small:block hover:opacity-80 transition-opacity"
              data-testid="nav-store-link"
            >
              <Image
                src="https://res.cloudinary.com/ddx1fkwnx/image/upload/v1770234792/Transparent_bg_Logo-01_weh4aw.png"
                alt="Padel Deputy Logo"
                width={150}
                height={50}
              />
            </LocalizedClientLink>
          </div>

          {/* Middle column */}
          <div className="flex-1 small:flex-[2] flex items-center justify-center h-full">
            {/* Mobile logo */}
            <LocalizedClientLink
              href="/"
              className="small:hidden flex w-full justify-center hover:opacity-80 transition-opacity"
              data-testid="nav-store-link-mobile"
            >
              <Image
                src="https://res.cloudinary.com/ddx1fkwnx/image/upload/v1770234792/Transparent_bg_Logo-01_weh4aw.png"
                alt="Padel Deputy Logo"
                width={150}
                height={50}
              />
            </LocalizedClientLink>

            {/* Desktop categories */}
            <div className="hidden small:flex flex-grow items-center justify-center gap-x-8">
              {topLevelCategories
                .slice(0, MAX_NAVBAR_CATEGORIES)
                .map((category) => (
                  <LocalizedClientLink
                    key={category.id}
                    href={`/categories/${category.handle}`}
                    className="text-sm font-oswald font-medium text-[#004777] hover:text-[#A30000] transition-colors whitespace-nowrap"
                    data-testid="nav-category-link"
                  >
                    {category.name.toUpperCase()}
                  </LocalizedClientLink>
                ))}
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1 small:flex-[1] flex items-center h-full justify-end gap-6">
            {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
              <LocalizedClientLink
                href="/search"
                scroll={false}
                className="hidden small:flex"
                data-testid="nav-search-link"
              >
                <MagnifyingGlassCircleIcon className="w-8 h-8 text-[#004777]" />
              </LocalizedClientLink>
            )}
            <LocalizedClientLink
              href="/contact"
              className="text-sm font-oswald font-medium text-[#004777] hover:text-[#A30000] transition-colors whitespace-nowrap"
              data-testid="nav-contact-link"
            >
              <PhoneIcon className="w-6 h-6 inline-block mr-2 text-[#004777] hidden xsmall:block" />
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/account"
              className="hidden small:flex"
              data-testid="nav-account-link"
            >
              <UserCircleIcon className="w-8 h-8 text-[#004777]" />
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="flex gap-2"
                  data-testid="nav-cart-link"
                >
                  <ShoppingCartIcon className="w-6 h-6" />
                  (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
