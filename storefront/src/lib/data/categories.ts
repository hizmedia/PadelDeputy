import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { cache } from "react"

export const getCategoriesList = cache(async function (
  offset: number = 0,
  limit: number = 100
): Promise<{
  product_categories: HttpTypes.StoreProductCategory[]
  count: number
}> {
  return await sdk.store.category
    .list(
      { 
        limit, 
        offset,
        fields: "+category_children"
      },
      { next: { tags: ["categories"] } }
    )
    .then(({ product_categories, count }) => ({
      product_categories,
      count,
    }))
})

export const getCategoryByHandle = cache(async function (
  categoryHandle: string[]
): Promise<{ product_categories: HttpTypes.StoreProductCategory[] }> {
  return await sdk.store.category
    .list(
      { 
        handle: categoryHandle,
        fields: "+category_children"
      },
      { next: { tags: ["categories"] } }
    )
    .then(({ product_categories }) => ({ product_categories }))
})

export const getCategoryChildren = cache(async function (
  parentCategoryId: string
): Promise<HttpTypes.StoreProductCategory[]> {
  try {
    const response = await sdk.store.category.list(
      {
        parent_category_id: parentCategoryId,
        fields: "id,name,handle",
      },
      { next: { tags: ["categories"] } }
    )
    
    return response.product_categories || []
  } catch (error) {
    console.error(`Error fetching children for category ${parentCategoryId}:`, error)
    return []
  }
})

export const listCategories = cache(async function (): Promise<
  HttpTypes.StoreProductCategory[]
> {
  const { product_categories } = await sdk.store.category.list(
    { 
      limit: 100,
      fields: "id,name,handle"
    },
    { next: { tags: ["categories"] } }
  )
  
  return product_categories || []
})