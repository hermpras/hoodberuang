import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplyForm from "@/components/ApplyForm";
import { Sparkles, ShieldCheck, Flame, Users } from "lucide-react";
import { HOODBEAR_CONFIG } from "@/config/constants";

export const metadata = {
  title: "Apply to Allowlist — HoodBear",
  description:
    "Claim your HoodBear allowlist spot. Complete the social tasks and submit your details.",
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-hood-bg text-hood-primary flex flex-col selection:bg-hood-accent selection:text-hood-light">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* PAGE HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-hood bg-hood-card border border-hood-secondary/60 shadow-hood-sm">
            <Sparkles className="w-3.5 h-3.5 text-hood-accent" />
            <span className="font-pixel text-[10px] text-hood-primary font-bold uppercase tracking-wider">
              ALLOWLIST APPLICATION
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-hood-primary uppercase">
            CLAIM YOUR HOODBEAR ALLOWLIST
          </h1>

          <p className="text-base sm:text-lg text-hood-primary/80 font-medium leading-relaxed max-w-lg mx-auto">
            Complete the steps below, then submit your details to secure your
            spot.
          </p>
        </div>

        {/* TWO COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE: Visual Artwork & Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            {/* Artwork Card */}
            <div className="bg-hood-card border-2 border-hood-primary rounded-hood-lg p-6 shadow-hood space-y-6">
              {/* Main Visual Display */}
              <div className="relative aspect-square w-full rounded-hood border-2 border-hood-primary bg-hood-bg overflow-hidden flex items-center justify-center p-4 group">
                <div className="absolute inset-0 bg-gradient-to-t from-hood-primary/20 to-transparent z-10 pointer-events-none" />
                <Image
                  src="/assets/bears/bear_13.png"
                  alt="HoodBear Artwork Showcase"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                  className="pixelated object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Artwork Gallery Teaser Grid */}
              <div className="grid grid-cols-4 gap-2.5 pt-2">
                {[
                  "bear_14.png",
                  "bear_15.png",
                  "bear_4.png",
                  "bear_10.png",
                ].map((bearImg, idx) => (
                  <div
                    key={idx}
                    className="aspect-square relative rounded-hood border-2 border-hood-primary/60 bg-hood-bg overflow-hidden"
                  >
                    <Image
                      src={`/assets/bears/${bearImg}`}
                      alt={`HoodBear #${idx + 2}`}
                      fill
                      sizes="80px"
                      className="pixelated object-contain p-1"
                    />
                  </div>
                ))}
              </div>

              {/* Key Highlights */}
              <div className="space-y-3 pt-2 border-t border-hood-secondary/40">
                <div className="flex items-center gap-3 text-xs font-bold text-hood-primary">
                  <div className="p-1.5 rounded bg-hood-accent/20 text-hood-accent">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>Fair & Verified Allowlist Process</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-hood-primary">
                  <div className="p-1.5 rounded bg-hood-accent/20 text-hood-accent">
                    <Flame className="w-4 h-4" />
                  </div>
                  <span>Guaranteed Mint Access for Approved Applicants</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Mission Checklist & Form */}
          <div className="lg:col-span-7">
            <ApplyForm />
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}
