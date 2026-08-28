"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section id="pricing" className="py-32 relative">
          {/* Background */}
          <div className="absolute inset-0 bg-linear from-primary/20 via-muted to-secondary/20" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-secondary/10 blur-[100px]" />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          {/* <div className="absolute inset-0 bg-linear from-primary/20 via-muted to-secondary/20" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-secondary/10 blur-[100px]" /> */}

          <div className="relative text-center py-24 px-8">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Ready to Book
              <br />
              <span className="text-gradient">Your Next Session?</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10">
              Join hundreds of artists who trust Aron Studios for professional recording.
            </p>
            <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10">
             Contact SCSL @ +234 818 569 6269 on Whatsapp or Email: service@samaynexus4u.com 
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 h-14 text-base glow-red"
              >
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted h-14 px-10 text-base"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;