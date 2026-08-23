"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isApplyPage = pathname.startsWith("/apply");
  const isDocsPage = pathname.startsWith("/docs");
  const isClaimPage = pathname.startsWith("/claim");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: isHomePage ? "#hero" : "/#hero" },
    { label: "Collection", href: isHomePage ? "#collection" : "/#collection" },
    {
      label: "Allocation",
      href: isHomePage ? "#how-it-works" : "/#how-it-works",
    },
    { label: "Docs", href: "/docs" },
    { label: "Claim", href: "/claim" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-hood-bg/95 backdrop-blur-md border-b-2 border-hood-secondary/40 py-3.5 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href={isHomePage ? "#hero" : "/#hero"}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="relative w-9 h-9 rounded-hood bg-hood-primary border-2 border-hood-primary flex items-center justify-center overflow-hidden shadow-hood-sm group-hover:translate-x-[1px] group-hover:translate-y-[1px] transition-transform">
              <Image
                src="/assets/bears/bear_1.png"
                alt="HoodBear Logo"
                width={32}
                height={32}
                className="pixelated object-cover"
              />
            </div>
            <span className="font-display text-lg sm:text-xl tracking-wide font-bold text-hood-primary group-hover:text-hood-accent transition-colors">
              HOODBEAR
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isCurrent =
                (link.label === "Docs" && isDocsPage) ||
                (link.label === "Claim" && isClaimPage) ||
                (link.label === "Home" && isHomePage);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide relative transition-colors after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-hood-accent after:transition-all ${
                    isCurrent
                      ? "text-hood-accent after:w-full font-bold"
                      : "text-hood-primary/90 hover:text-hood-accent after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/apply"
              className={`font-display text-xs uppercase tracking-wider px-5 py-2.5 font-bold border-2 border-hood-primary rounded-hood transition-all flex items-center gap-1.5 ${
                isApplyPage
                  ? "bg-hood-primary text-hood-light shadow-hood-sm ring-2 ring-hood-accent/50"
                  : "bg-hood-accent hover:bg-amber-700 text-hood-light shadow-hood hover:shadow-hood-sm hover:translate-x-[2px] hover:translate-y-[2px]"
              }`}
            >
              <span>APPLY TO WL</span>
              {isApplyPage ? (
                <span className="font-pixel text-[10px] bg-hood-accent text-hood-light px-1.5 py-0.5 rounded font-bold">
                  ACTIVE
                </span>
              ) : (
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-hood border-2 border-hood-primary bg-hood-bg text-hood-primary shadow-hood-sm focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[67px] bg-hood-bg border-b-2 border-hood-primary p-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isCurrent =
                (link.label === "Docs" && isDocsPage) ||
                (link.label === "Claim" && isClaimPage) ||
                (link.label === "Home" && isHomePage);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-bold py-2 border-b border-hood-secondary/30 flex items-center justify-between transition-colors ${
                    isCurrent
                      ? "text-hood-accent font-extrabold"
                      : "text-hood-primary hover:text-hood-accent"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="font-pixel text-xs text-hood-accent">→</span>
                </Link>
              );
            })}
            <Link
              href="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className={`mt-2 text-center font-display text-xs uppercase tracking-wider py-3 font-bold border-2 border-hood-primary shadow-hood rounded-hood ${
                isApplyPage
                  ? "bg-hood-primary text-hood-light"
                  : "bg-hood-accent hover:bg-amber-700 text-hood-light"
              }`}
            >
              APPLY TO WL {isApplyPage && "(ACTIVE)"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}