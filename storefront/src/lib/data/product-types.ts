import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { cache } from "react"

// Type guard for product type
const hasValidType = (product: HttpTypes.StoreProduct): boolean => {
  return !!(
    product.type &&
    typeof product.type === 'object' &&
    'value' in product.type &&
    product.type.value
  )
}

// Extract type ID from product
const getTypeId = (product: HttpTypes.StoreProduct): string => {
  if (typeof product.type === 'object' && 'id' in product.type && product.type.id) {
    return product.type.id as string
  }
  if (typeof product.type === 'object' && 'value' in product.type) {
    return product.type.value as string
  }
  return ''
}

export const getProductTypes = cache(async function () {
  try {
    // Fetch all products to get their types (no limit to ensure we get all types)
    const response = await sdk.store.product.list(
      {
        fields: "type_id,type",
      },
      { next: { tags: ["products"] } }
    )
    
    // Extract unique types from products
    const typesMap = new Map<string, { id: string; name: string; slug: string }>()
    
    response.products.forEach((product: HttpTypes.StoreProduct) => {
      if (hasValidType(product)) {
        const typeValue = (product.type as { value: string }).value
        const typeId = getTypeId(product)
        if (!typesMap.has(typeValue)) {
          typesMap.set(typeValue, {
            id: typeId,
            name: typeValue,
            slug: typeValue.toLowerCase().replace(/\s+/g, "-"),
          })
        }
      }
    })
    
    return Array.from(typesMap.values())
  } catch (error) {
    console.error("Error fetching product types:", error)
    return []
  }
})

// Get brands filtered by category
export const getProductTypesByCategory = cache(async function (categoryId: string) {
  try {
    // Fetch products in this category to get their types
    const response = await sdk.store.product.list(
      {
        category_id: [categoryId],
        fields: "type_id,type",
      },
      { next: { tags: ["products"] } }
    )
    
    // Extract unique types from products in this category
    const typesMap = new Map<string, { id: string; name: string; slug: string }>()
    
    response.products.forEach((product: HttpTypes.StoreProduct) => {
      if (hasValidType(product)) {
        const typeValue = (product.type as { value: string }).value
        const typeId = getTypeId(product)
        if (!typesMap.has(typeValue)) {
          typesMap.set(typeValue, {
            id: typeId,
            name: typeValue,
            slug: typeValue.toLowerCase().replace(/\s+/g, "-"),
          })
        }
      }
    })
    
    return Array.from(typesMap.values())
  } catch (error) {
    console.error("Error fetching product types by category:", error)
    return []
  }
})
