"use client"

import { Package, Shield, Zap, Sparkles, TrendingUp, Award } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const ValueProposition = () => {
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

  const values = [
    {
      icon: Shield,
      title: "Expert Curation",
      description: "Handpicked by pros. Every racket, every ball, every accessory passes our championship standard.",
      stat: "100%",
      statLabel: "Pro-Tested",
      color: "#FF7700",
      gradient: "from-[#FF7700] to-[#FF9933]",
      glowColor: "rgba(255, 119, 0, 0.3)",
      image: "https://images.unsplash.com/photo-1554068865-24ceed7e4c2c?q=80&w=2070&auto=format&fit=crop" // Padel rackets
    },
    {
      icon: Zap,
      title: "Lightning Delivery",
      description: "From our court to yours. Premium packaging, tracked shipping, and gear that arrives ready to dominate.",
      stat: "24hr",
      statLabel: "Ship Time",
      color: "#00AFB5",
      gradient: "from-[#00AFB5] to-[#00D4DD]",
      glowColor: "rgba(0, 175, 181, 0.3)",
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=2065&auto=format&fit=crop" // Fast delivery concept
    },
    {
      icon: Award,
      title: "Champion Quality",
      description: "Tournament-grade equipment trusted by winners. Your game deserves nothing less than excellence.",
      stat: "1K+",
      statLabel: "Happy Players",
      color: "#004777",
      gradient: "from-[#004777] to-[#0066AA]",
      glowColor: "rgba(0, 71, 119, 0.3)",
      image: "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?q=80&w=2070&auto=format&fit=crop" // Trophy/award
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-white py-20 md:py-32 overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23004777' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="content-container relative z-10">
        {/* Section Header with Animation */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF7700]/10 to-[#00AFB5]/10 px-6 py-2 rounded-full mb-6 border border-[#FF7700]/20">
            <Sparkles className="w-4 h-4 text-[#FF7700]" />
            <span className="font-oswald text-sm uppercase tracking-wider text-[#004777] font-semibold">
              The Padel Deputy Difference
            </span>
          </div>
          
          <h2 className="font-oswald font-bold text-4xl md:text-6xl lg:text-7xl text-[#004777] uppercase tracking-tight mb-6">
            <span className="bg-gradient-to-r from-[#004777] via-[#00AFB5] to-[#FF7700] bg-clip-text text-transparent">
              Built for Winners
            </span>
          </h2>
          <p className="font-quicksand text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every champion needs the right equipment. We deliver excellence that matches your ambition.
          </p>
        </div>

        {/* Value Cards Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Card Container */}
                <div className="relative bg-white rounded-3xl p-8 h-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden">
                  
                  {/* Background Image with Dark Overlay */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={value.image}
                      alt={value.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Dark overlay - increases on hover */}
                    <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-all duration-500" />
                    
                    {/* Gradient overlay matching brand color */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                    />
                  </div>

                  {/* Top Corner Accent */}
                  <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${value.gradient} rounded-full opacity-20 group-hover:opacity-30 transition-all duration-500 group-hover:scale-150 z-[1]`} />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with Animated Background */}
                    <div className="relative mb-6">
                      <div 
                        className={`relative w-20 h-20 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-lg`}
                      >
                        <IconComponent 
                          className="w-10 h-10 text-white" 
                          strokeWidth={2.5}
                        />
                      </div>
                      
                      {/* Stat Badge */}
                      <div className="absolute -top-2 -right-2 bg-white rounded-full px-3 py-1 shadow-lg border-2 border-gray-100 group-hover:scale-110 transition-transform duration-300">
                        <div className={`font-oswald font-bold text-lg bg-gradient-to-r ${value.gradient} bg-clip-text text-transparent`}>
                          {value.stat}
                        </div>
                        <div className="font-quicksand text-[10px] text-gray-500 uppercase tracking-wide -mt-1">
                          {value.statLabel}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 
                      className="font-oswald font-bold text-2xl md:text-3xl mb-4 uppercase tracking-wide text-white drop-shadow-lg"
                    >
                      {value.title}
                    </h3>

                    {/* Description */}
                    <p className="font-quicksand text-gray-100 leading-relaxed text-base drop-shadow-md">
                      {value.description}
                    </p>
                  </div>

                  {/* Animated Bottom Border */}
                  <div 
                    className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r ${value.gradient} z-10`}
                  />

                  {/* Corner Shine Effect */}
                  <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[2]">
                    <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white to-transparent opacity-20 rounded-full blur-xl" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Enhanced Trust Section with Animation */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-gradient-to-r from-[#004777] via-[#00AFB5] to-[#FF7700] p-[2px] rounded-3xl max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl px-8 py-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                
                {/* Left: Avatar Stack */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[
                      { gradient: 'from-[#FF7700] to-[#FF9933]' },
                      { gradient: 'from-[#00AFB5] to-[#00D4DD]' },
                      { gradient: 'from-[#004777] to-[#0066AA]' },
                      { gradient: 'from-[#FF7700] via-[#00AFB5] to-[#004777]' }
                    ].map((avatar, i) => (
                      <div 
                        key={i}
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatar.gradient} border-4 border-white shadow-lg flex items-center justify-center transform hover:scale-110 hover:z-10 transition-transform duration-300`}
                      >
                        <TrendingUp className="w-5 h-5 text-white" strokeWidth={3} />
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <div className="font-oswald text-3xl font-bold text-[#004777]">
                      1,000+
                    </div>
                    <div className="font-quicksand text-sm text-gray-600 -mt-1">
                      Champions Trust Us
                    </div>
                  </div>
                </div>

                {/* Middle: Divider */}
                <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

                {/* Right: Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-6 h-6 fill-[#FF7700]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <div>
                    <div className="font-oswald text-3xl font-bold text-[#004777]">
                      4.9/5
                    </div>
                    <div className="font-quicksand text-sm text-gray-600 -mt-1">
                      Average Rating
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ValueProposition