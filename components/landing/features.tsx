"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  CreditCard,
  BarChart3,
  Bell,
  Shield,
  Zap,
  Users,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "primary" | "secondary";
};

const features: Feature[] = [
  {
    icon: CalendarDays,
    title: "Real-Time Availability",
    description: "View open slots instantly and book without back-and-forth.",
    accent: "primary",
  },
  {
    icon: Zap,
    title: "Instant Confirmation",
    description: "Get immediate booking confirmation — no waiting for approval.",
    accent: "secondary",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Set session durations, block dates, and manage time slots easily.",
    accent: "primary",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Collect payments and manage pricing for different session types.",
    accent: "secondary",
  },
  {
    icon: BarChart3,
    title: "Booking Analytics",
    description: "Track daily and monthly bookings with clear visual insights.",
    accent: "primary",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Automated reminders and confirmations for every booking.",
    accent: "secondary",
  },
  {
    icon: Shield,
    title: "No Double Bookings",
    description: "Real-time conflict prevention keeps your schedule clean.",
    accent: "primary",
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Track client history, manage promos, and build relationships.",
    accent: "secondary",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-px bg-linear from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-4 block">
            Features
          </span>

          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Everything You Need to
            <br />
            <span className="text-gradient">To book Studio Time</span>
          </h2>

          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            Powerful tools for studio bookings. Seamless experience for clients.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="
                  group relative rounded-2xl p-6
                  border border-blue-400/20
                  bg-transparent
                  hover:border-blue-400/40
                  hover:bg-blue-400/5
                  transition-all duration-300
                "
              >
                {/* Light blue accent button-style badge */}
                <div className="mb-4">
                  <div
                    className="
                      inline-flex items-center gap-2
                      px-3 py-1.5 rounded-full
                      text-xs font-medium
                      border border-blue-400/30
                      bg-blue-400/10
                      text-blue-400
                    "
                  >
                    <Icon className="h-4 w-4" />
                    Feature
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Subtle glow hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-br from-blue-400/10 via-transparent to-transparent" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;