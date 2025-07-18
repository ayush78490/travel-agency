// app/tour/[id]/[slug]/page.tsx

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/tour-details/header"
import { ImageSlider } from "@/components/tour-details/image-slider"
import { TourHighlights } from "@/components/tour-details/tour-highlights"
import { Itinerary } from "@/components/tour-details/itineary"
import { InclusionExclusion } from "@/components/tour-details/inclusion-exclusion"
import { RelatedPackages } from "@/components/tour-details/relatedPackeges"
import { PolicyAccordion } from "@/components/tour-details/Policy"
import { BookingSidebar } from "@/components/tour-details/booking-sidebar"
import { Footer } from "@/components/tour-details/footer"
import { TourRedirectButton } from "@/components/tour-redirect-button"
import { TourPackage } from "@/types/index"
import { fetchTourPackages } from "@/utils/api"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { slugify } from "@/utils/slugify"

export default function TourPackagePage({
  params,
}: {
  params: { id: string; slug: string }
}) {
  const router = useRouter()
  const [tourPackage, setTourPackage] = useState<TourPackage | null>(null)
  const [relatedPackages, setRelatedPackages] = useState<TourPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

useEffect(() => {
  let isMounted = true

  async function loadData() {
    try {
      const packages = await fetchTourPackages({ id: params.id })
      if (!isMounted) return

      if (!packages || packages.length === 0) {
        setError("Tour not found")
        return
      }

      const foundPackage = packages[0]
      const expectedSlug = slugify(foundPackage.title)

      // Check if slug matches
      if (params.slug !== expectedSlug) {
        // Update URL without reload if possible
        if (window.history.replaceState) {
          window.history.replaceState(null, '', `/tour/${params.id}/${expectedSlug}`)
        } else {
          router.replace(`/tour/${params.id}/${expectedSlug}`)
        }
        return
      }

      setTourPackage(foundPackage)
      
      // Load related packages
      const related = await fetchTourPackages({
        category: foundPackage.category,
        exclude: foundPackage.id,
        limit: 4
      })
      if (isMounted) setRelatedPackages(related)
      
    } catch (err) {
      if (isMounted) {
        setError("Failed to load tour details")
        console.error("Tour loading error:", err)
      }
    } finally {
      if (isMounted) setLoading(false)
    }
  }

  loadData()

  return () => {
    isMounted = false
  }
}, [params.id, params.slug])

  const images = tourPackage
    ? [
        tourPackage.image1,
        ...(tourPackage.image2 ? [tourPackage.image2] : []),
        ...(tourPackage.image3 ? [tourPackage.image3] : []),
        ...(tourPackage.image4 ? [tourPackage.image4] : []),
        ...(tourPackage.image5 ? [tourPackage.image5] : []),
      ].filter(Boolean)
    : []

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tour details...</p>
        </div>
      </div>
    )
  }

  if (error || !tourPackage) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Tour Package Not Found</h2>
          <p className="text-gray-600 mb-4">{error || "The requested tour package could not be loaded."}</p>
          <Link href="/tours" prefetch>
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
      <Header />

      <ImageSlider images={images} title={tourPackage.title} duration={duration} />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <TourHighlights
              title={tourPackage.title}
              duration={duration}
              price={tourPackage.price}
              rating={tourPackage.rating}
              review={tourPackage.review}
              highlights={tourPackage.highlights}
            />

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <TourRedirectButton
                tourId={params.id}
                tourSlug={slugify(tourPackage.title)}
                tourTitle={tourPackage.title}
                price={tourPackage.price}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-sm font-semibold"
              />
              <Link href="/contact" prefetch>
                <Button
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50 px-6 py-2 text-sm font-semibold bg-transparent"
                >
                  SEND AN ENQUIRY
                </Button>
              </Link>
            </div>

            <Itinerary itinerary={tourPackage.itinerary} />
            <InclusionExclusion />

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

            <RelatedPackages packages={relatedPackages} />
            <PolicyAccordion />
          </div>

          <div className="lg:col-span-1">
            <BookingSidebar price={tourPackage.price} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}