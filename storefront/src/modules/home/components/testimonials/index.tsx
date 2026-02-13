"use client"

import { Star, Quote } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const Testimonials = () => {
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

  const testimonials = [
    {
      name: "Carlos Martinez",
      role: "Professional Player",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
      text: "The quality of rackets from Padel Deputy is unmatched. I've been using their gear for tournaments and my game has never been better.",
      location: "Miami, FL"
    },
    {
      name: "Sofia Rodriguez",
      role: "Club Champion",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
      text: "Fast shipping, excellent customer service, and products that actually deliver on their promises. This is my go-to store for all padel gear.",
      location: "Austin, TX"
    },
    {
      name: "Mike Johnson",
      role: "Weekend Warrior",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating: 5,
      text: "I'm not a pro, but Padel Deputy made me feel like one. Their expert recommendations helped me find the perfect racket for my playing style.",
      location: "Los Angeles, CA"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-gray-50 to-white py-20 md:py-32 overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-[#FF7700]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-[#00AFB5]/5 rounded-full blur-3xl" />

      <div className="content-container relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF7700]/10 to-[#00AFB5]/10 px-6 py-2 rounded-full mb-6 border border-[#FF7700]/20">
            <Star className="w-4 h-4 text-[#FF7700] fill-[#FF7700]" />
            <span className="font-oswald text-sm uppercase tracking-wider text-[#004777] font-semibold">
              Player Reviews
            </span>
          </div>
          
          <h2 className="font-oswald font-bold text-4xl md:text-6xl text-[#004777] uppercase tracking-tight mb-6">
            What Players Are Saying
          </h2>
          <p className="font-quicksand text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied players who trust Padel Deputy for their gear
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-16 h-16 text-[#004777]" fill="currentColor" />
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-4 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#FF7700] fill-[#FF7700]"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="font-quicksand text-gray-700 leading-relaxed mb-6 flex-grow relative z-10">
                  "{testimonial.text}"
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

                {/* Author Info */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF7700] to-[#00AFB5] rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="relative rounded-full border-2 border-white shadow-md"
                    />
                  </div>
                  <div>
                    <div className="font-oswald font-bold text-[#004777] text-lg">
                      {testimonial.name}
                    </div>
                    <div className="font-quicksand text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                    <div className="font-quicksand text-xs text-gray-500">
                      📍 {testimonial.location}
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r from-[#FF7700] to-[#00AFB5] rounded-b-3xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats Bar */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-gradient-to-r from-[#004777] via-[#00AFB5] to-[#FF7700] p-[2px] rounded-3xl">
            <div className="bg-white rounded-3xl px-8 py-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                {/* Stat 1 */}
                <div className="group">
                  <div className="font-oswald text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FF7700] to-[#FF9933] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    1,000+
                  </div>
                  <div className="font-quicksand text-sm text-gray-600 uppercase tracking-wide">
                    Happy Players
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="group">
                  <div className="font-oswald text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00AFB5] to-[#00D4DD] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    4.9/5
                  </div>
                  <div className="font-quicksand text-sm text-gray-600 uppercase tracking-wide">
                    Average Rating
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="group">
                  <div className="font-oswald text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#004777] to-[#0066AA] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    24hr
                  </div>
                  <div className="font-quicksand text-sm text-gray-600 uppercase tracking-wide">
                    Fast Shipping
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="group">
                  <div className="font-oswald text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FF7700] to-[#FF9933] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    100%
                  </div>
                  <div className="font-quicksand text-sm text-gray-600 uppercase tracking-wide">
                    Pro Tested
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optional: Review Platform Logos */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-quicksand text-sm text-gray-500 mb-6 uppercase tracking-wide">
            Trusted by players worldwide
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {/* You can add actual review platform logos here */}
            <div className="font-oswald text-2xl text-gray-400">★★★★★</div>
            <div className="font-quicksand text-gray-400">Google Reviews</div>
            <div className="font-oswald text-2xl text-gray-400">★★★★★</div>
            <div className="font-quicksand text-gray-400">Trustpilot</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials