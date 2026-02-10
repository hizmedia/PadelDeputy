import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Padel Deputy | Only Gear That makes the Cut",
  description:
    "Padel Deputy is your ultimate destination for top-quality padel gear and accessories. We are passionate about the sport of padel and are dedicated to providing players of all levels with the best equipment to enhance their game. Whether you're a beginner looking for your first racket or an experienced player seeking the latest innovations, Padel Deputy has you covered. Our curated selection includes premium rackets, comfortable apparel, durable shoes, and essential accessories from leading brands in the industry. At Padel Deputy, we believe that having the right gear can make all the difference on the court, and we're here to help you find it. Join our community of padel enthusiasts and elevate your game with Padel Deputy today!",
}

export default async function Home({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
