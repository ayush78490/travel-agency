"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"

export function ImageSlider({ 
  images,
  title,
  duration
}: {
  images: string[],
  title: string,
  duration: string
}) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    setCurrentSlide(0) // Reset to first slide when images change
    
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [images.length])

  return (
    <section className="relative h-64 md:h-96 w-full">
      {images.length === 0 ? (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No images available</span>
        </div>
      ) : (
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <div className="relative h-full w-full">
            {images.map((img, index) => (
              <div
                key={`${index}`}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <Image
                  src={img || '/images/default-tour.jpg'}
                  alt={`${title} image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={85}
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

          <div className="absolute bottom-6 left-6 z-20 text-white">
            <h1 className="text-2xl md:text-3xl font-bold drop-shadow-lg">
              {title || 'Untitled Tour'}
            </h1>
            <p className="text-lg md:text-xl font-medium drop-shadow-md">
              {duration || 'Duration not specified'}
            </p>
          </div>

          {images.length > 1 && (
            <>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {images.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentSlide(index)
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-red-600 w-6' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20 transition-colors duration-300"
                aria-label="Previous image"
              >
                <ChevronDown className="rotate-90 w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentSlide((prev) => (prev + 1) % images.length)
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20 transition-colors duration-300"
                aria-label="Next image"
              >
                <ChevronDown className="-rotate-90 w-5 h-5" />
              </button>
            </>
          )}
        </div>
      )}
    </section>
  )
}