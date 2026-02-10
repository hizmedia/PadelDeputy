import { Dialog, Transition } from "@headlessui/react"
import { Button, clx } from "@medusajs/ui"
import React, { Fragment, useMemo } from "react"
import { IoTennisball } from "react-icons/io5"

import useToggleState from "@lib/hooks/use-toggle-state"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"

import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "./option-select"
import { HttpTypes } from "@medusajs/types"

type MobileActionsProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  options: Record<string, string | undefined>
  updateOptions: (title: string, value: string) => void
  inStock?: boolean
  handleAddToCart: () => void
  isAdding?: boolean
  show: boolean
  optionsDisabled: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
}) => {
  const { state, open, close } = useToggleState()

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
  })

  const selectedPrice = useMemo(() => {
    if (!price) {
      return null
    }
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  return (
    <>
      <div
        className={clx("lg:hidden inset-x-0 bottom-0 fixed z-50", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0 translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-300"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-full"
        >
          <div
            className="bg-[#004777] flex flex-col gap-y-3 justify-center items-center p-4 h-full w-full border-t-4 border-[#FF7700] shadow-2xl"
            data-testid="mobile-actions"
          >
            {/* Product Info & Price Row */}
            <div className="flex items-center justify-between w-full text-white">
              <div className="flex items-center gap-x-2 flex-1">
                <IoTennisball className="w-5 h-5 text-[#EFD28D] flex-shrink-0" />
                <span 
                  data-testid="mobile-title" 
                  className="font-oswald font-bold text-sm uppercase tracking-wide line-clamp-1"
                >
                  {product.title}
                </span>
              </div>
              {selectedPrice && (
                <div className="flex items-center gap-x-2 ml-3">
                  <span className="text-[#00AFB5] font-bold">—</span>
                  <div className="flex flex-col items-end">
                    {selectedPrice.price_type === "sale" && (
                      <span className="line-through text-xs text-[#EFD28D]/70 font-quicksand">
                        {selectedPrice.original_price}
                      </span>
                    )}
                    <span
                      className={clx("font-oswald font-bold text-lg", {
                        "text-[#FF7700]": selectedPrice.price_type === "sale",
                        "text-white": selectedPrice.price_type !== "sale",
                      })}
                    >
                      {selectedPrice.calculated_price}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 w-full gap-x-3">
              <button
                onClick={open}
                className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 border-2 border-[#00AFB5] rounded-xl text-white font-oswald font-semibold uppercase tracking-wide transition-all duration-200 flex items-center justify-center gap-2"
                data-testid="mobile-actions-button"
              >
                <span className="text-sm truncate">
                  {variant
                    ? Object.values(options).join(" / ")
                    : "Options"}
                </span>
                <ChevronDown className="flex-shrink-0" />
              </button>
              <button
                onClick={handleAddToCart}
                disabled={!inStock || !variant || isAdding}
                className={clx(
                  "w-full px-4 py-3 rounded-xl font-oswald font-bold uppercase tracking-wide text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg",
                  {
                    "bg-[#FF7700] hover:bg-[#FF7700]/90 text-white": inStock && variant && !isAdding,
                    "bg-gray-400 text-gray-200 cursor-not-allowed": !inStock || !variant || isAdding,
                  }
                )}
                data-testid="mobile-cart-button"
              >
                {isAdding ? (
                  <>
                    <span className="animate-spin">⚡</span>
                    <span>Adding...</span>
                  </>
                ) : !variant ? (
                  "Select Variant"
                ) : !inStock ? (
                  "Out of Stock"
                ) : (
                  <>
                    <span>Add to Cart</span>
                    <IoTennisball className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </Transition>
      </div>

      {/* Options Modal */}
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#004777]/90 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed bottom-0 inset-x-0">
            <div className="flex min-h-full h-full items-end justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <Dialog.Panel
                  className="w-full transform overflow-hidden text-left flex flex-col rounded-t-3xl"
                  data-testid="mobile-actions-modal"
                >
                  {/* Header */}
                  <div className="bg-[#004777] px-6 py-4 flex items-center justify-between border-b-2 border-[#FF7700]">
                    <div className="flex items-center gap-2">
                      <IoTennisball className="w-6 h-6 text-[#EFD28D]" />
                      <h3 className="text-white font-oswald font-bold text-lg uppercase tracking-wide">
                        Select Options
                      </h3>
                    </div>
                    <button
                      onClick={close}
                      className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full text-white flex justify-center items-center transition-all duration-200 border border-white/20"
                      data-testid="close-modal-button"
                    >
                      <X />
                    </button>
                  </div>

                  {/* Options Content */}
                  <div className="bg-white px-6 py-8 max-h-[60vh] overflow-y-auto">
                    {(product.variants?.length ?? 0) > 1 && (
                      <div className="flex flex-col gap-y-6">
                        {(product.options || []).map((option) => {
                          return (
                            <div key={option.id}>
                              <OptionSelect
                                option={option}
                                current={options[option.title ?? ""]}
                                updateOption={updateOptions}
                                title={option.title ?? ""}
                                disabled={optionsDisabled}
                              />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <button
                      onClick={close}
                      className="w-full bg-[#FF7700] hover:bg-[#FF7700]/90 text-white font-oswald font-bold uppercase tracking-wide py-3 rounded-xl transition-all duration-200 shadow-lg"
                    >
                      Done
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions