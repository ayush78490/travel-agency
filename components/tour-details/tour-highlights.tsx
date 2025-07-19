"use client"

import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { fetchTourPackages } from "@/utils/api"
import type { TourPackage } from "@/types/index"

interface TourHighlightsProps {
  title: string | null,
  duration: string | null,
  price: string | null,
  rating: number | null,
  review: number | null,
  highlights: string[] | null
}

export function TourHighlights({ 
  title, 
  duration, 
  price, 
  rating, 
  review, 
  highlights 
}: {  
  title: string,
  duration: string,
  price: string,
  rating: number,
  review: number,
  highlights: string[]
}) {



  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
        <div className="flex-1">
          <Badge className="bg-orange-100 text-orange-800 mb-2 text-xs">{duration}</Badge>
          <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-2">{title}</h1>

          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} 
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">({review} reviews)</span>
          </div>

          <p className="text-gray-700 leading-relaxed text-sm mb-4 border border-red-500 p-4 rounded-lg">
            {highlights?.join(" ") || "Explore this amazing destination with our expertly crafted tour package."}
          </p>
        </div>

        <div className="mt-4 md:mt-0 md:ml-6">
          <div className="bg-gray-50 p-4 rounded-lg text-center min-w-[140px]">
            <div className="text-xs text-gray-600 mb-1">Starts from</div>
            <div className="text-xl font-bold text-red-600">{price}</div>
          </div>
        </div>
      </div>
    </div>
  )
}