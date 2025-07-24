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
        <Card key={`loading-${index}`} className="overflow-hidden animate-pulse">
          <div className="relative h-48 bg-gray-200" />
          <CardContent className="p-4">
            <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
            <div className="h-5 w-full bg-gray-200 rounded mb-2" />
            <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
            <div className="h-10 w-full bg-gray-200 rounded" />
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
        <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
          <div className="relative h-48">
            <Image 
              src={pkg.image1 || "/images/default-tour.jpg"} 
              alt={pkg.title || "Tour package"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority={false}
            />
          </div>
          <CardContent className="p-4 flex flex-col h-[calc(100%-12rem)]">
            <div className="flex-grow">
              {pkg.duration && (
                <Badge variant="outline" className="mb-2 text-xs">
                  {pkg.duration}
                </Badge>
              )}
              <h3 className="font-bold text-red-600 mb-2 text-sm sm:text-base line-clamp-2">
                {pkg.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {pkg.price || "Price not available"}
              </p>
            </div>
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
    <section className="py-12 sm:py-16 bg-gray-50 w-[80vw] mx-auto">
      <div className="px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
          {!isLoading && (
            <Link 
              href="/tours" 
              className="text-red-600 hover:underline flex items-center text-sm sm:text-base transition-colors"
              prefetch={false}
            >
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderPackageCards()}
        </div>
      </div>
    </section>
  )
}