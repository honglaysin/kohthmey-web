import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  headline?: string;
  subtext?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
}

const HeroSection = ({
  headline = "Leading the Digital Future in Southeast Asia",
  subtext = "Innovating media, technology, and social engagement for millions of users.",
  primaryCTA = {
    text: "Discover Our Work",
    href: "/Brands",
  },
  secondaryCTA = {
    text: "Join Our Team",
    href: "/Careers",
  },
  backgroundImage = "/logo/produce.jpg",
}: HeroSectionProps) => {
  return (
    <section className="relative h-screen w-full bg-background overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {headline}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subtext}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-8 py-6 text-lg"
              asChild
            >
              <Link to={primaryCTA.href}>{primaryCTA.text}</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-[#FACC15] hover:bg-[#EAB308] text-black border-[#FACC15] hover:border-[#EAB308] px-8 py-6 text-lg"
              asChild
            >
              <Link to={secondaryCTA.href}>{secondaryCTA.text}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
  className="absolute inset-x-0 bottom-4 flex justify-center z-10 sm:bottom-8"
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 1,
    delay: 1.2,
    repeat: Infinity,
    repeatType: "reverse",
    repeatDelay: 0.2,
  }}
>
  <div className="flex flex-col items-center">
    <span className="text-white text-sm mb-2">Scroll Down</span>
    <svg
      className="w-6 h-6 text-white animate-bounce"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  </div>
</motion.div>

    </section>
  );
};

export default HeroSection;
