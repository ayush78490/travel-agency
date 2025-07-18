"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Phone, Mail } from "lucide-react"

export function BookingSidebar({ price }: { price: string }) {
  return (
    <div className="sticky top-4 space-y-4">
      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-bold text-red-600 mb-4 text-center">Quick Booking</h3>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-xl font-bold text-red-600">{price}</div>
            <div className="text-xs text-gray-600">per person</div>
          </div>

          <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-sm font-semibold">
            BOOK NOW
          </Button>

          <Link href="/contact">
            <Button
              variant="outline"
              className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent text-sm"
            >
              Send Enquiry
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-bold text-red-600 mb-4 text-center">Need Help?</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center">
            <Phone className="w-4 h-4 text-red-600 mr-3" />
            <span className="text-gray-700">+91 9876543210</span>
          </div>
          <div className="flex items-center">
            <Mail className="w-4 h-4 text-red-600 mr-3" />
            <span className="text-gray-700">holiday@gosam.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}