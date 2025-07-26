import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorImage?: string;
}

export default function BlogPostPage({ blog }: { blog: BlogPost }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href="/blog" className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          <Badge variant="outline">{blog.category}</Badge>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{blog.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{blog.readTime} read</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 mb-8">
          {blog.authorImage && (
            <img
              src={blog.authorImage}
              alt={blog.author}
              className="w-10 h-10 rounded-full"
            />
          )}
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-2 text-gray-400" />
            <span>By {blog.author}</span>
          </div>
        </div>

        <div className="border-t pt-8">
          <div
            className="prose prose-gray dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>

      <div className="mt-12 pt-8 border-t">
        <Button variant="outline" asChild>
          <Link href="/blogs" className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
      </div>
    </div>
  );
}