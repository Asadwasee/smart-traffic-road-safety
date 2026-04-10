import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import RoadSafetyTips from "../components/RoadSafetyTips";
import ScrollReveal from "../components/ScrollReveal";
import ParallaxSection from "../components/ParallaxSection";

export default function RoadSafetyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500">
      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 px-6 pt-36 pb-0 transition-colors duration-500">
        {/* Background glows */}
        <ParallaxSection speed={0.1}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.13),_transparent_60%)]" />
        </ParallaxSection>
        <ParallaxSection speed={-0.05}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_50%_0%,_rgba(14,165,233,0.07),_transparent_65%)]" />
        </ParallaxSection>

        {/* Dot-grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* ── Animated Hero Content ── */}
          <ScrollReveal blur={true} distance={40}>
            <div>
              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm text-emerald-600 dark:text-emerald-200">
                <ShieldCheck size={16} />
                Your Safety, Our Priority
              </div>

              {/* Heading */}
              <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white sm:text-7xl">
                Drive Smart. <span className="text-emerald-500 dark:text-emerald-400">Stay Safe.</span>
              </h1>

              {/* Accent bar */}
              <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />

              {/* Subtitle */}
              <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                Road accidents are largely preventable. These evidence-based tips
                from traffic safety experts can save your life and the lives of
                others.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="#safety"
                  className="rounded-full bg-emerald-500 px-7 py-3 font-bold text-slate-950 transition hover:bg-emerald-400"
                >
                  View All Tips
                </a>

                <Link
                  to="/"
                  className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 px-7 py-3 font-bold text-slate-900 dark:text-white transition hover:bg-slate-100 dark:hover:bg-white/10"
                >
                  <ArrowLeft size={18} />
                  Back to Home
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Stats Row ── */}
          <ScrollReveal delay={0.4} blur={true} distance={20}>
            <div
              className="mt-14 grid grid-cols-3 gap-4 sm:gap-6"
            >
            {[
              { value: "1.35M+", label: "Deaths annually" },
              { value: "50M+", label: "Injuries per year" },
              { value: "90%", label: "Are preventable" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 backdrop-blur shadow-sm dark:shadow-none"
              >
                <p className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
            </div>
          </ScrollReveal>

          {/* Fade-to-section gradient */}
          <div className="pointer-events-none mt-16 h-24 w-full bg-gradient-to-b from-transparent to-white dark:to-[#0f172a]" />
        </div>
      </section>

      {/* ── Road Safety Tips Section ── */}
      <main>
        <RoadSafetyTips />
      </main>
    </div>
  );
}
