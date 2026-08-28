"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import aronLogo from "@/assets/aron-logo.png";
import { useTheme } from "@/hooks/useTheme";

type LinkItem = {
  label: string;
  href: string;
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const links: LinkItem[] = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <>
      {/* ✅ Navbar Spacer Prevents Page Collision */}
      <div className="h-[80px]" />

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="
          fixed top-0 left-0 right-0 z-50
          glass border-b border-border/40
          backdrop-blur-xl
          bg-background/80
        "
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={aronLogo}
              alt="Aron Studios"
              width={0}
              height={0}
              className="h-10 w-auto"
              priority
            />

            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              Aron <span className="text-gradient">Studios</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="
                  text-sm font-medium
                  text-muted-foreground
                  hover:text-foreground
                  transition-colors
                "
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="bg-primary text-primary-foreground"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* Sign In */}
            <Link href="/login">
              <Button
                variant="ghost"
                className="bg-primary text-primary-foreground"
              >
                Sign In
              </Button>
            </Link>

            {/* Get Started */}
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="
              fixed top-[80px] left-0 right-0
              md:hidden px-4 pt-3 z-40
            "
          >
            {/* Rounded Glass Container */}
            <div
              className="
                rounded-2xl
                bg-white/10 dark:bg-white/5
                backdrop-blur-xl
                border border-white/20
                shadow-xl
                overflow-hidden
              "
            >
              <div className="flex flex-col gap-5 p-6">
                
                {/* Links */}
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="
                      text-base font-medium
                      text-foreground
                      hover:text-primary
                      transition-colors
                    "
                  >
                    {link.label}
                  </a>
                ))}

                {/* Divider + Actions */}
                <div className="flex flex-col gap-3 pt-6 border-t border-white/20 mt-2">
                  
                  {/* Theme Toggle */}
                  <Button
                    variant="ghost"
                    onClick={toggleTheme}
                    className="
                      justify-start
                      text-foreground
                      hover:bg-white/20
                    "
                  >
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </Button>

                  {/* Sign In */}
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <Button
                      variant="ghost"
                      className="
                        justify-start
                        text-foreground
                        hover:bg-white/20
                      "
                    >
                      Sign In
                    </Button>
                  </Link>

                  {/* Get Started */}
                  <Link href="/signup" onClick={() => setMobileOpen(false)}>
                    <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
                      Get Started
                    </Button>
                  </Link>

                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}