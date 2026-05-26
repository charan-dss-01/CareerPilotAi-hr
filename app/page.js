import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";
import Reveal from "@/components/ui/reveal";

export default function LandingPage() {
  return (
    <div className="relative isolate overflow-hidden min-h-screen">
      <div className="relative z-10">

        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <section className="w-full py-14 md:py-24 lg:py-28 relative">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <Reveal className="mx-auto mb-16 max-w-4xl text-center">
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-foreground">
                Intelligent tools for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">career growth</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">Everything you need to master your interviews, optimize your resume, and navigate your industry.</p>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto">
              {features.map((feature, index) => (
                <Reveal key={index} delay={index * 0.1} className={index === 0 ? "lg:col-span-2" : ""}>
                  <Card className="group h-full flex flex-col justify-between overflow-hidden">
                    <CardContent className="flex flex-col items-start p-8">
                      <div className="mt-6 mb-6 ml-0.5 flex h-12 w-12 origin-left items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                        {feature.icon}
                      </div>
                      <h3 className="font-display mb-3 text-2xl font-bold text-foreground tracking-tight">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">{feature.description}</p>
                    </CardContent>

                    {/* Decorative gradient blur in bottom right of card */}
                    <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-[50px] transition-all duration-500 group-hover:bg-primary/20" />
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-10 md:py-16 relative">
          <Reveal className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-4 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 shadow-2xl backdrop-blur-xl md:grid-cols-4 md:p-8">
              <div className="flex flex-col items-center justify-center space-y-2 p-4">
                <h3 className="font-display text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter">50+</h3>
                <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">Industries Covered</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 p-4">
                <h3 className="font-display text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter">1k+</h3>
                <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">Interview Qs</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 p-4">
                <h3 className="font-display text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter">95%</h3>
                <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">Success Rate</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 p-4">
                <h3 className="font-display text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter">24/7</h3>
                <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">AI Support</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-14 md:py-24 relative overflow-hidden">
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-y-1/2 hidden lg:block" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <Reveal className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="font-display text-4xl font-bold mb-4 md:text-5xl text-foreground">How it works</h2>
              <p className="text-muted-foreground text-lg">
                Four simple steps to accelerate your career trajectory
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-[1200px] mx-auto relative">
              {howItWorks.map((item, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="group relative flex flex-col items-center text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[20px] bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:bg-white/[0.06] group-hover:border-primary/30 relative z-10">
                      <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-[0_0_15px_hsl(var(--primary)/0.5)]">
                        {index + 1}
                      </span>
                      {React.cloneElement(item.icon, { className: "w-8 h-8 text-foreground group-hover:text-primary transition-colors" })}
                    </div>
                    <h3 className="font-display font-semibold text-xl text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-14 md:py-24 relative">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <Reveal className="mb-16 text-center">
              <h2 className="font-display text-4xl font-bold md:text-5xl text-foreground">
                Loved by professionals
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
              {testimonial.map((testimonial, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <Card className="h-full group">
                    <CardContent className="p-8">
                      <div className="mb-6 flex items-center space-x-4">
                        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white/[0.1] group-hover:ring-primary/50 transition-all duration-300">
                          <Image
                            width={56}
                            height={56}
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role} at <span className="text-foreground">{testimonial.company}</span>
                          </p>
                        </div>
                      </div>
                      <blockquote>
                        <p className="text-muted-foreground leading-relaxed text-lg italic">
                          &quot;{testimonial.quote}&quot;
                        </p>
                      </blockquote>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-14 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <Reveal className="mx-auto max-w-[900px] overflow-hidden rounded-[32px] border border-white/[0.06] bg-white/[0.01] p-6 shadow-2xl backdrop-blur-2xl md:p-12 relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

              <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.08] text-foreground shadow-sm">
                  <MessageCircleQuestion className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-bold mb-4 md:text-5xl text-foreground">
                  Common questions
                </h2>
              </div>

              <Accordion type="single" collapsible className="mx-auto w-full relative z-10">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="mb-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 transition-all duration-300 data-[state=open]:border-white/[0.12] data-[state=open]:bg-white/[0.04] data-[state=open]:shadow-lg"
                  >
                    <AccordionTrigger className="py-6 text-left text-base md:text-lg font-semibold text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-muted-foreground md:text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full pb-16 pt-6 md:pb-24 md:pt-12 relative z-10">
          <Reveal className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-[1200px] overflow-hidden rounded-[40px] border border-white/[0.08] bg-white/[0.02] px-6 py-24 shadow-2xl backdrop-blur-3xl md:px-16 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50" />
              <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px] pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center justify-center space-y-6 max-w-3xl mx-auto">
                <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                  Ready to Hire Smarter and Grow Faster?
                </h2>
                <p className="text-muted-foreground md:text-xl leading-relaxed max-w-[600px]">
                  CareerPilot AI brings recruiters and candidates together with
                  transparent screening and AI-powered intelligence.
                </p>
                <Link href="/dashboard" passHref>
                  <Button size="lg" className="mt-8 text-base px-10 h-14 group relative overflow-hidden">
                    <span className="relative z-10 flex items-center">
                      Launch CareerPilot AI
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

      </div>
    </div>
  );
}
