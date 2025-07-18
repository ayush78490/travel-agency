"use client"

import { Bed, Car, MapPin, Utensils } from "lucide-react"

export function InclusionExclusion() {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold text-red-600 mb-3">INCLUSION</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Bed className="w-5 h-5 text-white" />, label: "Hotel" },
              { icon: <MapPin className="w-5 h-5 text-white" />, label: "Sightseeing" },
              { icon: <Car className="w-5 h-5 text-white" />, label: "Transport" },
              { icon: <Utensils className="w-5 h-5 text-white" />, label: "Meals" }
            ].map((item, index) => (
              <div key={`inclusion-${index}`} className="text-center">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  {item.icon}
                </div>
                <span className="text-xs text-red-600 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-red-600 mb-3">EXCLUSION</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Bed className="w-5 h-5 text-white" />, label: "Hotel" },
              { icon: <MapPin className="w-5 h-5 text-white" />, label: "Sightseeing" },
              { icon: <Car className="w-5 h-5 text-white" />, label: "Transport" },
              { icon: <Utensils className="w-5 h-5 text-white" />, label: "Meals" }
            ].map((item, index) => (
              <div key={`exclusion-${index}`} className="text-center">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  {item.icon}
                </div>
                <span className="text-xs text-red-600 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}