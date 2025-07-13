"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Phone, Mail, MapPin, Bed, Car, Utensils, Star, Check } from "lucide-react"

export default function SereneAndamanRelaxPage() {
  const [openDay, setOpenDay] = useState<string | null>("DAY 5")
  const [openPolicy, setOpenPolicy] = useState<string | null>(null)
  const [showEnquiry, setShowEnquiry] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const tourDetails = {
    id: "serene-andaman-relax",
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
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      day: "DAY 2",
      title: "LOREM IPSUM UMMM LA TA",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      day: "DAY 3",
      title: "LOREM IPSUM UMMM LA TA",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      day: "DAY 4",
      title: "LOREM IPSUM UMMM LA TA",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      day: "DAY 5",
      title: "LOREM IPSUM UMMM LA TA",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }
  ]

  const highlights = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    "It has survived not only five centuries, but also the leap into electronic typesetting.",
    "It was popularised in the 1960s with the release of Letraset sheets containing.",
    "More recently with desktop publishing software like Aldus PageMaker."
  ]

  const packages = [
    {
      id: "london-package-1",
      title: "LONDON PACKAGE",
      duration: "5 Nights & 6 Days",
      price: "INR 40,000",
      image: "/images/london.jpeg?height=120&width=160",
    },
    {
      id: "london-package-2",
      title: "LONDON PACKAGE",
      duration: "5 Nights & 6 Days",
      price: "INR 40,000",
      image: "/images/london.jpeg?height=120&width=160",
    },
    {
      id: "london-package-3",
      title: "LONDON PACKAGE",
      duration: "5 Nights & 6 Days",
      price: "INR 40,000",
      image: "/images/london.jpeg?height=120&width=160",
    },
    {
      id: "london-package-4",
      title: "LONDON PACKAGE",
      duration: "5 Nights & 6 Days",
      price: "INR 40,000",
      image: "/images/london.jpeg?height=120&width=160",
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitError(null);

  try {
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      throw new Error('All fields are required');
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      throw new Error('Please enter a valid email address');
    }

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      }),
    });

    // Handle HTML responses (like when the API returns an error page)
    const contentType = response.headers.get('content-type');
    let result;
    
    if (contentType?.includes('application/json')) {
      result = await response.json();
    } else {
      const text = await response.text();
      throw new Error(text || 'Unexpected response from server');
    }

    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit enquiry');
    }

    setSubmitSuccess(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
    
    // Close the modal after 2 seconds
    setTimeout(() => {
      setShowEnquiry(false);
      setSubmitSuccess(false);
    }, 2000);

  } catch (error) {
    console.error("Error submitting enquiry:", error);
    setSubmitError(
      error instanceof Error ? 
      error.message.replace(/<\/?[^>]+(>|$)/g, "") : // Remove HTML tags if present
      'An unexpected error occurred'
    );
  } finally {
    setIsSubmitting(false);
  }
};

return (
  <div className="min-h-screen bg-white relative">
    {/* Enquiry Form Modal */}
    {showEnquiry && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Enquiry Form</h2>
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Enquiry Submitted</h3>
              <p className="text-sm text-gray-600">
                Thank you! We'll contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitEnquiry} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border rounded-md disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border rounded-md disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border rounded-md disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message*</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md disabled:opacity-50"
                ></textarea>
              </div>

              {submitError && (
                <div className="text-red-500 text-sm">
                  {submitError}
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : 'Submit'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowEnquiry(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    )}

      {/* Header */}
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

      {/* Hero Image Section */}
      <section className="relative h-48 md:h-64">
        <Image src="/images/serene-andaman.png" alt="Serene Andaman" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>

        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === 2 ? "bg-red-600" : "bg-white bg-opacity-60"}`} />
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tour Header */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <Badge className="bg-orange-100 text-orange-800 mb-2 text-xs">{tourDetails.duration}</Badge>
                  <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-2">{tourDetails.title}</h1>

                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({tourDetails.reviews} reviews)</span>
                  </div>

                  <p className="text-gray-700 leading-relaxed text-sm mb-4">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-sm font-semibold">
                      BOOK NOW
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-600 text-red-600 hover:bg-red-50 px-6 py-2 text-sm font-semibold bg-transparent"
                      onClick={() => setShowEnquiry(true)}
                    >
                      SEND AN ENQUIRY
                    </Button>
                  </div>

                  <div className="flex items-center text-red-600 text-sm">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="font-semibold">{tourDetails.price}</span>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 md:ml-6">
                  <div className="bg-gray-50 p-4 rounded-lg text-center min-w-[140px]">
                    <div className="text-xs text-gray-600 mb-1">Starts from</div>
                    <div className="text-xl font-bold text-red-600">{tourDetails.price}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Highlights */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-red-600 mb-3">TRIP HIGHLIGHTS</h2>
              <ul className="space-y-2">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Itinerary */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-red-600 mb-3">ITINERARY</h2>
              <div className="space-y-1">
                {itinerary.map((day) => (
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
                ))}
              </div>
            </div>

            {/* Inclusion/Exclusion */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-red-600 mb-3">INCLUSION</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Bed className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-red-600 font-medium">Hotel</span>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-red-600 font-medium">Sightseeing</span>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Car className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-red-600 font-medium">Transport</span>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Utensils className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-red-600 font-medium">Meals</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-red-600 mb-3">EXCLUSION</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Bed className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-red-600 font-medium">Hotel</span>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-red-600 font-medium">Sightseeing</span>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Car className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-red-600 font-medium">Transport</span>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Utensils className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-red-600 font-medium">Meals</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Know Before You Go */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-red-600 mb-3">KNOW BEFORE YOU GO</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </li>
              </ul>
            </div>

            {/* Related Packages */}
            <div className="mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="text-center">
                    <div className="relative h-20 mb-2 rounded overflow-hidden">
                      <Image src={pkg.image} alt={pkg.title} fill className="object-cover" />
                    </div>
                    <Badge variant="outline" className="text-xs mb-1 px-2 py-0.5">
                      {pkg.duration}
                    </Badge>
                    <h4 className="font-bold text-red-600 text-xs mb-1">{pkg.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{pkg.price}</p>
                    <Button className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 w-full h-7">
                      Book Now
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="space-y-3">
              <Collapsible
                open={openPolicy === "confirmation"}
                onOpenChange={(open) => setOpenPolicy(open ? "confirmation" : null)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white border rounded shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-sm font-semibold text-red-600">CONFIRMATION POLICY</h3>
                  {openPolicy === "confirmation" ? (
                    <ChevronUp className="w-4 h-4 text-red-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-red-600" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-3 bg-white border-t text-sm">
                  <p className="text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </p>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible
                open={openPolicy === "payment"}
                onOpenChange={(open) => setOpenPolicy(open ? "payment" : null)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white border rounded shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-sm font-semibold text-red-600">PAYMENT POLICY</h3>
                  {openPolicy === "payment" ? (
                    <ChevronUp className="w-4 h-4 text-red-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-red-600" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-3 bg-white border-t text-sm">
                  <p className="text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </p>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible
                open={openPolicy === "cancellation"}
                onOpenChange={(open) => setOpenPolicy(open ? "cancellation" : null)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white border rounded shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-sm font-semibold text-red-600">CANCELLATION POLICY</h3>
                  {openPolicy === "cancellation" ? (
                    <ChevronUp className="w-4 h-4 text-red-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-red-600" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-3 bg-white border-t text-sm">
                  <p className="text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {/* Quick Booking Card */}
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="text-sm font-bold text-red-600 mb-4 text-center">Quick Booking</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-red-600">{tourDetails.price}</div>
                    <div className="text-xs text-gray-600">per person</div>
                  </div>

                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-sm font-semibold">
                    BOOK NOW
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent text-sm"
                    onClick={() => setShowEnquiry(true)}
                  >
                    Send Enquiry
                  </Button>
                </div>
              </div>

              {/* Contact Card */}
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
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">ABOUT GOSAMYATI</h3>
              <ul className="space-y-1 text-xs">
                <li>About Us</li>
                <li>We are Hiring</li>
                <li>Gosamyati Review</li>
                <li>Terms and Conditions</li>
                <li>Privacy Policies</li>
                <li>Support</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">TRAVEL DESTINATION</h3>
              <div className="grid grid-cols-2 gap-1">
                <div className="relative h-12">
                  <Image src="/images/portlouis.jpeg" alt="Port Louis" fill className="rounded object-cover" />
                </div>
                <div className="relative h-12">
                  <Image
                    src="/images/mauritius-beach.jpeg"
                    alt="Mauritius Beach"
                    fill
                    className="rounded object-cover"
                  />
                </div>
                <div className="relative h-12">
                  <Image src="/images/mount-everest.webp" alt="Mount Everest" fill className="rounded object-cover" />
                </div>
                <div className="relative h-12">
                  <Image src="/images/heritage-hotel.webp" alt="Heritage Hotel" fill className="rounded object-cover" />
                </div>
              </div>
            </div>

            <div>
              <div className="mb-3">
                <h4 className="text-sm font-semibold mb-1">Call Us</h4>
                <p className="text-xs">+91 9940882200</p>
              </div>
              <div className="mb-3">
                <h4 className="text-sm font-semibold mb-1">Email Us</h4>
                <p className="text-xs">holiday@gosam.com</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">Follow Us</h4>
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-white bg-opacity-20 rounded"></div>
                  <div className="w-4 h-4 bg-white bg-opacity-20 rounded"></div>
                  <div className="w-4 h-4 bg-white bg-opacity-20 rounded"></div>
                  <div className="w-4 h-4 bg-white bg-opacity-20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}