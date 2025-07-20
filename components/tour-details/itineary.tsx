"use client"

import { useEffect, useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { fetchTourPackages } from "@/utils/api"
import { TourPackage } from "@/types/index"

interface ItineraryProps {
  tourId: string | number
}

export function Itinerary({ tourId }: ItineraryProps) {
  const [matchedTour, setMatchedTour] = useState<TourPackage | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [openDay, setOpenDay] = useState<string | null>("DAY 1")

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        const packages = await fetchTourPackages()

        const matchedRaw = packages.find(pkg => String(pkg.id) === String(tourId))

        if (!matchedRaw) {
          setError("Tour not found")
          return
        }

        // ✅ Remap and clean highlights
        const matched: TourPackage = {
          ...matchedRaw,
          itinerary: matchedRaw.itinerary || [], // 🔁 Map 'itinerary' to 'itinerary'
          highlights: Array.isArray(matchedRaw.highlights)
            ? matchedRaw.highlights.filter((hl) => hl && hl.trim() !== "")
            : [],
        }
        console.log("Matched tour itinerary:", matched.itinerary) // Debug log
        setMatchedTour(matched)
      } catch (err) {
        console.error("Failed to fetch data:", err)
        setError("Error loading itinerary")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [tourId])

  if (loading) return <div className="text-gray-500 text-sm">Loading itinerary...</div>
  if (error) return <div className="text-red-500 text-sm">{error}</div>

  const itinerary = matchedTour?.itinerary ?? []
  const highlights = matchedTour?.highlights ?? []

  return (
    <>
      {/* Highlights Section */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-red-600 mb-3">HIGHLIGHTS</h2>
        {highlights.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm pl-4">
            {highlights.map((point, index) => (
              <li key={`highlight-${index}`}>{point}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-sm p-3">No highlights available for this tour.</p>
        )}
      </div>

      {/* Itinerary Section */}
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
                    {day.day} : {day.location}
                  </span>
                  {openDay === day.day ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-3 bg-gray-50 border border-t-0 text-sm">
                  <p className="text-gray-700 leading-relaxed">
                    {day.itinerary_details || "No details available."}
                  </p>
                </CollapsibleContent>
              </Collapsible>
            ))
          ) : (
            <p className="text-gray-600 text-sm p-3">No itinerary details available for this tour.</p>
          )}
        </div>
      </div>
    </>
  )
}
