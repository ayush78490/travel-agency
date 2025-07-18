"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

export function DestinationGrid() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-gray-900">PACK & GO GETAWAYS</h2>
        <div className="
          grid grid-cols-1 md:grid-cols-3 gap-6
          md:auto-rows-[120px] 
        ">
          {/* Kenya (tall card, left) */}
          <Link href={`/tours?country=Kenya`} className="md:row-span-2">
            <Card className="relative overflow-hidden rounded-lg h-full group cursor-pointer min-h-[240px]">
              <Image
                src="/images/Kenya.jpeg"
                alt="Kenya"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white">Kenya</h3>
              </div>
            </Card>
          </Link>

          {/* Switzerland (tall card, center) */}
          <Link href={`/tours?country=Switzerland`} className="md:row-span-2">
            <Card className="relative overflow-hidden rounded-lg h-full group cursor-pointer min-h-[670px]">
              <Image
                src="/images/switzerLand.jpeg"
                alt="Switzerland"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white">Switzerland</h3>
              </div>
            </Card>
          </Link>

          {/* London (short, stacked with Hong Kong) */}
          <Link href={`/tours?country=London`}>
            <Card className="relative overflow-hidden rounded-lg h-full group cursor-pointer min-h-[350px]">
              <Image
                src="/images/london.jpeg"
                alt="London"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white">London</h3>
              </div>
            </Card>
          </Link>

          {/* Australia (wide, third row left) */}
          <Link href={`/tours?country=Australia`} className="md:col-span-2">
            <Card className="relative overflow-hidden rounded-lg h-full group cursor-pointer min-h-[380px] w-1/4">
              <Image
                src="/images/Australia.jpeg"
                alt="Australia"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white">Australia</h3>
              </div>
            </Card>
          </Link>

          {/* Hong Kong (short, stacked with London, bottom right) */}
          <Link href={`/tours?country=Hong Kong`}>
            <Card className="relative overflow-hidden rounded-lg h-full group cursor-pointer min-h-[300px] mt-20">
              <Image
                src="/images/hongKong.jpeg"
                alt="Hong Kong"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white">Hong Kong</h3>
              </div>
            </Card>
          </Link>

          {/* Mauritius (wide, third row center/right) */}
          <Link href={`/tours?country=Mauritius`} className="md:col-span-2">
            <Card className="relative overflow-hidden rounded-lg h-full group cursor-pointer min-h-[380px] w-1/4 -mt-36 left-1/4">
              <Image
                src="/images/mauritius-beach.jpeg"
                alt="Mauritius"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white">Mauritius</h3>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  )
}
