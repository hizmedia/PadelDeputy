import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import Image from "next/image"
import { FaApplePay, FaCcMastercard, FaCcVisa } from "react-icons/fa"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="w-full bg-[#004777] border-t border-ui-border-base">
      <div className="content-container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-16">
          {/* Brand Section - Takes more space */}
          <div className="lg:col-span-4">
            <LocalizedClientLink href="/" className="inline-block mb-4">
              <Image
                src="https://res.cloudinary.com/ddx1fkwnx/image/upload/v1770234792/Transparent_bg_Logo-01_weh4aw.png"
                alt="Padel Deputy Logo"
                width={300}
                height={150}
              />
            </LocalizedClientLink>
            <p className="text-[#ffffff] text-sm mb-6 max-w-sm font-quicksand">
              Only Gear That Makes the Cut. <br />
              Curated padel equipment for players who demand excellence on the
              court.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-ui-bg-base border border-ui-border-base hover:bg-ui-bg-base-hover hover:border-ui-fg-base transition-all"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-ui-bg-base border border-ui-border-base hover:bg-ui-bg-base-hover hover:border-ui-fg-base transition-all"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-ui-bg-base border border-ui-border-base hover:bg-ui-bg-base-hover hover:border-ui-fg-base transition-all"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Categories Column */}
          {product_categories && product_categories?.length > 0 && (
            <div className="lg:col-span-3">
              <h3 className="font-oswald font-semibold text-ui-fg-base uppercase tracking-wide text-sm mb-4 text-[#ffffff]">
                Shop by Category
              </h3>
              <ul className="space-y-3">
                {product_categories?.slice(0, 6).map((c) => {
                  if (c.parent_category) {
                    return null
                  }

                  return (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="text-[#ffffff] hover:text-ui-fg-interactive text-sm transition-colors font-quicksand"
                        href={`/categories/${c.handle}`}
                        data-testid="category-link"
                      >
                        {c.name}
                      </LocalizedClientLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* Collections Column */}
          {collections && collections.length > 0 && (
            <div className="lg:col-span-2">
              <h3 className="font-oswald font-semibold text-[#ffffff] uppercase tracking-wide text-sm mb-4">
                Collections
              </h3>
              <ul className="space-y-3">
                {collections?.slice(0, 6).map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink
                      className="text-ui-fg-subtle hover:text-ui-fg-interactive text-sm transition-colors font-quicksand"
                      href={`/collections/${c.handle}`}
                    >
                      {c.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Customer Service Column */}
          <div className="lg:col-span-3">
            <h3 className="font-oswald font-semibold text-ui-fg-base uppercase tracking-wide text-sm mb-4 text-[#ffffff]">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <LocalizedClientLink
                  href="/about"
                  className="text-[#ffffff] hover:text-ui-fg-interactive text-sm transition-colors font-quicksand"
                >
                  About Us
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/contact"
                  className="text-[#ffffff] hover:text-ui-fg-interactive text-sm transition-colors font-quicksand"
                >
                  Contact
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/shipping"
                  className="text-[#ffffff] hover:text-ui-fg-interactive text-sm transition-colors font-quicksand"
                >
                  Shipping & Returns
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/faq"
                  className="text-[#ffffff] hover:text-ui-fg-interactive text-sm transition-colors font-quicksand"
                >
                  FAQ
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/privacy"
                  className="text-[#ffffff] hover:text-ui-fg-interactive text-sm transition-colors font-quicksand"
                >
                  Privacy Policy
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/terms"
                  className="text-[#ffffff] hover:text-ui-fg-interactive text-sm transition-colors font-quicksand"
                >
                  Terms & Conditions
                </LocalizedClientLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-ui-border-base py-10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-oswald font-semibold text-[#ffffff] text-lg uppercase tracking-wide mb-2">
              Join the Squad
            </h3>
            <p className="text-[#ffffff] text-sm mb-6 font-quicksand">
              Get exclusive access to new releases, special offers, and pro
              tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-ui-border-base bg-ui-bg-base text-ui-fg-base placeholder:text-ui-fg-muted focus:outline-none focus:ring-2 focus:ring-ui-fg-interactive font-quicksand"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#A30000] text-ui-bg-base text-[#ffffff] rounded-lg font-oswald font-semibold uppercase tracking-wide hover:bg-ui-fg-interactive transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ui-border-base py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Text className="text-ui-fg-muted text-xs font-quicksand text-[#ffffff]">
              © {new Date().getFullYear()} Padel Deputy. All rights reserved.
            </Text>
            <Text className="text-ui-fg-muted text-xs font-quicksand text-[#ffffff] hover:text-ui-fg-interactive transition-colors hover:underline">
              <a href="https://www.hizmedia.com" target="_blank" rel="noopener noreferrer">
              Powered by
              Hizmedia</a>
            </Text>
            <div className="flex items-center gap-6">
              <Text className="text-ui-fg-muted text-xs font-quicksand text-[#ffffff]">
                Secure Payment
              </Text>
              <div className="flex gap-2">
                {/* Payment Icons */}
                <div className="w-10 h-6 bg-ui-bg-base border border-ui-border-base rounded flex items-center justify-center">
                  <FaApplePay className="text-2xl font-bold text-[#00477]" />
                </div>
                <div className="w-10 h-6 bg-ui-bg-base border border-ui-border-base rounded flex items-center justify-center">
                  <FaCcMastercard className="text-2xl font-bold text-[#00477]" />
                </div>
                <div className="w-10 h-6 bg-ui-bg-base border border-ui-border-base rounded flex items-center justify-center">
                  <FaCcVisa className="text-2xl font-bold text-[#00477]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
