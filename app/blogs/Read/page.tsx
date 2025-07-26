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

// Define default values for a blog post
const DEFAULT_BLOG_POST: Partial<BlogPost> = {
  title: "Blog Post Not Found",
  excerpt: "",
  content: "<p>The requested blog post could not be found.</p>",
  category: "Uncategorized",
  date: "Unknown date",
  readTime: "0 min",
  author: "Unknown author",
};

export default function BlogPostPage({ blog }: { blog?: BlogPost }) {
  // Merge with default values if blog is undefined
  const currentBlog = blog ? blog : DEFAULT_BLOG_POST as BlogPost;

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
          <Badge variant="outline">{currentBlog.category}</Badge>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{currentBlog.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{currentBlog.readTime} read</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          {currentBlog.title}
        </h1>

        <div className="flex items-center gap-4 mb-8">
          {currentBlog.authorImage && (
            <img
              src={currentBlog.authorImage}
              alt={currentBlog.author}
              className="w-10 h-10 rounded-full"
            />
          )}
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-2 text-gray-400" />
            <span>By {currentBlog.author}</span>
          </div>
        </div>

        <div className="border-t pt-8">
          <div
            className="prose prose-gray dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: currentBlog.content }}
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