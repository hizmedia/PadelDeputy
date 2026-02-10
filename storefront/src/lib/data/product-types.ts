import { sdk } from "@lib/config"
import { cache } from "react"

export const getProductTypes = cache(async function () {
  try {
    // Fetch products to get their types
    const response = await sdk.store.product.list(
      {
        limit: 100,
        fields: "type_id,type",
      },
      { next: { tags: ["products"] } }
    )
    
    // Extract unique types from products
    const typesMap = new Map<string, { id: string; name: string; slug: string }>()
    
    response.products.forEach((product: any) => {
      if (product.type && product.type.value) {
        const typeValue = product.type.value
        if (!typesMap.has(typeValue)) {
          typesMap.set(typeValue, {
            id: product.type.id || typeValue,
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
