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
                    src="/images/privacy-policy.jpg"
                    alt="Privacy Policy Background"
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
                    </p>
                </div>
            </section>
        </div>
        <Footer />
        </>
    );
}

export default PrivacyPolicy;