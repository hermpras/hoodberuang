"use client";

import { HOODBEAR_CONFIG } from "@/config/constants";
import { motion } from "framer-motion";
import { ArrowUpRight, Twitter } from "lucide-react";

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.198.373.292a.077.077 0 0 1-.006.127c-.598.35-1.22.645-1.873.892a.076.076 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.029 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.056c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.419-2.157 2.419Z" />
    </svg>
  );
}

export default function Community() {
  return (
    <section
      id="community"
      className="py-20 sm:py-28 bg-hood-light border-b-2 border-hood-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-hood bg-hood-bg border border-hood-secondary/60">
            <span className="font-pixel text-xs text-hood-accent uppercase tracking-wider font-bold">
              COMMUNITY HUB
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-hood-primary tracking-tight">
            FIND YOUR PLACE IN THE HOODBEAR
          </h2>
          <p className="text-lg text-hood-primary/80 font-medium">
            Follow our official channel for announcements, art drops, and
            community updates.
          </p>
        </div>

        {/* X / Twitter + Discord Cards */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-full flex flex-col bg-hood-bg border-3 border-hood-primary p-8 rounded-hood-lg shadow-hood hover:shadow-hood-lg transition-all"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-hood bg-hood-primary text-hood-light flex items-center justify-center shadow-hood-sm">
                  <Twitter className="w-5 h-5" />
                </div>
                <span className="font-pixel text-[10px] text-hood-accent bg-hood-card px-2.5 py-1 rounded-hood border border-hood-secondary/60 font-bold">
                  OFFICIAL X
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-hood-primary">
                  X / Twitter
                </h3>
                <span className="text-xs text-hood-primary/70 font-semibold">
                  @hoodbearNFT
                </span>
              </div>

              <p className="text-sm text-hood-primary/90 font-medium leading-relaxed">
                Follow @hoodbearNFT for official announcements, community
                spotlights, and artwork previews.
              </p>
            </div>

            <div className="mt-auto pt-6 border-t border-hood-secondary/40">
              <a
                href={HOODBEAR_CONFIG.X_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full font-display text-xs uppercase tracking-wider py-3 px-4 bg-hood-primary hover:bg-hood-accent text-hood-light font-bold rounded-hood border-2 border-hood-primary shadow-hood-sm hover:shadow-hood transition-all flex items-center justify-center gap-2 group"
              >
                FOLLOW ON X
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-[2px] group-hover:translate-y-[-2px] transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-full flex flex-col bg-hood-bg border-3 border-hood-primary p-8 rounded-hood-lg shadow-hood hover:shadow-hood-lg transition-all"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-hood bg-hood-primary text-hood-light flex items-center justify-center shadow-hood-sm">
                  <DiscordIcon className="w-5 h-5" />
                </div>
                <span className="font-pixel text-[10px] text-hood-accent bg-hood-card px-2.5 py-1 rounded-hood border border-hood-secondary/60 font-bold">
                  OFFICIAL DISCORD
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-hood-primary">
                  Discord
                </h3>
                <span className="text-xs text-hood-primary/70 font-semibold">
                  HoodBear Community
                </span>
              </div>

              <p className="text-sm text-hood-primary/90 font-medium leading-relaxed">
                Join the server for real-time chat, giveaways, and
                behind-the-scenes bear drops.
              </p>
            </div>

            <div className="mt-auto pt-6 border-t border-hood-secondary/40">
              <a
                href={HOODBEAR_CONFIG.DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full font-display text-xs uppercase tracking-wider py-3 px-4 bg-hood-primary hover:bg-hood-accent text-hood-light font-bold rounded-hood border-2 border-hood-primary shadow-hood-sm hover:shadow-hood transition-all flex items-center justify-center gap-2 group"
              >
                JOIN DISCORD
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-[2px] group-hover:translate-y-[-2px] transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}