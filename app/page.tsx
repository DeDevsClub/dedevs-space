"use client";

import { SiteHeader } from "@/components/navigation/site-header";
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Users, Code, Star } from "lucide-react";
import Link from "next/link";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/navigation/sidebar/dashboard-sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <Sidebar>
        <SiteHeader />
        <div className="flex w-screen min-w-screen sm:max-w-dvw min-h-screen flex-col bg-gradient-to-tr from-indigo-950 via-background to-blue-900">
          <div className="flex flex-1">
            <main className="flex flex-1 items-center justify-center px-4">
              <section className="w-full max-w-3xl mx-auto flex flex-col items-center text-center gap-8 py-16">
                {/* Hero Section */}
                <div className="relative flex flex-col items-center gap-4 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-sky-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
                      Welcome to DeDevs Space
                    </h1>
                  </div>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                    Where developers{" "}
                    <span className="font-semibold text-primary">showcase</span>{" "}
                    their work,{" "}
                    <span className="font-semibold text-primary">connect</span>{" "}
                    with others, and{" "}
                    <span className="font-semibold text-primary">build</span>{" "}
                    the future together.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center mt-4">
                    <Link href="/portfolios">
                      <Button
                        size="lg"
                        className="group transition-all duration-200"
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/portfolios">
                      <Button
                        variant="outline"
                        size="lg"
                        className="group border-primary/30 hover:border-primary"
                      >
                        Explore Portfolios
                        <Users className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-10">
                  <FeatureCard
                    icon={<Code className="h-8 w-8 text-indigo-400" />}
                    title="Showcase Projects"
                    description="Easily display your best work and open source contributions with beautiful, interactive profiles."
                  />
                  <FeatureCard
                    icon={<Users className="h-8 w-8 text-blue-400" />}
                    title="Connect & Collaborate"
                    description="Find and connect with talented developers, join teams, and build amazing things together."
                  />
                  <FeatureCard
                    icon={<Star className="h-8 w-8 text-yellow-400" />}
                    title="Earn Recognition"
                    description="Collect badges, earn endorsements, and grow your reputation in the developer community."
                  />
                </div>
              </section>
            </main>
          </div>
          {/* Fun, subtle animated background shapes */}
        </div>
        <AnimatedBackground />
      </Sidebar>
    </SidebarProvider>
  );
}

// Feature Card component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group bg-card/80 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all hover:scale-105 hover:shadow-2xl cursor-pointer border border-transparent hover:border-primary/30">
      <div className="mb-2 animate-float">{icon}</div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

// Animated Background component (decorative)
function AnimatedBackground() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-80px] left-[-80px] w-96 h-96 bg-indigo-700 opacity-20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulse-slower {
          animation: pulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
}
