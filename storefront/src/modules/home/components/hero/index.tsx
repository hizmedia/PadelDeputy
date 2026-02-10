import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PadelCourtBackground from "@modules/common/components/padel-court-background"

const Hero = () => {
  return (
    <div className="relative w-full h-[85vh] overflow-hidden bg-gradient-to-br from-[#004777] via-[#00AFB5] to-[#004777]">
      {/* Animated Padel Court Background */}
      <PadelCourtBackground className="opacity-30" />

      {/* Animated Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF7700] rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-[#A30000] rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: "2s" }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-[#EFD28D] rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: "4s" }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 content-container h-full flex flex-col justify-center items-center text-center px-6">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <span className="w-2 h-2 bg-[#FF7700] rounded-full animate-pulse"></span>
          <span className="text-white text-sm font-quicksand font-medium tracking-wide">
            Premium Padel Equipment
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-oswald font-bold text-white mb-6 leading-tight">
          <span className="block text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight">
            Only Gear
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight">
            That Makes
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight text-[#FF7700] drop-shadow-[0_0_30px_rgba(255,119,0,0.5)]">
            The Cut
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-white/90 text-lg md:text-xl font-quicksand max-w-2xl mb-10 leading-relaxed">
          Curated collection of professional-grade padel rackets, apparel, and accessories. 
          <span className="block mt-2 text-[#EFD28D] font-semibold">Elevate your game with the best.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <LocalizedClientLink href="/store">
            <Button 
              size="xlarge"
              className="bg-[#FF7700] hover:bg-[#FF7700]/90 text-white border-none shadow-xl shadow-[#FF7700]/30 font-oswald font-bold uppercase tracking-wider px-8 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#FF7700]/40"
            >
              Shop Collection
            </Button>
          </LocalizedClientLink>
          <LocalizedClientLink href="/collections">
            <Button 
              size="xlarge"
              variant="transparent"
              className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm font-oswald font-bold uppercase tracking-wider px-8 transition-all hover:scale-105"
            >
              Explore Gear
            </Button>
          </LocalizedClientLink>
        </div>
      </div>

      {/* Bottom Gradient Fade */}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}

export default Hero