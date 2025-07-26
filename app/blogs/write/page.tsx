// app/blog/write/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function WriteBlogPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you would send this to your API
      const newBlog = {
        id: Date.now().toString(),
        title,
        content,
        imageUrl: imageUrl || "/images/default-blog.jpg",
        date: new Date().toISOString(),
        author: "Admin", // Default author
      }

      // Save to localStorage (temporary solution)
      const existingBlogs = JSON.parse(localStorage.getItem("blogs") || "[]")
      localStorage.setItem(
        "blogs",
        JSON.stringify([...existingBlogs, newBlog])
      )
      
      toast.success("Blog published successfully!")
      router.push("/blog")
    } catch (error) {
      toast.error("Failed to publish blog")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Write New Blog</h1>
        <Button
          variant="outline"
          onClick={() => router.push("/blog")}
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          Cancel
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-700">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="border-gray-300 focus:border-red-600 focus:ring-red-600"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-gray-700">Featured Image URL</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste image URL (optional)"
              className="border-gray-300 focus:border-red-600 focus:ring-red-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-gray-700">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              rows={12}
              required
              className="min-h-[300px] border-gray-300 focus:border-red-600 focus:ring-red-600"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish Blog"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}