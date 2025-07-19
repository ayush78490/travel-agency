"use client"

import { useEffect, useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { fetchTourPackages } from "@/utils/api"
import { ItineraryDay, TourPackage } from "@/types/index"

interface ItineraryProps {
  tourId: string | number
}

export function Itinerary({ tourId }: ItineraryProps) {
  const [matchedTour, setMatchedTour] = useState<TourPackage | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [openDay, setOpenDay] = useState<string | null>("DAY 1")

  useEffect(() => {
    const loadItinerary = async () => {
      try {
        setLoading(true)
        setError(null)

        const packages = await fetchTourPackages()

        const matched = packages.find(pkg => String(pkg.id) === String(tourId))
        console.log("Matched tour package:", matched)

        if (!matched) {
          setError("Tour not found")
          return
        }

        setMatchedTour(matched)
      } catch (err) {
        console.error("Failed to fetch itinerary:", err)
        setError("Error loading itinerary")
      } finally {
        setLoading(false)
      }
    }

    loadItinerary()
  }, [tourId])

  if (loading) return <div className="text-gray-500 text-sm">Loading itinerary...</div>
  if (error) return <div className="text-red-500 text-sm">{error}</div>

  const itinerary = matchedTour?.itinerary ?? []

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-red-600 mb-3">ITINERARY</h2>
      <div className="space-y-1">
        {itinerary.length > 0 ? (
          itinerary.map((day) => (
            <Collapsible
              key={day.day}
              open={openDay === day.day}
              onOpenChange={(open) => setOpenDay(open ? day.day : null)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors">
                <span>
                  {day.day} : {day.title}
                </span>
                {openDay === day.day ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
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
  )
}
