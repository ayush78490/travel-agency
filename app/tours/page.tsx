"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Users } from "lucide-react"
import { TourRedirectButton } from "@/components/tour-redirect-button"
import { fetchTourPackages } from "@/utils/api" // ← Adjust path as needed
import { TourPackage } from "@/types"
import { useSearchParams } from "next/navigation"

type Tour = {
  id: number
  title: string
  countery: string
  location: string
  duration: string
  price: string
  rating: number
  reviews: number
  image: string
  category: string
  groupSize: string
  highlights: string[]
}

export default function ToursPage() {
  const searchParams = useSearchParams()
  const countryParam = searchParams.get("country")?.toLowerCase()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [tours, setTours] = useState<Tour[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fallbackTours: Tour[] = [/* your fallbackTours array */]

  const categories = [
    { id: "all", name: "All Tours" },
    { id: "heritage", name: "Heritage" },
    { id: "beach", name: "Beach" },
    { id: "culture", name: "Culture" },
    { id: "adventure", name: "Adventure" },
  ]

  useEffect(() => {
    const loadTours = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const data: TourPackage[] = await fetchTourPackages()

        const transformed: Tour[] = data.map((pkg) => ({
          id: pkg.id,
          title: pkg.title,
          countery: pkg.country || "Unknown Country",
          location: pkg.country || "Unknown Location",
          duration: `${pkg.days} Days`,
          price: pkg.price,
          rating: pkg.rating,
          reviews: pkg.review,
          image: pkg.image1 || "/images/default-tour.jpg",
          category: pkg.category.toLowerCase(),
          groupSize: `${pkg.groupSize || 1} people`,
          highlights: pkg.highlights,
        }))

        setTours(transformed.length > 0 ? transformed : fallbackTours)
      } catch (err) {
        console.error("Tour fetch failed:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
        setTours(fallbackTours)
      } finally {
        setIsLoading(false)
      }
    }

    loadTours()
  }, [])


  const filteredTours = tours.filter((tour) => {
  const matchesCategory = selectedCategory === "all" || tour.category?.toLowerCase() === selectedCategory.toLowerCase()
  const matchesCountry = !countryParam || tour.location?.toLowerCase().includes(countryParam)
  return matchesCategory && matchesCountry
  })


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tours...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-red-600">GoSamyati</div>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">Home</Link>
            <Link href="/tours" className="text-red-600 font-medium">Tours</Link>
            <Link href="/blogs" className="text-gray-700 hover:text-red-600 font-medium">Blogs</Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium">Contact Us</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Tours</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing destinations and create unforgettable memories with our carefully curated tour packages.
          </p>
        </div>

        {error && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8">
            <p>Warning: {error}. Showing {tours === fallbackTours ? 'fallback' : 'API'} data.</p>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-red-600 hover:bg-red-700" : ""}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64 w-full">
                <Image 
                  src={tour.image} 
                  alt={tour.title} 
                  fill 
                  className="object-cover"
                  unoptimized // avoid errors with external URLs in Next.js without config
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-600 text-white">
                    {tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tour.title}</h3>

                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{tour.location}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{tour.groupSize}</span>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(tour.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {tour.rating} ({tour.reviews} reviews)
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Highlights:</h4>
                  <ul className="text-sm text-gray-600">
                    {tour.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-red-600">{tour.price}</span>
                    <span className="text-sm text-gray-600 ml-1">per person</span>
                  </div>
                  <TourRedirectButton
                    tourId={tour.id}
                    tourTitle={tour.title}
                    price={tour.price}
                    className="bg-red-600 hover:bg-red-700"
                    showIcon={true}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTours.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No tours found for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
