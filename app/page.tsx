"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Menu,
  X,
} from "lucide-react"
import { TourRedirectButton } from "@/components/tour-redirect-button"
import { fetchTourPackages } from "@/utils/api"

type TourPackage = {
  id: number;
  image1: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  duration: string;
  title: string;
  price: string;
  destination?: string;
};

type Testimonial = {
  name: string;
  location: string;
  text: string;
  rating?: number;
  image?: string;
};

  const fallbackTestimonials = [
  {
    name: "John Smith",
    location: "Tourist",
    rating: 5,
    text: "I had an amazing experience with this company. The service was top-notch, and the staff was incredibly friendly. I highly recommend them!",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Sarah Johnson",
    location: "Traveler",
    rating: 5,
    text: "Excellent service and great value for money. The tour was well organized and exceeded my expectations.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Mike Wilson",
    location: "Explorer",
    rating: 5,
    text: "Professional team with great attention to detail. Will definitely book with them again!",
    image: "/placeholder.svg?height=60&width=60",
  },
];

export default function GoSamyatiTravel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const [openPolicy, setOpenPolicy] = useState<string | null>(null)
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [packages, setPackages] = useState<TourPackage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const heroSlides = [
    {
      image: "/images/heritage-hotel.webp",
      categories: [
        { name: "Heritage", image: "/images/hero-screenshot.png" },
        { name: "Culture", image: "/images/mauritius-beach.jpeg" },
      ],
    },
    {
      image: "/images/mauritius-beach.jpeg",
      categories: [
        { name: "Beach", image: "/images/mauritius-beach.jpeg" },
        { name: "Cities", image: "/images/portlouis.jpeg" },
      ],
    },
  ]




  const fallbackPackages = [
    {
      id: 1,
      image1: "/images/london.jpeg",
      duration: "5 Nights & 6 Days",
      title: "LONDON PACKAGE",
      price: "INR 40,000",
      destination: "London",
    },
    {
      id: 2,
      image1: "/images/peris.jpeg",
      duration: "7 Nights & 8 Days",
      title: "PARIS PACKAGE",
      price: "INR 55,000",
      destination: "Paris",
    },
    {
      id: 3,
      image1: "/images/dubai.jpeg",
      duration: "4 Nights & 5 Days",
      title: "DUBAI PACKAGE",
      price: "INR 35,000",
      destination: "Dubai",
    },
    {
      id: 4,
      image1: "/images/singapore.jpeg",
      duration: "6 Nights & 7 Days",
      title: "SINGAPORE PACKAGE",
      price: "INR 45,000",
      destination: "Singapore",
    },
  ]

  type TourPackage = {
  id: number;
  image1: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  duration: string;
  title: string;
  price: string;
  destination?: string;
};

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await fetchTourPackages({
          limit: 8,
          category: 'International'
        });
        
        // Ensure data is always an array
        const packageData = Array.isArray(data) ? data : [];
        setPackages(packageData);
        
        if (packageData.length === 0) {
          setError('No tour packages found');
        }
      } catch (err) {
        console.error('Failed to fetch packages:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setPackages([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPackages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  useEffect(() => {
  const loadTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const result = await res.json();
      setTestimonials(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
    }
  };

    loadTestimonials();
  }, []);



  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const renderPackageCards = (packageList: TourPackage[]) => {
    if (isLoading) {
      return (
        <div className="col-span-full text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading packages...</p>
        </div>
      )
    }

    if (error || !packageList?.length) {
      return fallbackPackages.map((pkg) => (
        <Card key={`fallback-${pkg.id}`} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48">
            <Image 
              src={pkg.image1 || "/images/default-tour.jpg"} 
              alt={pkg.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
          <CardContent className="p-4">
            {pkg.duration && (
              <Badge variant="outline" className="mb-2 text-xs">
                {pkg.duration}
              </Badge>
            )}
            <h3 className="font-bold text-red-600 mb-2 text-sm sm:text-base">
              {pkg.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{pkg.price}</p>
            <TourRedirectButton
              tourId={pkg.id}
              tourTitle={pkg.title}
              price={pkg.price}
              className="w-full bg-red-600 hover:bg-red-700"
              showIcon={true}
            />
          </CardContent>
        </Card>
      ));
    }

    return packageList.map((pkg: TourPackage) => (
      <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <Image 
            src={pkg.image1 || "/images/default-tour.jpg"} 
            alt={pkg.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <CardContent className="p-4">
          <Badge variant="outline" className="mb-2 text-xs">
            {pkg.duration}
          </Badge>
          <h3 className="font-bold text-red-600 mb-2 text-sm sm:text-base">{pkg.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{pkg.price}</p>
          <TourRedirectButton
            tourId={pkg.id}
            tourTitle={pkg.title}
            price={pkg.price}
            className="w-full bg-red-600 hover:bg-red-700"
            showIcon={true}
          />
        </CardContent>
      </Card>
    ))
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm relative z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-red-600">GoSamyati</div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/tours" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Tours
            </Link>
            <Link href="/blogs" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Blogs
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Contact Us
            </Link>
          </nav>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <Link href="/" className="block text-gray-700 hover:text-red-600 font-medium">
                Home
              </Link>
              <Link href="/tours" className="block text-gray-700 hover:text-red-600 font-medium">
                Tours
              </Link>
              <Link href="/blogs" className="block text-gray-700 hover:text-red-600 font-medium">
                Blogs
              </Link>
              <Link href="/contact" className="block text-gray-700 hover:text-red-600 font-medium">
                Contact Us
              </Link>
            </nav>
          </div>
        )}
      </header>

      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroSlides[currentHeroSlide].image || "/images/heritage-hotel.webp"}
            alt="Heritage Palace Background"
            fill
            className="object-cover transition-opacity duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-15"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="relative w-full max-w-7xl mx-auto">
            <div className="flex items-center justify-end pr-8 sm:pr-16 lg:pr-24">
              <div className="relative flex items-center justify-center space-x-4 sm:space-x-6">
                <Card className="relative overflow-hidden rounded-2xl shadow-2xl w-80 h-96 sm:w-96 sm:h-[28rem] lg:w-[420px] lg:h-[32rem] z-30 transform transition-all duration-500 hover:scale-105 cursor-pointer border-4 border-white/20 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                  <Image
                    src={heroSlides[currentHeroSlide].categories[0].image || "/images/hero-screenshot.png"}
                    alt={heroSlides[currentHeroSlide].categories[0].name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-xs font-medium">Live Preview</span>
                    </div>
                  </div>

                  <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 text-white z-20">
                    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide drop-shadow-lg mb-2">
                        {heroSlides[currentHeroSlide].categories[0].name}
                      </h3>
                      <p className="text-sm sm:text-base opacity-90">Discover Amazing Destinations</p>
                    </div>
                  </div>
                </Card>

                <Card className="relative overflow-hidden rounded-2xl shadow-xl w-64 h-80 sm:w-72 sm:h-88 lg:w-80 lg:h-96 transform scale-90 opacity-80 transition-all duration-500 hover:scale-95 hover:opacity-90 cursor-pointer z-20 border-2 border-white/10">
                  <Image
                    src={heroSlides[currentHeroSlide].categories[1].image || "/images/mauritius-beach.jpeg"}
                    alt={heroSlides[currentHeroSlide].categories[1].name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white z-10">
                    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                      <h3 className="text-lg sm:text-xl font-bold tracking-wide drop-shadow-lg">
                        {heroSlides[currentHeroSlide].categories[1].name}
                      </h3>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="flex items-center justify-center mt-8 space-x-4">
              <Button
                onClick={prevHeroSlide}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/20 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <Button
                onClick={nextHeroSlide}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/20 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/30 ${
                index === currentHeroSlide ? "bg-white shadow-lg" : "bg-white/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-gray-900">PACK & GO GETAWAYS</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 h-auto lg:h-96">
            <div className="lg:col-span-3 flex flex-col gap-4">
              <Link href={`/tours?country=Switzerland`}>
                <Card className="relative overflow-hidden rounded-lg h-48 lg:flex-1 group cursor-pointer">
                  <Image
                    src="/images/Kenya.jpeg?height=200&width=300"
                    alt="Kenya"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">Kenya</h3>
                </div>
              </Card>
              </Link>

              <Link href={`/tours?country=Australia`}>
              <Card className="relative overflow-hidden rounded-lg h-48 lg:flex-1 group cursor-pointer">
                <Image
                  src="/images/Australia.jpeg?height=200&width=300"
                  alt="Australia"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">Australia</h3>
                </div>
              </Card>
              </Link>
            </div>

            <div className="lg:col-span-6 flex flex-col gap-4">
              <Link href={`/tours?country=Thailand`}>
              <Card className="relative overflow-hidden rounded-lg h-20 sm:h-24 group cursor-pointer">
                <Image
                  src="/images/mauritius-beach.jpeg"
                  alt="Mauritius"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute bottom-2 left-4 text-white">
                  <h3 className="text-sm font-semibold">Mauritius</h3>
                </div>
              </Card>
              </Link>

              <Link href={`/tours?country=Switzerland`}>
              <Card className="relative overflow-hidden rounded-lg h-64 sm:h-80 lg:flex-1 group cursor-pointer">
                <Image
                  src="/images/switzerLand.jpeg?height=400&width=600"
                  alt="Switzerland"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">Switzerland</h3>
                </div>
              </Card>
              </Link>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-4">
              <Link href={`/tours?country=Singapore`}>
              <Card className="relative overflow-hidden rounded-lg h-48 lg:flex-1 group cursor-pointer">
                <Image
                  src="/images/london.jpeg?height=200&width=300"
                  alt="London"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">London</h3>
                </div>
              </Card>
              </Link>
              <Link href={`/tours?country=Hong Kong`}>
              <Card className="relative overflow-hidden rounded-lg h-48 lg:flex-1 group cursor-pointer">
                <Image
                  src="/images/hongKong.jpeg?height=200&width=300"
                  alt="Hong Kong"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">Hong Kong</h3>
                </div>
              </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold">GoSamyati Special</h2>
            <Link href="/tours" className="text-red-600 hover:underline flex items-center text-sm sm:text-base">
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {renderPackageCards(packages.slice(0, 4))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold">VISIT THE HEART OF INDIA</h2>
            <Link href="/tours" className="text-red-600 hover:underline flex items-center text-sm sm:text-base">
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {renderPackageCards(packages.slice(4, 8))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold">EXPLORE THE WORLD</h2>
            <Link href="/tours" className="text-red-600 hover:underline flex items-center text-sm sm:text-base">
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {renderPackageCards(packages.slice(0, 4))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative h-64 sm:h-80 lg:h-96">
              <Image src="/images/heritage-hotel.webp" alt="Special Booking" fill className="rounded-lg object-cover" />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">BOOK A HOLIDAY, SPECIALLY CURATED FOR YOU !!!</h2>
              <p className="text-gray-600 mb-6">Lorem ipsum ..........</p>
              <Link href="/contact">
                <Button className="bg-red-600 hover:bg-red-700 px-6 sm:px-8 py-2 sm:py-3">ENQUIRE</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="relative h-96 sm:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
          <Image
            src="/images/Kenya.jpeg"
            alt="Travel Destinations Collage"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full max-w-6xl mx-auto">
              {/* Bottom-left card (base of triangle) */}
              <Card className="absolute bottom-8 right-0 sm:bottom-12 sm:right-0 w-40 h-32 sm:w-48 sm:h-40 overflow-hidden rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer z-10">
                <Image src="/images/portlouis.jpeg" alt="Cultural Sites" fill className="object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-2 left-2 text-white">
                  <h4 className="text-sm sm:text-base font-semibold">Culture</h4>
                </div>
              </Card>

              {/* Bottom-right card (right angle of triangle) */}
              <Card className="absolute bottom-8 right-1/3 sm:bottom-12 sm:right-56 w-40 h-32 sm:w-48 sm:h-40 overflow-hidden rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer z-10">
                <Image
                  src="/placeholder.svg?height=150&width=200"
                  alt="Adventure Tours"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-2 left-2 text-white">
                  <h4 className="text-sm sm:text-base font-semibold">Adventure</h4>
                </div>
              </Card>

              {/* Top-left card (left angle of triangle) */}
              <Card className="absolute bottom-8 right-1/2 sm:right-40 sm:bottom-12 w-40 h-32 sm:w-56 sm:h-40 overflow-hidden rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer z-10">
                <Image src="/images/mount-everest.webp" alt="Mountain Adventure" fill className="object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-2 left-2 text-white">
                  <h4 className="text-sm sm:text-base font-semibold">Mountains</h4>
                </div>
              </Card>

              {/* Center-left card (midpoint of hypotenuse) */}
              <Card className="absolute top-1/3 right-1/4 right-80 sm:right-56 w-36 h-28 sm:w-44 sm:h-36 overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                <Image src="/images/heritage-hotel.webp" alt="Heritage Sites" fill className="object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-2 left-2 text-white">
                  <h4 className="text-xs sm:text-sm font-semibold">Heritage</h4>
                </div>
              </Card>

              {/* Center card (midpoint of hypotenuse) */}
              <Card className="absolute top-1/3 right-1/4 right-0  w-32 h-24 sm:w-40 sm:h-32 overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                <Image src="/placeholder.svg?height=120&width=160" alt="City Tours" fill className="object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-2 left-2 text-white">
                  <h4 className="text-xs sm:text-sm font-semibold">Cities</h4>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>

      <section className="py-16 relative">
  <div className="absolute inset-0">
    <Image
      src="/images/testimonials-bg.png"
      alt="Testimonials Background"
      fill
      className="object-cover"
    />
    <div className="absolute inset-0 bg-white bg-opacity-90"></div>
  </div>

  <div className="container mx-auto px-4 text-center relative z-10">
    <h2 className="text-3xl font-bold mb-12 text-gray-900">Testimonials</h2>

    {testimonials.length > 0 ? (
      <div className="relative max-w-2xl mx-auto">
        {/* Avatar */}
        <div className="bg-white rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center overflow-hidden shadow-lg">
          <Image
            src={
              testimonials[currentTestimonial]?.image ||
              "/placeholder.svg?height=60&width=60"
            }
            alt={testimonials[currentTestimonial]?.name || "Customer"}
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
        </div>

        {/* Label */}
        <div className="bg-red-600 text-white px-4 py-2 rounded-full inline-block mb-4">
          Excellent Service
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-700 mb-6 text-lg leading-relaxed bg-white bg-opacity-80 rounded-lg p-6 shadow-sm">
          {testimonials[currentTestimonial]?.text}
        </p>

        {/* Stars */}
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>

        {/* Name + Location */}
        <h4 className="font-semibold text-gray-900">
          {testimonials[currentTestimonial]?.name}
        </h4>
        <p className="text-gray-600">
          {testimonials[currentTestimonial]?.location}
        </p>

        {/* Dot Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentTestimonial ? "bg-red-600" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    ) : (
      <p className="text-gray-500 text-lg">Loading testimonials...</p>
    )}
  </div>
</section>


      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Why Us</h2>
            <p className="text-xl sm:text-2xl text-red-600 font-semibold">Because we care !</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="bg-red-600 text-white p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Customized</h3>
              <h3 className="text-xl sm:text-2xl font-bold">Tours</h3>
            </Card>
            <Card className="bg-red-600 text-white p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Experts</h3>
              <h3 className="text-xl sm:text-2xl font-bold">Knowledge</h3>
            </Card>
            <Card className="bg-red-600 text-white p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Trusted</h3>
              <h3 className="text-xl sm:text-2xl font-bold">Services</h3>
            </Card>
            <Card className="bg-red-600 text-white p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">24/7</h3>
              <h3 className="text-xl sm:text-2xl font-bold">Support</h3>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="space-y-4">
            <Collapsible
              open={openPolicy === "confirmation"}
              onOpenChange={(open) => setOpenPolicy(open ? "confirmation" : null)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-base sm:text-lg font-semibold text-red-600">CONFIRMATION POLICY</h3>
                {openPolicy === "confirmation" ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-white border-t">
                <p className="text-gray-600 text-sm sm:text-base">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible
              open={openPolicy === "payment"}
              onOpenChange={(open) => setOpenPolicy(open ? "payment" : null)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-base sm:text-lg font-semibold text-red-600">PAYMENT POLICY</h3>
                {openPolicy === "payment" ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-white border-t">
                <p className="text-gray-600 text-sm sm:text-base">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible
              open={openPolicy === "cancellation"}
              onOpenChange={(open) => setOpenPolicy(open ? "cancellation" : null)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-base sm:text-lg font-semibold text-red-600">CANCELLATION POLICY</h3>
                {openPolicy === "cancellation" ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-white border-t">
                <p className="text-gray-600 text-sm sm:text-base">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* About GoSamyati */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4">ABOUT GOSAMYATI</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="about-us" className="hover:underline">
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

            {/* Travel Destination */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4">TRAVEL DESTINATION</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative h-12 sm:h-16">
                  <Image src="/images/portlouis.jpeg" alt="Port Louis" fill className="rounded object-cover" />
                </div>
                <div className="relative h-12 sm:h-16">
                  <Image
                    src="/images/mauritius-beach.jpeg"
                    alt="Mauritius Beach"
                    fill
                    className="rounded object-cover"
                  />
                </div>
                <div className="relative h-12 sm:h-16">
                  <Image src="/images/mount-everest.webp" alt="Mount Everest" fill className="rounded object-cover" />
                </div>
                <div className="relative h-12 sm:h-16">
                  <Image src="/images/heritage-hotel.webp" alt="Heritage Hotel" fill className="rounded object-cover" />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Call Us</h4>
                <p className="text-sm">+91 9940882200</p>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Email Us</h4>
                <p className="text-sm">holiday@gosam.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Follow Us</h4>
                <div className="flex space-x-3">
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-gray-300" />
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-gray-300" />
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-gray-300" />
                  <Youtube className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
