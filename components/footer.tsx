"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About GoSamyati */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4">ABOUT GOSAMYATI</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" className="hover:underline">
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
              {[
                { src: "/images/portlouis.jpeg", alt: "Port Louis" },
                { src: "/images/mauritius-beach.jpeg", alt: "Mauritius Beach" },
                { src: "/images/mount-everest.webp", alt: "Mount Everest" },
                { src: "/images/heritage-hotel.webp", alt: "Heritage Hotel" },
              ].map((img, i) => (
                <div className="relative h-12 sm:h-16" key={i}>
                  <Image src={img.src} alt={img.alt} fill className="rounded object-cover" />
                </div>
              ))}
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
  );
};

export default Footer;
