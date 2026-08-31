import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClaimForm from "@/components/ClaimForm";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Claim Your Spot — InkBear",
  description:
    "Bearlist members and holders of our partner collections can claim their InkBear Bearlist spot here.",
};

const STEPS = [
  {
    number: "01",
    title: "JOIN THE DISCORD",
    description:
      "Head to the Hoodbear Discord and join the server. This is where verification happens.",
  },
  {
    number: "02",
    title: "GET YOUR ROLE",
    description: (
      <div className="space-y-3">
        <p>There are two ways to get on the Bearlist:</p>

        <div className="space-y-3">
          <div>
            <p className="font-bold text-hood-primary">TEAM SELECTED</p>
            <p>
              Our team hand-picks members and assigns the Bearlist role directly
              in Discord.
            </p>
          </div>

          <div>
            <p className="font-bold text-hood-primary">PARTNER HOLDER</p>
            <p>
              Hold one of our partner collections? Verify your holdings in the
              #verify-holder channel. Our team will confirm your ownership
              on-chain — no wallet connection, no signing.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "LOG IN & CLAIM",
    description:
      "Come back to this page, log in with Discord, and submit your wallet. That's it — you're on the Bearlist.",
  },
];

export default function ClaimPage() {
  return (
    <div className="min-h-screen bg-hood-bg text-hood-primary flex flex-col selection:bg-hood-accent selection:text-hood-light">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* PAGE HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-hood bg-hood-card border border-hood-secondary/60 shadow-hood-sm">
            <Sparkles className="w-3.5 h-3.5 text-hood-accent" />

            <span className="font-pixel text-[10px] text-hood-primary font-bold uppercase tracking-wider">
              BEARLIST CLAIM
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-hood-primary uppercase">
            CLAIM YOUR SPOT
          </h1>

          <p className="text-base sm:text-lg text-hood-primary/80 font-medium leading-relaxed max-w-lg mx-auto">
            Bearlist members and partner collection holders get guaranteed
            access. Verify, log in, claim.
          </p>
        </div>

        {/* TWO COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE: HOW TO CLAIM */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-hood-card border-2 border-hood-primary rounded-hood-lg p-6 shadow-hood space-y-6">
              <h2 className="font-display text-lg font-bold text-hood-primary uppercase tracking-wide">
                How To Claim
              </h2>

              <div className="space-y-5">
                {STEPS.map((step) => (
                  <div key={step.number} className="flex gap-4">
                    <span className="font-pixel text-xs text-hood-accent font-bold shrink-0 pt-0.5">
                      {step.number}
                    </span>

                    <div className="space-y-1 flex-1">
                      <h3 className="font-display text-sm font-bold text-hood-primary uppercase tracking-wide">
                        {step.title}
                      </h3>

                      <div className="text-sm text-hood-primary/70 font-medium leading-relaxed">
                        {step.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: CLAIM FORM */}
          <div className="lg:col-span-7">
            <ClaimForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
