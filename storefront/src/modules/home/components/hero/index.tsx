import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import FloatingTennisBallsBackground from "@modules/common/components/floating-tennis-balls-background"

const Hero = () => {
  return (
    <div className="relative w-full h-[85vh] overflow-hidden bg-white">
      {/* Floating Tennis Balls Background */}
      <FloatingTennisBallsBackground />
      {/* Content Container */}
      <div className="relative z-10 content-container h-full flex flex-col justify-center items-center text-center px-6">
        {/* Main Heading */}
        <h1 className="font-oswald font-bold text-white mb-6 leading-tight">
          <span className="block text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight text-[#004777] drop-shadow-lg">
            Only Gear
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight text-[#004777] drop-shadow-lg">
            That Makes
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight text-[#FF7700] drop-shadow-[0_0_30px_rgba(255,119,0,0.5)]">
            The Cut .
          </span>
        </h1>

        {/* Subheading */}
        <p className=" text-lg md:text-xl font-quicksand max-w-2xl mb-10 leading-relaxed text-[#004777]">
          Curated collection of professional-grade padel rackets, apparel, and
          accessories.
          <span className="block mt-2 text-[#00AFB5] font-semibold">
            Elevate your game with the best.
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <LocalizedClientLink href="/store">
            <Button
              size="xlarge"
              className="bg-[#FF7700] hover:bg-[#FF7700]/90 text-white border-none shadow-xl shadow-[#FF7700]/30 font-oswald font-bold uppercase tracking-wider px-8 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#FF7700]/40"
            >
              Shop Rackets
            </Button>
          </LocalizedClientLink>
          <LocalizedClientLink href="/collections">
            <Button
              size="xlarge"
              variant="transparent"
              className="border-2 border-[#004777] text-[#004777] hover:bg-[#004777]/10 backdrop-blur-sm font-oswald font-bold uppercase tracking-wider px-8 transition-all hover:scale-105"
            >
              Explore Gear
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
