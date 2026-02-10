  import { Metadata } from "next"

  import FeaturedProducts from "@modules/home/components/featured-products"
  import Hero from "@modules/home/components/hero"
  import { getCollectionsWithProducts } from "@lib/data/collections"
  import { getRegion } from "@lib/data/regions"

  export const metadata: Metadata = {
    title: "Padel Deputy - Only Gear That Makes the Cut",
    description:
      "Padel Deputy is your ultimate destination for high-quality padel gear and accessories. We offer a curated selection of the best equipment to elevate your game on the court.",
    openGraph: {
      title: "Padel Deputy - Only Gear That Makes the Cut",
      description: "Padel Deputy is your ultimate destination for high-quality padel gear and accessories. We offer a curated selection of the best equipment to elevate your game on the court.",
      images: ['/opengraph-image.jpg'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Padel Deputy - Only Gear That Makes the Cut",
      description: "Padel Deputy is your ultimate destination for high-quality padel gear and accessories. We offer a curated selection of the best equipment to elevate your game on the court.",
      images: ['/twitter-image.jpg'],
    }
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
