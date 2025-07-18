"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { TourRedirectButton } from "@/components/tour-redirect-button"
import { TourPackage } from "@/types/index"
import { slugify } from "@/utils/slugify"

export function TourPackagesSection({ 
  title, 
  packages,
  isLoading,
  error,
  fallbackPackages
}: {
  title: string,
  packages: TourPackage[],
  isLoading: boolean,
  error: string | null,
  fallbackPackages: TourPackage[]
}) {
  const renderPackageCards = () => {
    const packagesToShow = isLoading ? [] : (error || !packages?.length) ? fallbackPackages : packages;

    if (error || !packages?.length) {
      return fallbackPackages.map((pkg) => (
        <Card key={`fallback-${pkg.id}`} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48">
            <Image 
              src={pkg.image1 || "/images/default-tour.jpg"} 
              alt={pkg.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
          <CardContent className="p-4">
            {pkg.duration && (
              <Badge variant="outline" className="mb-2 text-xs">
                {pkg.duration}
              </Badge>
            )}
            <h3 className="font-bold text-red-600 mb-2 text-sm sm:text-base">
              {pkg.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{pkg.price}</p>
            <TourRedirectButton
            tourId={pkg.id}
            tourTitle={pkg.title}
            price={pkg.price}
            className="w-full bg-red-600 hover:bg-red-700"
            showIcon={true}
          />
          </CardContent>
        </Card>
      ));
    }

    return packagesToShow.map((pkg) => (
      <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <Image 
            src={pkg.image1 || "/images/default-tour.jpg"} 
            alt={pkg.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <CardContent className="p-4">
          {pkg.duration && (
            <Badge variant="outline" className="mb-2 text-xs">
              {pkg.duration}
            </Badge>
          )}
          <h3 className="font-bold text-red-600 mb-2 text-sm sm:text-base">
            {pkg.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">{pkg.price}</p>
          <TourRedirectButton
            tourId={pkg.id}
            tourSlug={slugify(pkg.title)} // Convert title to slug here
            tourTitle={pkg.title}
            price={pkg.price}
            className="w-full bg-red-600 hover:bg-red-700"
            showIcon={true}
          />
        </CardContent>
      </Card>
    ));
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
          <Link href="/tours" className="text-red-600 hover:underline flex items-center text-sm sm:text-base">
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderPackageCards()}
        </div>
      </div>
    </section>
  )
}