"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="text-2xl font-bold text-red-600">GoSamyati</div>
        </Link>

        <div className="hidden md:flex flex-1 max-w-sm mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full px-4 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
            />
          </div>
        </div>

        <nav className="hidden md:flex space-x-6 text-sm">
          <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">
            Home
          </Link>
          <Link href="/tours" className="text-gray-700 hover:text-red-600 font-medium">
            Tours
          </Link>
          <Link href="/blogs" className="text-gray-700 hover:text-red-600 font-medium">
            Blogs
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium">
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  )
}