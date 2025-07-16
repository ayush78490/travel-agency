"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button"; // Make sure this path matches your setup

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
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
  );
};

export default Header;
