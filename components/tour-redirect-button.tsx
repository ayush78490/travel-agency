"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, ExternalLink } from "lucide-react"

interface TourRedirectButtonProps {
  tourId: string | number
  tourSlug?: string
  tourTitle: string
  price?: string
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  showIcon?: boolean
}

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
}

export function TourRedirectButton({
  tourId,
  tourSlug,
  tourTitle,
  price,
  className = "",
  variant = "default",
  size = "default",
  showIcon = true,
}: TourRedirectButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleTourRedirect = async () => {
    setIsLoading(true)
    try {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "tour_view_click", {
          tour_id: tourId,
          tour_title: tourTitle,
          price,
        })
      }

      const slug = tourSlug || generateSlug(tourTitle)
      router.push(`/tour/${tourId}/${slug}`)
    } catch (error) {
      console.error("Tour redirect error:", error)
      setIsLoading(false)
      window.location.href = `/tour/${tourId}/${tourSlug || generateSlug(tourTitle)}`
    }
  }

  return (
    <Button
      onClick={handleTourRedirect}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={className}

    >
      {isLoading ? (
        <div className="flex items-center">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex items-center">
          <span>Book Now</span>
          {showIcon && <ExternalLink className="w-4 h-4 ml-2" />}
        </div>
      )}
    </Button>
  )
}
