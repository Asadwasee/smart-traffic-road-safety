import { motion } from 'framer-motion'
import { ShieldCheck, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RoadSafetyTips from '../components/RoadSafetyTips'

export default function RoadSafetyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-slate-950 px-6 pt-36 pb-0">
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.13),_transparent_60%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_50%_0%,_rgba(14,165,233,0.07),_transparent_65%)]" />

        {/* Dot-grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* ── Animated Hero Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 text-sm text-emerald-200">
              <ShieldCheck size={16} />
              Your Safety, Our Priority
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl">
              Drive Smart. <span className="text-emerald-400">Stay Safe.</span>
            </h1>

            {/* Accent bar */}
            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />

            {/* Subtitle */}
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400">
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
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 font-bold text-white transition hover:bg-white/10"
              >
                <ArrowLeft size={18} />
                Back to Home
              </Link>
            </div>
          </motion.div>

          {/* ── Stats Row ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: 'easeOut' }}
            className="mt-14 grid grid-cols-3 gap-4 sm:gap-6"
          >
            {[
              { value: '1.35M+', label: 'Deaths annually' },
              { value: '50M+', label: 'Injuries per year' },
              { value: '90%', label: 'Are preventable' }
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <p className="text-2xl font-black text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Fade-to-section gradient */}
          <div className="pointer-events-none mt-16 h-24 w-full bg-gradient-to-b from-transparent to-[#0f172a]" />
        </div>
      </section>

      {/* ── Road Safety Tips Section ── */}
      <main>
        <RoadSafetyTips />
      </main>

      <Footer />
    </div>
  )
}
