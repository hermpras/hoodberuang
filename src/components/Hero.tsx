"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const heroBears = [
    { src: "/assets/bears/bear_12.png", name: "Inferno Bear #001", rotate: -6 },
    { src: "/assets/bears/bear_2.png", name: "Ignis Sharky #002", rotate: 2 },
    { src: "/assets/bears/bear_3.png", name: "Devil Royalty #003", rotate: -2 },
    { src: "/assets/bears/bear_4.png", name: "Panda Captain #004", rotate: 6 },
  ];

  const heroStats = [
    { value: "5,555", label: "SUPPLY" },
    { value: "FREE", label: "ALLOWLIST" },
    { value: "0.00025 ETH", label: "PUBLIC MINT" },
    { value: "ROBINHOOD", label: "CHAIN" },
  ];

  return (
    <section
      id="hero"
      className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden bg-hood-bg border-b-2 border-hood-secondary/30"
    >
      {/* Subtle Background Texture Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#273524_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-hood bg-hood-card border-2 border-hood-primary shadow-hood-sm">
              <span className="font-pixel text-xs text-hood-accent uppercase tracking-wider font-bold">
                HOODBEAR
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-hood-accent" />
              <span className="text-xs font-semibold text-hood-primary">
                ALLOWLIST NOW OPEN
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-6xl font-bold text-hood-primary tracking-tight leading-[1.08]">
              RAISED IN THE HOOD. READY FOR ANYTHING.
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-hood-primary/90 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              A hand-drawn pixel collection built around one idea — you always
              have a place to belong.
            </p>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/apply"
                className="w-full sm:w-auto font-display text-sm uppercase tracking-wider px-8 py-4 bg-hood-accent hover:bg-amber-700 text-hood-light font-bold border-2 border-hood-primary shadow-hood hover:shadow-hood-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 rounded-hood"
              >
                APPLY TO WL
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <Link
                href="/docs"
                className="w-full sm:w-auto font-display text-sm uppercase tracking-wider px-8 py-4 bg-hood-light hover:bg-white text-hood-primary font-bold border-2 border-hood-primary shadow-hood hover:shadow-hood-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-center rounded-hood"
              >
                READ THE DOCS
              </Link>
            </div>

            {/* Four Info Blocks Row (Numbers 01..04 Removed) */}
            <div className="pt-8 border-t-2 border-hood-secondary/40 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto lg:mx-0">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-hood-card border border-hood-secondary/60 p-3.5 sm:p-4 rounded-hood space-y-1 text-center lg:text-left flex flex-col justify-center"
                >
                  <span className="font-display text-sm sm:text-base font-bold text-hood-primary block whitespace-nowrap">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-semibold text-hood-primary/70 uppercase tracking-wider block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Prominent Pixel Art Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Card Container Showcase */}
            <div className="relative w-full max-w-md aspect-square bg-hood-card border-3 border-hood-primary p-4 shadow-hood-lg rounded-hood-lg overflow-hidden group">
              {/* Decorative Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-hood-secondary/40 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400 border border-hood-primary" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400 border border-hood-primary" />
                  <div className="w-3 h-3 rounded-full bg-green-400 border border-hood-primary" />
                </div>
                <span className="font-pixel text-xs text-hood-primary/80 tracking-wider font-bold">
                  HOODBEAR_NFT.CANVAS
                </span>
              </div>

              {/* 2x2 Bear Grid Preview */}
              <div className="grid grid-cols-2 gap-3 h-[calc(100%-40px)]">
                {heroBears.map((bear) => (
                  <motion.div
                    key={bear.name}
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    className="relative bg-hood-bg border-2 border-hood-primary p-2 rounded-hood flex flex-col items-center justify-center overflow-hidden shadow-hood-sm transition-transform"
                    style={{ transform: `rotate(${bear.rotate}deg)` }}
                  >
                    <Image
                      src={bear.src}
                      alt={bear.name}
                      width={160}
                      height={160}
                      className="pixelated w-full h-full object-contain filter drop-shadow-md"
                    />
                    <div className="absolute bottom-1 right-1 bg-hood-primary text-hood-light font-pixel text-[9px] px-1.5 py-0.5 rounded-hood">
                      #0{bear.name.slice(-2)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
