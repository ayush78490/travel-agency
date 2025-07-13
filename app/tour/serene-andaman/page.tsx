"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Phone, Mail, MapPin, Bed, Car, Utensils, Camera } from "lucide-react"
import { EnhancedBookButton } from "@/components/enhanced-book-button"

export default function SereneAndamanPage() {
  const [openDay, setOpenDay] = useState<string | null>(null)
  const [openPolicy, setOpenPolicy] = useState<string | null>(null)

  const tourDetails = {
    id: "serene-andaman",
    title: "SERENE ANDAMAN || RELAX YOURSELF",
    location: "Andaman & Nicobar Islands",
    duration: "5 Days & 4 Nights",
    price: "INR 35,000",
    rating: 4.8,
    reviews: 156,
    image: "/images/serene-andaman.png",
    category: "Beach Paradise",
  }

  const itinerary = [
    {
      day: "DAY 1",
      title: "LOREM IPSUM UMMM LA TA",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      day: "DAY 2",
      title: "LOREM IPSUM UMMM LA TA",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      day: "DAY 3",
      title: "LOREM IPSUM UMMM LA TA",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      day: "DAY 4",
      title: "LOREM IPSUM UMMM LA TA",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      day: "DAY 5",
      title: "LOREM IPSUM UMMM LA TA",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ]

  const highlights = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    "It was popularised in the 1960s with the release of Letraset sheets containing.",
    "It was popularised in the 1960s with the release of Letraset sheets containing.",
  ]

  const packages = [
    {
      id: "london-1",
      title: "LONDON PACKAGE",
      duration: "5 Nights & 6 Days",
      price: "INR 40,000",
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      id: "london-2",
      title: "LONDON PACKAGE",
      duration: "5 Nights & 6 Days",
      price: "INR 40,000",
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      id: "london-3",
      title: "LONDON PACKAGE",
      duration: "5 Nights & 6 Days",
      price: "INR 40,000",
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      id: "london-4",
      title: "LONDON PACKAGE",
      duration: "5 Nights & 6 Days",
      price: "INR 40,000",
      image: "/placeholder.svg?height=150&width=200",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-red-600">GoSamyati</div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full px-4 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <nav className="hidden md:flex space-x-6">
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

      {/* Hero Image Section */}
      <section className="relative h-64 md:h-80">
        <Image src="/images/serene-andaman.png" alt="Serene Andaman" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        {/* Carousel Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === 2 ? "bg-red-600" : "bg-white bg-opacity-50"}`} />
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tour Header */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <Badge className="bg-orange-100 text-orange-800 mb-2">{tourDetails.duration}</Badge>
                  <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-2">{tourDetails.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{tourDetails.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Starts from</div>
                  <div className="text-2xl font-bold text-red-600">{tourDetails.price}</div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
                five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets containing.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <EnhancedBookButton
                  tourId={tourDetails.id}
                  tourTitle={tourDetails.title}
                  price={tourDetails.price}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 flex-1"
                  showIcon={true}
                />
                <Button
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-3 flex-1 bg-transparent"
                >
                  SEND A ENQUIRY
                </Button>
              </div>

              {/* Contact Info */}
              <div className="flex items-center justify-center mt-4 text-red-600">
                <Phone className="w-4 h-4 mr-2" />
                <span className="font-semibold">9876543210</span>
              </div>
            </div>

            {/* Trip Highlights */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-bold text-red-600 mb-4">TRIP HIGHLIGHTS</h2>
              <ul className="space-y-3">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-bold text-red-600 mb-4">ITINERARY</h2>
              <div className="space-y-2">
                {itinerary.map((day, index) => (
                  <Collapsible
                    key={day.day}
                    open={openDay === day.day}
                    onOpenChange={(open) => setOpenDay(open ? day.day : null)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                      <span className="font-semibold">
                        {day.day} : {day.title}
                      </span>
                      {openDay === day.day ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 bg-gray-50 border border-t-0 rounded-b-md">
                      <p className="text-gray-700">{day.content}</p>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>

            {/* Inclusion/Exclusion */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inclusion */}
                <div>
                  <h3 className="text-lg font-bold text-red-600 mb-4">INCLUSION</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Bed className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-red-600 font-medium">Hotel</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-red-600 font-medium">Sightseeing</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Car className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-red-600 font-medium">Transport</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Utensils className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-red-600 font-medium">Meals</span>
                    </div>
                  </div>
                </div>

                {/* Exclusion */}
                <div>
                  <h3 className="text-lg font-bold text-red-600 mb-4">EXCLUSION</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Bed className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-red-600 font-medium">Hotel</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-red-600 font-medium">Sightseeing</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Car className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-red-600 font-medium">Transport</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Utensils className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-red-600 font-medium">Meals</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Know Before You Go */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <h3 className="text-lg font-bold text-red-600 mb-4">KNOW BEFORE YOU GO</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                  took a galley of type and scrambled.
                </li>
              </ul>
            </div>

            {/* Related Packages */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="text-center">
                    <div className="relative h-24 mb-2 rounded-lg overflow-hidden">
                      <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
                    </div>
                    <Badge variant="outline" className="text-xs mb-1">
                      {pkg.duration}
                    </Badge>
                    <h4 className="font-bold text-red-600 text-sm mb-1">{pkg.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{pkg.price}</p>
                    <EnhancedBookButton
                      tourId={pkg.id}
                      tourTitle={pkg.title}
                      price={pkg.price}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-1 w-full"
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="space-y-4">
              <Collapsible
                open={openPolicy === "confirmation"}
                onOpenChange={(open) => setOpenPolicy(open ? "confirmation" : null)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-red-600">CONFIRMATION POLICY</h3>
                  {openPolicy === "confirmation" ? (
                    <ChevronUp className="w-5 h-5 text-red-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-red-600" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 bg-white border-t">
                  <p className="text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.
                  </p>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible
                open={openPolicy === "payment"}
                onOpenChange={(open) => setOpenPolicy(open ? "payment" : null)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-red-600">PAYMENT POLICY</h3>
                  {openPolicy === "payment" ? (
                    <ChevronUp className="w-5 h-5 text-red-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-red-600" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 bg-white border-t">
                  <p className="text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.
                  </p>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible
                open={openPolicy === "cancellation"}
                onOpenChange={(open) => setOpenPolicy(open ? "cancellation" : null)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-red-600">CANCELLATION POLICY</h3>
                  {openPolicy === "cancellation" ? (
                    <ChevronUp className="w-5 h-5 text-red-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-red-600" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 bg-white border-t">
                  <p className="text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Quick Booking Card */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-red-600 mb-4">Quick Booking</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{tourDetails.price}</div>
                    <div className="text-sm text-gray-600">per person</div>
                  </div>

                  <EnhancedBookButton
                    tourId={tourDetails.id}
                    tourTitle={tourDetails.title}
                    price={tourDetails.price}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                    showIcon={true}
                  />

                  <Button
                    variant="outline"
                    className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    Send Enquiry
                  </Button>
                </div>
              </Card>

              {/* Contact Card */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-red-600 mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-red-600 mr-3" />
                    <span className="text-gray-700">+91 9876543210</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-red-600 mr-3" />
                    <span className="text-gray-700">holiday@gosam.com</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ABOUT GOSAMYATI</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    We are Hiring
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Gosamyati Review
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Privacy Policies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">TRAVEL DESTINATION</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative h-16">
                  <Image src="/images/portlouis.jpeg" alt="Port Louis" fill className="rounded object-cover" />
                </div>
                <div className="relative h-16">
                  <Image
                    src="/images/mauritius-beach.jpeg"
                    alt="Mauritius Beach"
                    fill
                    className="rounded object-cover"
                  />
                </div>
                <div className="relative h-16">
                  <Image src="/images/mount-everest.webp" alt="Mount Everest" fill className="rounded object-cover" />
                </div>
                <div className="relative h-16">
                  <Image src="/images/heritage-hotel.webp" alt="Heritage Hotel" fill className="rounded object-cover" />
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Call Us</h4>
                <p className="text-sm">+91 9940882200</p>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Email Us</h4>
                <p className="text-sm">holiday@gosam.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Follow Us</h4>
                <div className="flex space-x-3">
                  <div className="w-5 h-5 bg-white bg-opacity-20 rounded"></div>
                  <div className="w-5 h-5 bg-white bg-opacity-20 rounded"></div>
                  <div className="w-5 h-5 bg-white bg-opacity-20 rounded"></div>
                  <div className="w-5 h-5 bg-white bg-opacity-20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
