// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, Clock, ArrowLeft, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge" // Make sure to import the correct Badge component
import { Metadata } from "next"

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
  content?: string
}

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
    content: `<p>Rajasthan, the land of kings, is home to some of India's most magnificent palaces. These architectural marvels stand as testaments to the region's royal heritage.</p>
              <h2>The City Palace, Udaipur</h2>
              <p>Overlooking Lake Pichola, this palace complex is a blend of Rajasthani and Mughal architectural styles...</p>
              <h2>Amber Fort, Jaipur</h2>
              <p>Built with pale yellow and pink sandstone, this fort-palace is famous for its artistic Hindu elements...</p>`
  },
  // ... other blogs with content
]

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = staticBlogs.find(b => 
    slugify(b.title) === params.slug
  )
  
  if (!blog) return {}
  
  return {
    title: `${blog.title} | Travel Blog`,
    description: blog.excerpt,
    openGraph: {
      images: [blog.image],
    },
  }
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = staticBlogs.find(b => 
    slugify(b.title) === params.slug
  )

  if (!blog) return notFound()

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Button>
          </Link>
        </div>

        <Card className="overflow-hidden shadow-lg">
          <div className="relative h-64 sm:h-80 md:h-96">
            <Image 
              src={blog.image || "/placeholder.svg"} 
              alt={blog.title} 
              fill 
              className="object-cover" 
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            />
          </div>
          
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-3 items-center mb-6 text-sm text-gray-600 dark:text-gray-400">
              <Badge variant="secondary">{blog.category}</Badge>
              
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{blog.author}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{blog.date}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{blog.readTime}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              {blog.title}
            </h1>
            
            <div 
              className="prose prose-gray dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content || '' }}
            />

            <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4 border-t pt-6">
              <Link href="/blog">
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blogs
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="gap-2 w-full sm:w-auto"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
                Share Article
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Helper function to create slugs
function slugify(text: string) {
  return text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}