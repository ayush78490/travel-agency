"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Users } from "lucide-react"
import { TourRedirectButton } from "@/components/tour-redirect-button"

type Tour = {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  groupSize: string;
  highlights: string[];
}

export default function ToursPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [tours, setTours] = useState<Tour[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fallbackTours: Tour[] = [
    {
      id: 1,
      title: "Heritage Palace Tour",
      location: "Rajasthan, India",
      duration: "5 Days",
      price: "₹45,000",
      rating: 4.8,
      reviews: 124,
      image: "/images/heritage-hotel.webp",
      category: "heritage",
      groupSize: "2-15 people",
      highlights: ["Palace visits", "Cultural shows", "Local cuisine"],
    },
    {
      id: 2,
      title: "Mauritius Beach Paradise",
      location: "Mauritius",
      duration: "7 Days",
      price: "₹85,000",
      rating: 4.9,
      reviews: 89,
      image: "/images/mauritius-beach.jpeg",
      category: "beach",
      groupSize: "2-12 people",
      highlights: ["Beach resorts", "Water sports", "Island hopping"],
    },
    {
      id: 3,
      title: "Port Louis Cultural Experience",
      location: "Mauritius",
      duration: "3 Days",
      price: "₹35,000",
      rating: 4.7,
      reviews: 67,
      image: "/images/portlouis.jpeg",
      category: "culture",
      groupSize: "4-20 people",
      highlights: ["City tours", "Markets", "Museums"],
    },
    {
      id: 4,
      title: "Everest Base Camp Trek",
      location: "Nepal",
      duration: "14 Days",
      price: "₹125,000",
      rating: 4.9,
      reviews: 156,
      image: "/images/mount-everest.webp",
      category: "adventure",
      groupSize: "6-12 people",
      highlights: ["Mountain trekking", "Sherpa culture", "Scenic views"],
    },
  ]

  const categories = [
    { id: "all", name: "All Tours" },
    { id: "heritage", name: "Heritage" },
    { id: "beach", name: "Beach" },
    { id: "culture", name: "Culture" },
    { id: "adventure", name: "Adventure" },
  ]

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/tours')

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        console.log("API data:", data)

        const transformedTours: Tour[] = Array.isArray(data)
          ? data.map((item: any) => ({
              id: item.id || 0,
              title: item.title || 'Untitled Tour',
              location: item.country || 'Unknown Location',
              duration: `${item.days || 0} Days`,
              price: `₹${item.price || '0'}`,
              rating: 4.5,
              reviews: 0,
              image: item.image1
                ? `https://ecomlancers.com/travel_website/uploads/${item.image1}`
                : '/images/default-tour.jpg',
              category: item.category?.toLowerCase() || 'other',
              groupSize: '2-12 people',
              highlights: Array.isArray(item.highlights)
                ? item.highlights.filter((h: any) => !!h)
                : ['Experience local culture'],
            }))
          : []

        console.log("Transformed tours:", transformedTours)

        if (transformedTours.length === 0) {
          console.warn("No valid tours in API response. Using fallback.")
          setTours(fallbackTours)
        } else {
          setTours(transformedTours)
        }

      } catch (err) {
        console.error('Failed to fetch tours:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
        setTours(fallbackTours)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTours()
  }, [])

  const filteredTours = selectedCategory === "all"
    ? tours
    : tours.filter((tour) =>
        tour.category?.toLowerCase() === selectedCategory.toLowerCase()
      )

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
