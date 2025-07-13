"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Clock, ArrowRight } from "lucide-react"

export default function BlogsPage() {
  const blogs = [
    {
      id: 1,
      title: "Exploring the Heritage Palaces of Rajasthan",
      excerpt:
        "Discover the magnificent architecture and rich history of Rajasthan's royal palaces. From Udaipur's Lake Palace to Jaipur's Amber Fort, each tells a unique story.",
      image: "/images/heritage-hotel.webp",
      author: "Priya Sharma",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Heritage",
      featured: true,
    },
    {
      id: 2,
      title: "Paradise Found: A Guide to Mauritius Beaches",
      excerpt:
        "From the pristine shores of Belle Mare to the dramatic cliffs of Le Morne, explore the most beautiful beaches that make Mauritius a tropical paradise.",
      image: "/images/mauritius-beach.jpeg",
      author: "Raj Patel",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Beach",
      featured: false,
    },
    {
      id: 3,
      title: "Cultural Immersion in Port Louis",
      excerpt:
        "Experience the vibrant culture of Mauritius' capital city. From bustling markets to colonial architecture, Port Louis offers a perfect blend of old and new.",
      image: "/images/portlouis.jpeg",
      author: "Sarah Johnson",
      date: "March 5, 2024",
      readTime: "5 min read",
      category: "Culture",
      featured: false,
    },
    {
      id: 4,
      title: "Trekking to Everest Base Camp: A Journey of a Lifetime",
      excerpt:
        "Follow our detailed guide to one of the world's most iconic treks. Learn about preparation, what to expect, and how to make the most of this incredible adventure.",
      image: "/images/mount-everest.webp",
      author: "Mike Chen",
      date: "February 28, 2024",
      readTime: "12 min read",
      category: "Adventure",
      featured: true,
    },
    {
      id: 5,
      title: "10 Hidden Gems in India You Must Visit",
      excerpt:
        "Beyond the popular tourist destinations, India hides countless treasures waiting to be discovered. Here are our top picks for off-the-beaten-path adventures.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Anita Gupta",
      date: "February 20, 2024",
      readTime: "7 min read",
      category: "Travel Tips",
      featured: false,
    },
    {
      id: 6,
      title: "Sustainable Travel: How to Explore Responsibly",
      excerpt:
        "Learn how to minimize your environmental impact while traveling. Discover eco-friendly accommodations, transportation options, and local experiences.",
      image: "/placeholder.svg?height=300&width=400",
      author: "David Kumar",
      date: "February 15, 2024",
      readTime: "9 min read",
      category: "Sustainability",
      featured: false,
    },
  ]

  const featuredBlogs = blogs.filter((blog) => blog.featured)
  const regularBlogs = blogs.filter((blog) => !blog.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-red-600">GoSamyati</div>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">
              Home
            </Link>
            <Link href="/tours" className="text-gray-700 hover:text-red-600 font-medium">
              Tours
            </Link>
            <Link href="/blogs" className="text-red-600 font-medium">
              Blogs
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium">
              Contact Us
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel Stories & Insights</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get inspired by our travel stories, destination guides, and expert tips to make your next adventure
            unforgettable.
          </p>
        </div>

        {/* Featured Blogs */}
        {featuredBlogs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredBlogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-64">
                    <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-600 text-white">Featured</Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <Badge variant="outline">{blog.category}</Badge>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{blog.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-600">{blog.author}</span>
                      </div>
                      <Button variant="outline" className="group bg-transparent">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Regular Blogs */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularBlogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <Badge variant="outline">{blog.category}</Badge>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3">{blog.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-1" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{blog.date}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4 group bg-transparent">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 bg-red-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Stay Updated with Our Latest Stories</h2>
          <p className="mb-6 opacity-90">
            Subscribe to our newsletter and never miss out on travel inspiration, tips, and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-md text-gray-900" />
            <Button className="bg-white text-red-600 hover:bg-gray-100">Subscribe</Button>
          </div>
        </section>
      </div>
    </div>
  )
}
