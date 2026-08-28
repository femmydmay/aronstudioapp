

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop"
          alt="Music recording studio"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Subtle color grading (red + green vibe) */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-black/40 to-green-500/20" />
      </div>

      {/* Ambient glow accents */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-red-500/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-green-500/20 blur-[140px] rounded-full pointer-events-none" />

      {/* Content */}
      <div className="relative container mx-auto px-6">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border border-white/20 bg-white/5 backdrop-blur-md text-white mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Now accepting bookings
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight text-white"
          >
            Book Your
            <br />
            <span className="text-red-400">Studio Session</span>
            <br />
            <span className="text-green-400">With Ease</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed"
          >
            A seamless music studio booking experience. Choose your time, lock
            your session, and focus on creating — no calls, no friction.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4 mt-10"
          >

            <Link href="/signup">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 h-12 text-base shadow-lg shadow-red-500/20">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
</Link>
           
           <Link href="/videopage">
            <Button
              // variant="outline"
              className="border-white/30 text-white bg-white/10  hover:bg-red-700 px-8 h-12 text-base backdrop-blur-md"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-10 mt-12 pt-8 border-t border-white/10"
          >
            {[
              { value: "500+", label: "Sessions Booked" },
              { value: "4.9★", label: "Client Rating" },
              { value: "24/7", label: "Availability" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;


