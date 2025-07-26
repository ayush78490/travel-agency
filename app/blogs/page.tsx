// app/blog/page.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Clock, ArrowRight, PenSquare } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Header } from "@/components/header"
import {Footer} from "@/components/footer"
import { slugify } from "@/utils/slugify"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  readTime: string
  category: string
  featured: boolean
}

export default function BlogsPage() {
  const [isWriting, setIsWriting] = useState(false)
  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    image: "",
    author: "",
    readTime: "",
    category: "",
    featured: false
  })

  // Static blog data
  const staticBlogs: BlogPost[] = [
    {
      id: 1,
      title: "Exploring the Heritage Palaces of Rajasthan",
      excerpt: "Discover the magnificent architecture and rich history of Rajasthan's royal palaces.",
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

  const [blogs, setBlogs] = useState<BlogPost[]>(staticBlogs)
  const featuredBlogs = blogs.filter((blog) => blog.featured)
  const regularBlogs = blogs.filter((blog) => !blog.featured)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create new blog post
    const blogToAdd = {
      ...newBlog,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    setBlogs([blogToAdd, ...blogs])
    toast.success("Blog published successfully!")
    setIsWriting(false)
    setNewBlog({
      title: "",
      excerpt: "",
      image: "",
      author: "",
      readTime: "",
      category: "",
      featured: false
    })
  }

  function slugify(text: string) {
  return text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header and navigation remains the same */}

      <Header 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Travel Stories & Insights</h1>
            <p className="text-lg text-gray-600">
              Get inspired by our travel stories, destination guides, and expert tips.
            </p>
          </div>
          <Button 
            onClick={() => setIsWriting(true)}
            className="gap-2 bg-red-600 hover:bg-red-700 text-white hidden md:flex"
          >
            <PenSquare className="w-4 h-4" />
            Write Blog
          </Button>
        </div>

        {/* Blog Writing Form */}
        {isWriting && (
          <Card className="mb-12 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Blog Post</h2>
              <Button 
                variant="outline" 
                onClick={() => setIsWriting(false)}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Cancel
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title*</label>
                  <input
                    type="text"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category*</label>
                  <input
                    type="text"
                    value={newBlog.category}
                    onChange={(e) => setNewBlog({...newBlog, category: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Excerpt*</label>
                <textarea
                  value={newBlog.excerpt}
                  onChange={(e) => setNewBlog({...newBlog, excerpt: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Author*</label>
                  <input
                    type="text"
                    value={newBlog.author}
                    onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Read Time*</label>
                  <input
                    type="text"
                    value={newBlog.readTime}
                    onChange={(e) => setNewBlog({...newBlog, readTime: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    type="text"
                    value={newBlog.image}
                    onChange={(e) => setNewBlog({...newBlog, image: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newBlog.featured}
                  onChange={(e) => setNewBlog({...newBlog, featured: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="featured">Featured Post</label>
              </div>

              <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                Publish Blog
              </Button>
            </form>
          </Card>
        )}

        {/* Featured Blogs */}
        {featuredBlogs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredBlogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-64">
                    <Image 
                      src={blog.image || "/placeholder.svg"} 
                      alt={blog.title} 
                      fill 
                      className="object-cover" 
                    />
                    {blog.featured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-600 text-white">Featured</Badge>
                      </div>
                    )}
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
                        <Link href={`/blog/${slugify(blog.title)}`} className="flex items-center">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
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
                  <Image 
                    src={blog.image || "/placeholder.svg"} 
                    alt={blog.title} 
                    fill 
                    className="object-cover" 
                  />
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
                        <Link href={`/blog/${slugify(blog.title)}`} className="flex items-center">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <Footer/>

        {/* Newsletter Signup */}
        <section className=" bg-red-600 p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-2 rounded-md text-gray-900" 
            />
            <Button className="bg-white text-red-600 hover:bg-gray-100">Subscribe</Button>
          </div>
        </section>
      </div>
    </div>
  )
}