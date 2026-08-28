"use client";

import Image from "next/image";
import aronLogo from "@/assets/aron-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src={aronLogo}
              alt="Aron Studios"
              width={0}
              height={0}
              className="h-10 w-auto"
              priority
              loading="eager"
            />
            <span className="font-display font-bold text-foreground">
              Aron Studios
            </span>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="hover:text-foreground transition-colors"
            >
              Pricing
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            © 2026 S.C.S.L All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
