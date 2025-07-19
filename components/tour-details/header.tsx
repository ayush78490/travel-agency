"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          {/* Replace with your actual logo image */}
          <Image
            src="/images/logo.png" // Update this path to your logo image
            alt="GoSamyati Logo"
            width={120} // Adjust based on your logo dimensions
            height={40} // Adjust based on your logo dimensions
            className="h-10 w-auto ml-20" 
            style={{ transform: "scale(1.5)" }} 
          />
        </Link>

        <div className="flex items-center gap-4">
          <div className="relative w-64"> {/* Adjusted width for search box */}
            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full px-4 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
            />
          </div>
          
          {/* You can add other elements here like user icon, etc. */}
          {/* Example:
          <Button variant="outline" className="border-red-300 text-red-600">
            Sign In
          </Button>
          */}
        </div>
      </div>
    </header>
  )
}