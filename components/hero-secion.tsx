"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

type HeroSlide = {
  image: string;
  categories: {
    name: string;
    image: string;
  }[];
};

export function HeroSection({ 
  heroSlides,
  currentHeroSlide,
  setCurrentHeroSlide
}: {
  heroSlides: HeroSlide[],
  currentHeroSlide: number,
  setCurrentHeroSlide: React.Dispatch<React.SetStateAction<number>>
}) {
  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroSlides[currentHeroSlide].image || "/images/heritage-hotel.webp"}
          alt="Heritage Palace Background"
          fill
          className="object-cover transition-opacity duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-15"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="flex items-center justify-end pr-8 sm:pr-16 lg:pr-24">
            <div className="relative flex items-center justify-center space-x-4 sm:space-x-6">
              <Card className="relative overflow-hidden rounded-2xl shadow-2xl w-80 h-96 sm:w-96 sm:h-[28rem] lg:w-[420px] lg:h-[32rem] z-30 transform transition-all duration-500 hover:scale-105 cursor-pointer border-4 border-white/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <Image
                  src={heroSlides[currentHeroSlide].categories[0].image || "/images/hero-screenshot.png"}
                  alt={heroSlides[currentHeroSlide].categories[0].name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-xs font-medium">Live Preview</span>
                  </div>
                </div>

                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 text-white z-20">
                  <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide drop-shadow-lg mb-2">
                      {heroSlides[currentHeroSlide].categories[0].name}
                    </h3>
                    <p className="text-sm sm:text-base opacity-90">Discover Amazing Destinations</p>
                  </div>
                </div>
              </Card>

              <Card className="relative overflow-hidden rounded-2xl shadow-xl w-64 h-80 sm:w-72 sm:h-88 lg:w-80 lg:h-96 transform scale-90 opacity-80 transition-all duration-500 hover:scale-95 hover:opacity-90 cursor-pointer z-20 border-2 border-white/10">
                <Image
                  src={heroSlides[currentHeroSlide].categories[1].image || "/images/mauritius-beach.jpeg"}
                  alt={heroSlides[currentHeroSlide].categories[1].name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white z-10">
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                    <h3 className="text-lg sm:text-xl font-bold tracking-wide drop-shadow-lg">
                      {heroSlides[currentHeroSlide].categories[1].name}
                    </h3>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="flex items-center justify-center mt-8 space-x-4">
            <Button
              onClick={prevHeroSlide}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/20 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              onClick={nextHeroSlide}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/20 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentHeroSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/30 ${
              index === currentHeroSlide ? "bg-white shadow-lg" : "bg-white/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}