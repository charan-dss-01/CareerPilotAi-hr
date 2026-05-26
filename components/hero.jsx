"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";

const HeroSection = () => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden px-4 pb-12 pt-32 md:pb-16 md:pt-48"
    >
      {/* Dynamic Cursor Spotlight - Client Only */}
      {mounted && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 gpu-accelerated"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.04), transparent 40%)`,
          }}
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-16 top-20 h-64 w-64 rounded-full bg-primary/10 shadow-[0_0_100px_rgba(var(--primary),0.1)] md:h-[400px] md:w-[400px] gpu-accelerated" />
        <div className="absolute -right-10 top-1/3 h-56 w-56 rounded-full bg-accent/10 shadow-[0_0_100px_rgba(var(--accent),0.1)] md:h-[350px] md:w-[350px] gpu-accelerated" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-7 text-center lg:text-left gpu-accelerated"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-md lg:mx-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Career + Hiring Intelligence
          </motion.div>

          <h1 className="font-display animate-gradient text-[3.5rem] font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]">
            The AI OS for
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-primary pb-2 pr-2 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
              Hiring and Growth
            </span>
          </h1>
          <p className="mx-auto max-w-[600px] leading-relaxed text-muted-foreground md:text-xl lg:mx-0 font-light">
            One platform for recruiters to screen and hire intelligently, and
            candidates to level up with AI-driven career tools.
          </p>

          <div className="flex justify-center lg:justify-start">
            <Link href="/dashboard">
              <Button size="lg" className="group text-base">
                Get Started
              </Button>
            </Link>
          </div>

          <div className="mx-auto grid max-w-md grid-cols-2 gap-4 lg:mx-0 pt-4">
            <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-center backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.04] lg:text-left">
              <p className="font-display text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                95%
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
                Success Rate
              </p>
            </div>
            <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-center backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.04] lg:text-left">
              <p className="font-display text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                24/7
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
                AI Support
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35, rotateX: 5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="hero-image-wrapper relative rounded-3xl border border-white/[0.05] bg-white/[0.02] p-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_10px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-3xl md:p-4 lg:ml-8 gpu-accelerated"
        >
          <div className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full border border-primary/20 bg-primary/10 shadow-[0_0_30px_rgba(var(--primary),0.2)] animate-float" />
          <div
            className="pointer-events-none absolute -bottom-12 -right-8 h-32 w-32 rounded-full border border-accent/20 bg-accent/10 shadow-[0_0_40px_rgba(var(--accent),0.2)] animate-float"
            style={{ animationDelay: "2s" }}
          />

          <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/[0.05] [mask-image:linear-gradient(to_bottom,rgba(255,255,255,1),rgba(255,255,255,0.1))]" />

          <div
            ref={imageRef}
            className="hero-image relative overflow-hidden rounded-2xl bg-background shadow-2xl ring-1 ring-white/[0.05]"
          >
            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 mix-blend-overlay" />
            <div className="pointer-events-none absolute inset-y-0 -left-24 z-20 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[hero-sheen_6s_ease-in-out_infinite]" />

            <Image
              src="/hero-premium-mentor.svg"
              width={1280}
              height={720}
              alt="Premium AI career dashboard visual"
              className="mx-auto rounded-xl object-cover"
              priority
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-6 -left-6 rounded-[14px] border border-white/[0.05] bg-background/80 px-6 py-4 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_10px_40px_-10px_rgba(0,0,0,0.5)] flex items-center gap-4 gpu-accelerated"
          >
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <div className="h-4 w-4 rounded-full bg-primary animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                AI Mentor Active
              </p>
              <p className="text-xs text-muted-foreground">
                Analyzing market data...
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
