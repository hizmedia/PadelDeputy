"use client"

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment, useMemo, useState } from "react"
import {

  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"
import { IoTennisball } from "react-icons/io5"


const SideMenuItems = {
  Home: "/",
  Search: "/search",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({
  regions,
  categories,
}: {
  regions: HttpTypes.StoreRegion[] | null
  categories?: HttpTypes.StoreProductCategory[] | null
}) => {
  const toggleState = useToggleState()
  const [storeOpen, setStoreOpen] = useState(false)

  const topLevelCategories = useMemo(() => {
    return (categories || []).filter((cat) => !cat.parent_category)
  }, [categories])

  return (
    <div className="z-50 h-full">
      <div className="flex items-center justify-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                  onClick={() => setStoreOpen(false)}
                >
                  <IoTennisball className="w-8 h-8 text-[#004777] p-1 rounded-lg" />
                </Popover.Button>
              </div>

              <Transition show={open} as={Fragment}>
                <div className="fixed inset-0 z-40">
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute inset-0 bg-black/30" onClick={close} />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="transition-transform ease-out duration-300"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition-transform ease-in duration-200"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <Popover.Panel
                      className="
                        fixed left-0 top-0 z-50 h-screen w-[85vw] max-w-sm sm:w-1/3 2xl:w-1/4
                        bg-[#004777] text-ui-fg-on-color shadow-2xl
                        transform-gpu will-change-transform
                      "
                      data-testid="nav-menu-popup"
                    >
                      <div className="relative flex h-full flex-col overflow-hidden">
                        {/* Normal menu view */}
                        <div
                          className={clx(
                            "flex h-full flex-col p-6 transition-transform duration-300 ease-out",
                            storeOpen ? "-translate-x-full" : "translate-x-0"
                          )}
                        >
                          <div className="flex justify-end shrink-0">
                            <button
                              data-testid="close-menu-button"
                              onClick={() => {
                                setStoreOpen(false)
                                close()
                              }}
                            >
                              <XMark />
                            </button>
                          </div>

                          <div className="flex-1 min-h-0 overflow-y-auto pt-6">
                            <ul className="flex flex-col gap-6 items-start justify-start">
                              {Object.entries(SideMenuItems).map(([name, href]) => (
                                <li key={name}>
                                  <LocalizedClientLink
                                    href={href}
                                    className="text-3xl leading-10 hover:text-ui-fg-disabled font-quicksand"
                                    onClick={() => {
                                      setStoreOpen(false)
                                      close()
                                    }}
                                    data-testid={`${name.toLowerCase()}-link`}
                                  >
                                    {name}
                                  </LocalizedClientLink>
                                </li>
                              ))}

                              {categories && categories.length > 0 && (
                                <li className="w-full">
                                  <button
                                    type="button"
                                    className="flex items-center justify-between w-full text-3xl leading-10 hover:text-ui-fg-disabled font-quicksand"
                                    onClick={() => setStoreOpen(true)}
                                  >
                                    <span>Store</span>
                                    <ChevronRightIcon className="w-7 h-7" />
                                  </button>
                                </li>
                              )}

                              <li>
                                <LocalizedClientLink
                                  href="/contact"
                                  className="text-3xl leading-10 hover:text-ui-fg-disabled font-quicksand"
                                  onClick={() => {
                                    setStoreOpen(false)
                                    close()
                                  }}
                                  data-testid="contact-link"
                                >
                                  Contact Us
                                </LocalizedClientLink>
                              </li>
                            </ul>
                          </div>

                          <div className="shrink-0 pt-6 flex flex-col gap-y-6">
                            <div
                              className="flex justify-between"
                              onMouseEnter={toggleState.open}
                              onMouseLeave={toggleState.close}
                            >
                              {regions && (
                                <CountrySelect toggleState={toggleState} regions={regions} />
                              )}
                              <ArrowRightMini
                                className={clx(
                                  "transition-transform duration-150",
                                  toggleState.state ? "-rotate-90" : ""
                                )}
                              />
                            </div>

                            <Text className="flex justify-between txt-compact-small">
                              © {new Date().getFullYear()} Padel Deputy. All rights reserved.
                            </Text>
                          </div>
                        </div>

                        {/* Store view (covers the menu content) */}
                        <div
                          className={clx(
                            "absolute inset-0 flex h-full flex-col p-6 transition-transform duration-300 ease-out",
                            storeOpen ? "translate-x-0" : "translate-x-full"
                          )}
                        >
                          <div className="flex items-center justify-between shrink-0">
                            <button
                              type="button"
                              className="inline-flex items-center gap-2 hover:text-ui-fg-disabled"
                              onClick={() => setStoreOpen(false)}
                            >
                              <ChevronLeftIcon className="w-7 h-7" />
                              <span className="text-2xl font-quicksand">Store</span>
                            </button>

                            <button
                              data-testid="close-menu-button"
                              onClick={() => {
                                setStoreOpen(false)
                                close()
                              }}
                            >
                              <XMark />
                            </button>
                          </div>

                          <div className="flex-1 min-h-0 overflow-y-auto pt-8">
                            <div className="flex flex-col gap-4">
                              <LocalizedClientLink
                                href="/store"
                                className="text-2xl leading-9 hover:text-ui-fg-disabled font-quicksand"
                                onClick={() => {
                                  setStoreOpen(false)
                                  close()
                                }}
                                data-testid="all-products-link"
                              >
                                All Products
                              </LocalizedClientLink>

                              {topLevelCategories.map((category) => (
                                <LocalizedClientLink
                                  key={category.id}
                                  href={`/categories/${category.handle}`}
                                  className="text-2xl leading-9 hover:text-ui-fg-disabled font-quicksand"
                                  onClick={() => {
                                    setStoreOpen(false)
                                    close()
                                  }}
                                  data-testid={`category-${category.handle}-link`}
                                >
                                  {category.name}
                                </LocalizedClientLink>
                              ))}
                            </div>
                          </div>

                          <div className="shrink-0 pt-6">
                            <Text className="flex justify-between txt-compact-small">
                              © {new Date().getFullYear()} Longton Pharmacy. All rights reserved.
                            </Text>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
