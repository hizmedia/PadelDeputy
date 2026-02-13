"use client"

import { useEffect, useRef, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { HttpTypes } from "@medusajs/types"

interface CategoryShowcaseProps {
  categories?: HttpTypes.StoreProductCategory[]
}

const CategoryShowcase = ({ categories = [] }: CategoryShowcaseProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Color mapping for categories
  const getCategoryColor = (index: number) => {
    const colors = [
      { color: "#FF7700", gradient: "from-[#FF7700] to-[#FF9933]" },
      { color: "#00AFB5", gradient: "from-[#00AFB5] to-[#00D4DD]" },
      { color: "#004777", gradient: "from-[#004777] to-[#0066AA]" },
      { color: "#FF7700", gradient: "from-[#FF7700] to-[#FF9933]" }
    ]
    return colors[index % colors.length]
  }

  // Default image based on category name or index
  const getCategoryImage = (category: HttpTypes.StoreProductCategory, index: number) => {
    // Use category metadata image if available
    if (category.metadata?.image) {
      return category.metadata.image as string
    }

    // Fallback images based on common category names
    const name = category.name.toLowerCase()
    if (name.includes('racket') || name.includes('racquet')) {
      return "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop"
    }
    if (name.includes('apparel') || name.includes('clothing') || name.includes('shirt')) {
      return "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2787&auto=format&fit=crop"
    }
    if (name.includes('shoe') || name.includes('footwear')) {
      return "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
    }
    if (name.includes('accessory') || name.includes('accessories') || name.includes('bag')) {
      return "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?q=80&w=2080&auto=format&fit=crop"
    }
    if (name.includes('ball')) {
      return "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2070&auto=format&fit=crop"
    }

    // Default fallback
    return "https://images.unsplash.com/photo-1554068865-24ceed7e4c2c?q=80&w=2070&auto=format&fit=crop"
  }

  // Take top level categories (max 4)
  const displayCategories = categories.slice(0, 4)

  if (!displayCategories || displayCategories.length === 0) {
    return null
  }

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-gray-50 to-white py-20 md:py-32 overflow-hidden"
    >
      <div className="content-container">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-oswald font-bold text-4xl md:text-6xl text-[#004777] uppercase tracking-tight mb-4">
            Shop by Category
          </h2>
          <p className="font-quicksand text-lg text-gray-600 max-w-2xl mx-auto">
            Find exactly what you need to dominate the court
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Featured Large Card - First Category */}
          {displayCategories[0] && (
            <div
              className={`md:col-span-2 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              <LocalizedClientLink href={`/categories/${displayCategories[0].handle}`}>
                <div className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Background Image */}
                  <Image
                    src={getCategoryImage(displayCategories[0], 0)}
                    alt={displayCategories[0].name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 100vw"
                    priority
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(0).gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    {/* Featured Badge */}
                    <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${getCategoryColor(0).gradient} px-4 py-2 rounded-full mb-4 w-fit`}>
                      <span className="font-oswald text-xs uppercase tracking-wider text-white font-semibold">
                        Most Popular
                      </span>
                    </div>

                    <h3 className="font-oswald font-bold text-5xl md:text-7xl text-white uppercase tracking-tight mb-3">
                      {displayCategories[0].name}
                    </h3>
                    
                    {/* Show description or child categories count */}
                    {displayCategories[0].description ? (
                      <p className="font-quicksand text-xl text-gray-200 mb-6 max-w-xl">
                        {displayCategories[0].description}
                      </p>
                    ) : displayCategories[0].category_children && displayCategories[0].category_children.length > 0 ? (
                      <p className="font-quicksand text-xl text-gray-200 mb-6 max-w-xl">
                        {displayCategories[0].category_children.length} subcategories available
                      </p>
                    ) : (
                      <p className="font-quicksand text-xl text-gray-200 mb-6 max-w-xl">
                        Explore our selection
                      </p>
                    )}

                    {/* CTA Button */}
                    <div className="flex items-center gap-3 group-hover:gap-5 transition-all duration-300">
                      <span className="font-oswald text-white text-lg uppercase tracking-wider">
                        Shop Now
                      </span>
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getCategoryColor(0).gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <ArrowRight className="w-6 h-6 text-white" strokeWidth={3} />
                      </div>
                    </div>
                  </div>

                  {/* Animated Border */}
                  <div 
                    className={`absolute bottom-0 left-0 h-2 w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r ${getCategoryColor(0).gradient}`}
                  />
                </div>
              </LocalizedClientLink>
            </div>
          )}

          {/* Smaller Category Cards */}
          {displayCategories.slice(1).map((category, index) => {
            const colorData = getCategoryColor(index + 1)
            return (
              <div
                key={category.id}
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                <LocalizedClientLink href={`/categories/${category.handle}`}>
                  <div className="group relative h-[300px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    {/* Background Image */}
                    <Image
                      src={getCategoryImage(category, index + 1)}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${colorData.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                      <h3 className="font-oswald font-bold text-4xl md:text-5xl text-white uppercase tracking-tight mb-2">
                        {category.name}
                      </h3>
                      
                      {/* Show description or child categories */}
                      {category.description ? (
                        <p className="font-quicksand text-base text-gray-200 mb-4">
                          {category.description}
                        </p>
                      ) : category.category_children && category.category_children.length > 0 ? (
                        <p className="font-quicksand text-base text-gray-200 mb-4">
                          {category.category_children.length} subcategories
                        </p>
                      ) : (
                        <p className="font-quicksand text-base text-gray-200 mb-4">
                          Shop now
                        </p>
                      )}

                      {/* CTA */}
                      <div className="flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                        <span className="font-oswald text-white text-sm uppercase tracking-wider">
                          Explore
                        </span>
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${colorData.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <ArrowRight className="w-5 h-5 text-white" strokeWidth={3} />
                        </div>
                      </div>
                    </div>

                    {/* Animated Border */}
                    <div 
                      className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r ${colorData.gradient}`}
                    />
                  </div>
                </LocalizedClientLink>
              </div>
            )
          })}
        </div>

        {/* View All Categories Link */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <LocalizedClientLink href="/store">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full shadow-lg hover:shadow-xl border-2 border-[#004777] group transition-all duration-300 hover:scale-105">
              <span className="font-oswald text-[#004777] font-semibold uppercase tracking-wider">
                View All Products
              </span>
              <ArrowRight className="w-5 h-5 text-[#004777] group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
            </div>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default CategoryShowcase