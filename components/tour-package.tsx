"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { TourRedirectButton } from "@/components/tour-redirect-button"
import { TourPackage } from "@/types/index"
import { slugify } from "@/utils/slugify"
import { useState } from "react"

interface TourPackagesSectionProps {
  title: string
  packages: TourPackage[]
  isLoading: boolean
  error: string | null
  fallbackPackages: TourPackage[]
}

export function TourPackagesSection({ 
  title, 
  packages,
  isLoading,
  error,
  fallbackPackages
}: TourPackagesSectionProps) {
  const [selectedTourId, setSelectedTourId] = useState<string | number | null>(null)

  const renderPackageCards = () => {
    if (isLoading) {
      return Array(4).fill(0).map((_, index) => (
        <Card key={`loading-${index}`} className="overflow-hidden animate-pulse bg-white rounded-lg shadow-sm">
          <div className="relative h-32 bg-gray-200" />
          <CardContent className="p-3">
            <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-full bg-gray-200 rounded mb-2" />
            <div className="h-3 w-20 bg-gray-200 rounded mb-3" />
            <div className="h-8 w-full bg-gray-200 rounded" />
          </CardContent>
        </Card>
      ))
    }

    const packagesToShow = (error || !packages?.length) ? fallbackPackages : packages
    
    return packagesToShow.map((pkg) => {
      if (!pkg.id || !pkg.title) {
        console.warn(`Skipping tour package with missing ID or title`, pkg)
        return null
      }
      return (
        <Card key={pkg.id} className="overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="relative h-32">
            <Image 
              src={pkg.image1 || "/images/default-tour.jpg"} 
              alt={pkg.title || "Tour package"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority={false}
            />
          </div>
          <CardContent className="p-3">
            {pkg.duration && (
              <div className="text-xs text-gray-500 mb-1">
                {pkg.duration}
              </div>
            )}
            <h3 className="font-bold text-red-600 mb-1 text-sm leading-tight line-clamp-2">
              {pkg.title}
            </h3>
            <p className="text-sm font-semibold text-gray-900 mb-3">
              {pkg.price || "Price not available"}
            </p>
            <TourRedirectButton
              tourId={pkg.id}
              tourTitle={pkg.title}
              variant="default"
              size="sm"
              className="mt-auto bg-red-600 hover:bg-red-700 text-white"
              showIcon={true}
              onTourSelect={setSelectedTourId}
            />
          </CardContent>
        </Card>
      )
    }).filter(Boolean)
  }

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {!isLoading && (
            <Link 
              href="/tours" 
              className="text-red-600 hover:underline flex items-center text-sm transition-colors"
              prefetch={false}
            >
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {renderPackageCards()}
        </div>
      </div>
    </section>
  )
}