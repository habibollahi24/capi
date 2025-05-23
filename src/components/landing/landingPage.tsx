import { ArrowRightCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function LandingPage() {
  return (
    <section className="w-full min-h-[calc(100vh-120px)] flex flex-col md:flex-row items-center justify-center  ">
      <div className="grid md:grid-cols-2 items-center gap-2 max-w-6xl w-full">
        {/* Left side - Text */}
        <div className="space-y-4 p-2">
          <h1 className="text-4xl md:text-5xl font-extralight ">
            Discover the World with{' '}
            <span className="text-indigo-600 font-light">cAPI</span>
          </h1>
          <p className="text-lg text-primary/50">
            Get instant access to detailed country information from
            around the globe.
          </p>
          <Link
            href="/about"
            className="text-base flex items-center py-2 gap-x-2 group text-primary/70"
          >
            About Project
            <ArrowRightCircle className="transition-all group-hover:translate-x-2" />
          </Link>
        </div>

        {/* Right side - Image */}
        <div className="w-full h-[400px] relative rounded-3xl">
          <Image
            src="/landing.png"
            alt="People watching Earth"
            fill
            className="object-cover rounded-3xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
