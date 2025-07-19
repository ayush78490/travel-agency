"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Linkedin,
} from "lucide-react"

export function Footer() {
  return (
    <>
      <footer className="bg-[#F7F7F7] text-black py-10 rounded-t-2xl">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ABOUT GOSAMYATI */}
            <div>
              <h3 className="text-lg font-bold mb-4">ABOUT GOSAMYATI</h3>
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

            {/* TRAVEL DESTINATION IMAGES */}
            <div>
              <h3 className="text-lg font-bold mb-4 ml-10">TRAVEL DESTINATION</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative h-24 aspect-square w-1/2 left-10">
                  <Image src="/images/Australia.jpeg" alt="Australia" fill className="rounded-xl object-cover" />
                </div>
                <div className="relative h-24 aspect-square w-1/2 right-10">
                  <Image src="/images/dubai.jpeg" alt="Dubai" fill className="rounded-xl object-cover" />
                </div>
                <div className="relative h-24 aspect-square w-1/2 left-10">
                  <Image src="/images/mauritius-beach.jpeg" alt="Mauritius" fill className="rounded-xl object-cover" />
                </div>
                <div className="relative h-24 aspect-square w-1/2 right-10">
                  <Image src="/images/hongKong.jpeg" alt="Hong Kong" fill className="rounded-xl object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-1">Call Us</h4>
              <p>+91 9940882200</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Email Us</h4>
              <p>holiday@gosam.com</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Follow Us</h4>
              <div className="flex space-x-4 mt-1">
                <Facebook className="w-4 h-4 text-red-600 hover:text-red-600 cursor-pointer" />
                <Instagram className="w-4 h-4 text-red-600 hover:text-red-600 cursor-pointer" />
                <Linkedin className="w-4 h-4 text-red-600 hover:text-red-600 cursor-pointer" />
                <Youtube className="w-4 h-4 text-red-600 hover:text-red-600 cursor-pointer" />
                <Mail className="w-4 h-4 text-red-600 hover:text-red-600 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* RED STRIP AT BOTTOM */}
      <div className="bg-red-600 h-6 rounded-b-2xl"></div>
    </>
  )
}
