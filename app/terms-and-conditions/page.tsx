'use client';

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

function PrivacyPolicy() {
    return (
        <>
        
        <Header 
            isMobileMenuOpen={false} 
            setIsMobileMenuOpen={() => {}} // Placeholder, implement as needed
        />
        <div className="w-[90vw] mx-auto px-4 py-8">
            <Head>
                <title>Privacy Policy - Ban Banjara</title>
                <meta name="description" content="Privacy policy for Ban Banjara website" />
            </Head>

            <header className="mb-8 relative h-64 rounded-lg overflow-hidden">
                {/* Background Image using next/image with fill layout */}
                <Image
                    src="/images/terms-and-conditions.jpg"
                    alt="Terms and Conditions Background"
                    fill
                    className="object-cover"
                    quality={80}
                    priority />

                {/* Content overlay */}
                <div className="absolute inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center p-6">
                    <div className="text-center max-w-max">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy policy</h1>
                        <p className="text-lg text-gray-700 font-semibold">Privacy policy Tagline</p>
                    </div>
                </div>
            </header>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy policy</h2>
                <p className="text-sm text-gray-500 mb-6">Last updated: February 9th, 2019</p>

                <div className="prose max-w-none">
                    <p className="mb-4">
                        Ban Banjara governs the privacy of its users and whoever comes on website www.banbanjara.com. The
                        privacy policy describes our policy in details and how this website protects and stores user information.
                    </p>
                    <p>
                        We collect user data after the confirmation given by the user and they state that they have read our
                        privacy policy and terms & conditions.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms and Conditions</h2>
                
                <div className="prose max-w-none">
                    <ul className="list-disc pl-5 space-y-3">
                        <li>Booking is confirmed only after receiving a minimum 50% advance payment; balance must be paid before the start of the trip.</li>
                        <li>The itinerary is subject to change due to weather conditions, traffic delays, or unforeseen circumstances. Alternate arrangements will be made where possible.</li>
                        <li>Check-in and check-out times for hotels follow standard policy (usually 12:00 PM check-in and 11:00 AM check-out).</li>
                        <li>Early check-in or late check-out is subject to availability and may incur additional charges.</li>
                        <li>Meals are provided only as mentioned in the itinerary (breakfast and dinner). Lunch is at the guest's own expense unless specified.</li>
                        <li>Any personal expenses like laundry, telephone bills, drinks, tips, or additional sightseeing not mentioned in the itinerary are not included.</li>
                        <li>Optional activities, such as Kathakali shows or Ayurvedic treatments, are chargeable and can be arranged on request.</li>
                        <li>In case of natural calamities, political unrest, or flight delays, the operator will not be held responsible for changes or cancellations of services.</li>
                        <li>No refund will be provided for unused services or shortened stays due to personal reasons.</li>
                        <li>The customer must carry valid government-issued ID for check-in at hotels and for verification purposes during the trip.</li>
                        <li>Children policy: Child below 5 years is complimentary (without extra bed). Children above 5 years will be charged as per hotel policy.</li>
                        <li>The company reserves the right to modify or withdraw the package at any time before or during the tour due to unavoidable circumstances.</li>
                    </ul>
                </div>
            </section>
        </div>
        <Footer />
        </>
    );
}

export default PrivacyPolicy;