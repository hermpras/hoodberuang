"use client";

import { motion } from "framer-motion";
import { Users, Sparkles, Globe } from "lucide-react";

export default function MintSection() {
  const mintCards = [
    {
      step: "01 — TEAM",
      amount: "55",
      copy: "Reserved for giveaways, community rewards & team engagement.",
      icon: Users,
      highlight: false,
    },
    {
      step: "02 — ALLOWLIST",
      amount: "4000",
      copy: "Free to mint, 1 per wallet.",
      icon: Sparkles,
      highlight: true,
    },
    {
      step: "03 — PUBLIC",
      amount: "1500",
      copy: "0.0004 ETH.",
      icon: Globe,
      highlight: false,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-28 bg-hood-bg border-b-2 border-hood-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-hood bg-hood-accent/10 border border-hood-accent/30">
            <span className="font-pixel text-xs text-hood-accent uppercase tracking-wider font-bold">
              MINT ALLOCATION
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-hood-primary tracking-tight">
            HOW THE MINT RUNS
          </h2>
        </div>

        {/* 3 Allocation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mintCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-hood-lg border-3 border-hood-primary p-8 flex flex-col justify-between transition-all ${
                  card.highlight
                    ? "bg-hood-card shadow-hood-lg ring-2 ring-hood-accent"
                    : "bg-hood-bg shadow-hood"
                }`}
              >
                {card.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-pixel text-[10px] bg-hood-accent text-hood-light px-3 py-1 rounded-hood border-2 border-hood-primary font-bold tracking-wider">
                    PRIMARY STAGE
                  </div>
                )}

                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between pb-4 border-b-2 border-hood-secondary/40 mb-6">
                    <span className="font-pixel text-xs font-bold text-hood-accent tracking-wider">
                      {card.step}
                    </span>
                    <div className="p-2 rounded-hood bg-hood-card border border-hood-primary/20 text-hood-primary">
                      <IconComponent className="w-5 h-5 stroke-[2]" />
                    </div>
                  </div>

                  {/* Allocation Number */}
                  <div className="mb-4">
                    <span className="font-display text-4xl sm:text-5xl font-extrabold text-hood-primary tracking-tight block">
                      {card.amount}
                    </span>
                  </div>

                  {/* Allocation Copy */}
                  <p className="text-base text-hood-primary/90 font-medium leading-relaxed">
                    {card.copy}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
