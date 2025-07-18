"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { ItineraryDay } from "@/types/index"

export function Itinerary({ itinerary }: { itinerary: ItineraryDay[] }) {
  const [openDay, setOpenDay] = useState<string | null>("DAY 1")

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
  )
}