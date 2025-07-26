export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  authorImage?: string;
}

export const staticBlogs: BlogPost[] = [
  {
    id: 1,
    title: "Exploring the Heritage Palaces of Rajasthan",
    slug: "exploring-heritage-palaces-rajasthan",
    excerpt: "Discover the magnificent architecture and rich history of Rajasthan's royal palaces.",
    content: "<p>Detailed content about Rajasthan's palaces...</p>",
    image: "/images/heritage-hotel.webp",
    author: "Priya Sharma",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Heritage",
    featured: true,
    authorImage: "/images/author1.jpg"
  },
  {
    id: 2,
    title: "Paradise Found: A Guide to Mauritius Beaches",
    slug: "guide-mauritius-beaches",
    excerpt: "From the pristine shores of Belle Mare to the dramatic cliffs of Le Morne...",
    content: "<p>Detailed content about Mauritius beaches...</p>",
    image: "/images/mauritius-beach.jpeg",
    author: "Raj Patel",
    date: "March 10, 2024",
    readTime: "6 min read",
    category: "Beach",
    featured: false,
    authorImage: "/images/author2.jpg"
  },
  {
      id: 3,
      title: "Cultural Immersion in Port Louis",
      slug: "cultural-immersion-port-louis",
      content: "<p>Explore the vibrant culture of Mauritius' capital city...</p>",
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
      slug: "trekking-everest-base-camp",
      content: "<p>Follow our detailed guide to one of the world's most iconic treks...</p>",
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
        slug: "hidden-gems-india",  
        content: "<p>Beyond the popular tourist destinations, India hides countless treasures waiting to be discovered...</p>",
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
      slug: "sustainable-travel-responsibly",
      content: "<p>Learn how to minimize your environmental impact while traveling...</p>",
      excerpt:
        "Learn how to minimize your environmental impact while traveling. Discover eco-friendly accommodations, transportation options, and local experiences.",
      image: "/placeholder.svg?height=300&width=400",
      author: "David Kumar",
      date: "February 15, 2024",
      readTime: "9 min read",
      category: "Sustainability",
      featured: false,
    },
  // Add other blogs with the same structure
];