"use client";

import { motion } from "framer-motion";

type Step = {
  number: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Create an Account",
    description: "Sign up in seconds and set up your profile.",
  },
  {
    number: "02",
    title: "Browse Available Slots",
    description: "See real-time availability and choose your preferred date & time.",
  },
  {
    number: "03",
    title: "Book & Pay",
    description: "Select your session type, confirm, and pay securely online.",
  },
  {
    number: "04",
    title: "Show Up & Record",
    description: "Arrive at the studio ready to create. We handle the rest.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-32 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-px bg-linear from-transparent via-secondary/40 to-transparent" />
      <div className="absolute inset-0 bg-linear from-primary/20 via-muted to-secondary/20" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-secondary/10 blur-[100px]" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-secondary mb-4 block">
            How It Works
          </span>

          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Book in <span className="text-gradient">4 Simple Steps</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="
                relative text-center
                border border-blue-400/20
                rounded-2xl p-6
                hover:border-blue-400/40
                hover:bg-blue-400/5
                transition-all duration-300
                group
              "
            >
              {/* Connector line (unchanged) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-linear from-border to-transparent" />
              )}

              {/* Step badge (button-style light blue) */}
              <div className="mb-4 flex justify-center">
                <div
                  className="
                    inline-flex items-center justify-center
                    px-4 py-2 rounded-full
                    text-sm font-semibold
                    border border-blue-400/30
                    bg-blue-400/10
                    text-blue-400
                  "
                >
                  {step.number}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Subtle hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-br from-blue-400/10 via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;