"use client"

import { useState, useEffect } from "react"
import Image, {StaticImageData} from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Phone, Mail, MapPin, Bed, Car, Utensils, Star } from "lucide-react"
import { TourPackage } from "@/types"

async function fetchTourPackages(params = {}): Promise<TourPackage[]> {
  try {
    const queryString = new URLSearchParams(params).toString()
    const url = `/api/tours?${queryString}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }
    
    const responseData = await response.json()
    
    const packageData = Array.isArray(responseData) 
      ? responseData 
      : responseData?.data || []
    
    if (!Array.isArray(packageData)) {
      console.warn('Unexpected API response format:', responseData)
      return []
    }
    
    return packageData.map(item => ({
      id: ensureNumber(item.id, 0),
      title: ensureString(item.title, 'Untitled Tour'),
      days: ensureString(item.days, '0'),
      nights: ensureString(item.nights, '0'),
      price: formatPrice(item.price),
      image1: processMainImageUrl(item.image1),
      image2: processOptionalImageUrl(item.image2),
      image3: processOptionalImageUrl(item.image3),
      image4: processOptionalImageUrl(item.image4),
      image5: processOptionalImageUrl(item.image5),
      category: ensureString(item.category, 'Other'),
      country: optionalString(item.country),
      destination: optionalString(item.destination),
      highlights: processHighlights(item.highlights),
      rating: clampNumber(ensureNumber(item.rating, 4.0), 0, 5),
      review: ensureNumber(item.review, 0),
      groupSize: ensureNumber(item.groupSize, 1),
      itinerary: item.iternary ? item.iternary.map((day: any) => ({
        day: ensureString(day.day, 'DAY 1'),
        title: ensureString(day.location, 'Untitled Location'),
        content: ensureString(day.iternary_detail, 'No details available')
      })) : []
    }))
  } catch (error) {
    console.error('Error fetching tour packages:', error)
    return []
  }
}

function processMainImageUrl(imageUrl: unknown): string {
  if (!imageUrl || String(imageUrl).trim() === '') {
    return '/images/default-tour.jpg';
  }
  const urlString = String(imageUrl);
  return urlString.startsWith('http') 
    ? urlString
    : `https://ecomlancers.com/travel_website/uploads/${encodeURIComponent(urlString)}`;
}

function processOptionalImageUrl(imageUrl: unknown): string | undefined {
  if (!imageUrl) return undefined
  const urlString = String(imageUrl)
  return urlString.startsWith('http') 
    ? urlString
    : `https://ecomlancers.com/travel_website/uploads/${encodeURIComponent(urlString)}`
}

function ensureNumber(value: unknown, defaultValue: number): number {
  const num = Number(value)
  return isNaN(num) ? defaultValue : num
}

function ensureString(value: unknown, defaultValue: string): string {
  return value !== undefined && value !== null 
    ? String(value) 
    : defaultValue
}

function optionalString(value: unknown): string | undefined {
  return value !== undefined && value !== null 
    ? String(value) 
    : undefined
}

function formatPrice(price: unknown): string {
  if (!price) return 'Price on request'
  const numericValue = String(price).replace(/[^0-9.]/g, '')
  return `₹${numericValue}`
}

function processHighlights(highlights: unknown): string[] {
  if (!Array.isArray(highlights)) {
    return ['Experience local culture']
  }
  return highlights
    .filter(item => item !== undefined && item !== null)
    .map(String)
}

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}



export default function TourPackagePage({ params }: { params: { id: string } }) {
  const [openDay, setOpenDay] = useState<string | null>("DAY 1")
  const [openPolicy, setOpenPolicy] = useState<string | null>(null)
  const [tourPackage, setTourPackage] = useState<TourPackage | null>(null)
  const [relatedPackages, setRelatedPackages] = useState<TourPackage[]>([])
  const [loading, setLoading] = useState(true)

  const [currentSlide, setCurrentSlide] = useState(0);

const images: string[] = tourPackage ? [
  tourPackage.image1,
  ...(tourPackage.image2 ? [tourPackage.image2] : []),
  ...(tourPackage.image3 ? [tourPackage.image3] : []),
  ...(tourPackage.image4 ? [tourPackage.image4] : []),
  ...(tourPackage.image5 ? [tourPackage.image5] : [])
].filter(Boolean) : [];

  // Handle image slide show at header
  useEffect(() => {
  setCurrentSlide(0); // Reset to first slide when package changes
  
  if (images.length > 1) {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }
}, [tourPackage?.id, images.length]);

  useEffect(() => {
    async function loadData() {
      try {
        const packages = await fetchTourPackages({ id: params.id })
        console.log('Fetched package data:', packages[0]?.itinerary);
        if (packages.length > 0) {
          setTourPackage(packages[0])
          const related = await fetchTourPackages({ 
            category: packages[0].category,
            exclude: packages[0].id
          })
          setRelatedPackages(related.slice(0, 4))
        }
      } catch (error) {
        console.error("Failed to load tour packages:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!tourPackage) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Tour Package Not Found</h2>
          <p className="text-gray-600 mb-4">The requested tour package could not be loaded.</p>
          <Link href="/tours">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Browse All Tours
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const duration = `${tourPackage.days} Days & ${tourPackage.nights} Nights`


  return (
    <div className="min-h-screen bg-white relative">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-red-600">GoSamyati</div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full px-4 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
              />
            </div>
          </div>

          <nav className="hidden md:flex space-x-6 text-sm">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">
              Home
            </Link>
            <Link href="/tours" className="text-gray-700 hover:text-red-600 font-medium">
              Tours
            </Link>
            <Link href="/blogs" className="text-gray-700 hover:text-red-600 font-medium">
              Blogs
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium">
              Contact Us
            </Link>
          </nav>
        </div>
      </header>

<section className="relative h-64 md:h-96 w-full">
  {!tourPackage || images.length === 0 ? (
    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
      <span className="text-gray-500">No images available</span>
    </div>
  ) : (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      {/* Slides container */}
      <div className="relative h-full w-full">
        {images.map((img, index) => (
          <div
            key={`${tourPackage.id}-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={img || '/images/default-tour.jpg'}
              alt={`${tourPackage.title} image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              quality={85}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                // target.src = '/images/default-tour.jpg';
              }}
            />
          </div>
        ))}
      </div>

      {/* Rest of your slider code (gradient overlay, title, navigation controls) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

      {tourPackage && (
        <div className="absolute bottom-6 left-6 z-20 text-white">
          <h1 className="text-2xl md:text-3xl font-bold drop-shadow-lg">
            {tourPackage.title || 'Untitled Tour'}
          </h1>
          <p className="text-lg md:text-xl font-medium drop-shadow-md">
            {duration || 'Duration not specified'}
          </p>
        </div>
      )}

      {images.length > 1 && (
        <>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {images.map((_, index) => (
              <button
                key={`dot-${tourPackage.id}-${index}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(index);
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
              e.stopPropagation();
              setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20 transition-colors duration-300"
            aria-label="Previous image"
          >
            <ChevronDown className="rotate-90 w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide((prev) => (prev + 1) % images.length);
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

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <Badge className="bg-orange-100 text-orange-800 mb-2 text-xs">{duration}</Badge>
                  <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-2">{tourPackage.title}</h1>

                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(tourPackage.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({tourPackage.review} reviews)</span>
                  </div>

                    <p className="text-gray-700 leading-relaxed text-sm mb-4 border border-red-500 p-4 rounded-lg">
                      {tourPackage.highlights?.join(" ") || "Explore this amazing destination with our expertly crafted tour package."}
                    </p>


                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-sm font-semibold">
                      BOOK NOW
                    </Button>
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        className="border-red-600 text-red-600 hover:bg-red-50 px-6 py-2 text-sm font-semibold bg-transparent"
                      >
                        SEND AN ENQUIRY
                      </Button>
                    </Link>
                  </div>

                  <div className="flex items-center text-red-600 text-sm">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="font-semibold">{tourPackage.price}</span>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 md:ml-6">
                  <div className="bg-gray-50 p-4 rounded-lg text-center min-w-[140px]">
                    <div className="text-xs text-gray-600 mb-1">Starts from</div>
                    <div className="text-xl font-bold text-red-600">{tourPackage.price}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-bold text-red-600 mb-3">TRIP HIGHLIGHTS</h2>
              <ul className="space-y-2">
                {tourPackage.highlights?.map((highlight, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
            <h2 className="text-lg font-bold text-red-600 mb-3">ITINERARY</h2>
            <div className="space-y-1">
              {tourPackage.itinerary.length > 0 ? (
                tourPackage.itinerary.map((day) => (
                  <Collapsible
                    key={day.day}
                    open={openDay === day.day}
                    onOpenChange={(open) => setOpenDay(open ? day.day : null)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors">
                      <span>
                        {day.day} : {day.title}
                      </span>
                      {openDay === day.day ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-3 bg-gray-50 border border-t-0 text-sm">
                      <p className="text-gray-700 leading-relaxed">{day.content}</p>
                    </CollapsibleContent>
                  </Collapsible>
                ))
              ) : (
                <p className="text-gray-600 text-sm p-3">No itinerary details available for this tour.</p>
              )}
            </div>
          </div>

            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-red-600 mb-3">INCLUSION</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Bed className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-red-600 font-medium">Hotel</span>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-red-600 font-medium">Sightseeing</span>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Car className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-red-600 font-medium">Transport</span>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Utensils className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-red-600 font-medium">Meals</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-red-600 mb-3">EXCLUSION</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Bed className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-red-600 font-medium">Hotel</span>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-red-600 font-medium">Sightseeing</span>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Car className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-red-600 font-medium">Transport</span>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Utensils className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-red-600 font-medium">Meals</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-red-600 mb-3">KNOW BEFORE YOU GO</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Check visa requirements well in advance of your travel date.
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Local currency is recommended for small purchases and tips.
                </li>
              </ul>
            </div>

            {relatedPackages.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-red-600 mb-3">RELATED PACKAGES</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {relatedPackages.map((pkg) => (
                    <div key={pkg.id} className="text-center">
                      <div className="relative h-20 mb-2 rounded overflow-hidden">
                        <Image 
                          src={pkg.image1} 
                          alt={pkg.title} 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      <Badge variant="outline" className="text-xs mb-1 px-2 py-0.5">
                        {pkg.days} Days & {pkg.nights} Nights
                      </Badge>
                      <h4 className="font-bold text-red-600 text-xs mb-1">{pkg.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{pkg.price}</p>
                      <Link href={`/tours/${pkg.id}`}>
                        <Button className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 w-full h-7">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Collapsible
                open={openPolicy === "confirmation"}
                onOpenChange={(open) => setOpenPolicy(open ? "confirmation" : null)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white border rounded shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-sm font-semibold text-red-600">CONFIRMATION POLICY</h3>
                  {openPolicy === "confirmation" ? (
                    <ChevronUp className="w-4 h-4 text-red-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-red-600" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-3 bg-white border-t text-sm">
                  <p className="text-gray-600">
                    Your booking will be confirmed within 24 hours of receiving payment. A confirmation email with all details will be sent to you.
                  </p>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible
                open={openPolicy === "payment"}
                onOpenChange={(open) => setOpenPolicy(open ? "payment" : null)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white border rounded shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-sm font-semibold text-red-600">PAYMENT POLICY</h3>
                  {openPolicy === "payment" ? (
                    <ChevronUp className="w-4 h-4 text-red-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-red-600" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-3 bg-white border-t text-sm">
                  <p className="text-gray-600">
                    A 30% deposit is required at the time of booking. The remaining balance must be paid 30 days before departure.
                  </p>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible
                open={openPolicy === "cancellation"}
                onOpenChange={(open) => setOpenPolicy(open ? "cancellation" : null)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white border rounded shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-sm font-semibold text-red-600">CANCELLATION POLICY</h3>
                  {openPolicy === "cancellation" ? (
                    <ChevronUp className="w-4 h-4 text-red-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-red-600" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-3 bg-white border-t text-sm">
                  <p className="text-gray-600">
                    Cancellations made 60+ days before departure: full refund. 30-60 days: 50% refund. Less than 30 days: no refund.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="text-sm font-bold text-red-600 mb-4 text-center">Quick Booking</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-red-600">{tourPackage.price}</div>
                    <div className="text-xs text-gray-600">per person</div>
                  </div>

                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-sm font-semibold">
                    BOOK NOW
                  </Button>

                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent text-sm"
                    >
                      Send Enquiry
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="text-sm font-bold text-red-600 mb-4 text-center">Need Help?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-red-600 mr-3" />
                    <span className="text-gray-700">+91 9876543210</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-red-600 mr-3" />
                    <span className="text-gray-700">holiday@gosam.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-red-600 text-white py-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">ABOUT GOSAMYATI</h3>
              <ul className="space-y-1 text-xs">
                <li>
                  <Link href="/about-us" className="hover:underline">
                    About US
                  </Link>
                </li>
                <li>We are Hiring</li>
                <li>Gosamyati Review</li>
                <li>Terms and Conditions</li>
                <li>Privacy Policies</li>
                <li>Support</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">TRAVEL DESTINATION</h3>
              <div className="grid grid-cols-2 gap-1">
                <div className="relative h-12">
                  <Image src="/images/portlouis.jpeg" alt="Port Louis" fill className="rounded object-cover" />
                </div>
                <div className="relative h-12">
                  <Image
                    src="/images/mauritius-beach.jpeg"
                    alt="Mauritius Beach"
                    fill
                    className="rounded object-cover"
                  />
                </div>
                <div className="relative h-12">
                  <Image src="/images/mount-everest.webp" alt="Mount Everest" fill className="rounded object-cover" />
                </div>
                <div className="relative h-12">
                  <Image src="/images/heritage-hotel.webp" alt="Heritage Hotel" fill className="rounded object-cover" />
                </div>
              </div>
            </div>

            <div>
              <div className="mb-3">
                <h4 className="text-sm font-semibold mb-1">Call Us</h4>
                <p className="text-xs">+91 9940882200</p>
              </div>
              <div className="mb-3">
                <h4 className="text-sm font-semibold mb-1">Email Us</h4>
                <p className="text-xs">holiday@gosam.com</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">Follow Us</h4>
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-white bg-opacity-20 rounded"></div>
                  <div className="w-4 h-4 bg-white bg-opacity-20 rounded"></div>
                  <div className="w-4 h-4 bg-white bg-opacity-20 rounded"></div>
                  <div className="w-4 h-4 bg-white bg-opacity-20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}