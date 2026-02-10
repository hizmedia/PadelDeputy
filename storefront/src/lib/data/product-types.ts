import { sdk } from "@lib/config"
import { cache } from "react"

export const getProductTypes = cache(async function () {
  try {
    const response = await sdk.store.productType.list(
      {},
      { next: { tags: ["product_types"] } }
    )
    
    // Map to a simpler format with unique brands
    const brands = response.product_types
      .filter((type) => type.value) // Only include types with values
      .map((type) => ({
        id: type.id,
        name: type.value,
        slug: type.value.toLowerCase().replace(/\s+/g, "-"),
      }))
    
    // Remove duplicates by name
    const uniqueBrands = brands.filter(
      (brand, index, self) =>
        index === self.findIndex((b) => b.name === brand.name)
    )
    
    return uniqueBrands
  } catch (error) {
    console.error("Error fetching product types:", error)
    return []
  }
})
