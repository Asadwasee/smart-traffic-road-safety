import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Shield,
  PhoneOff,
  Gauge,
  ArrowLeftRight,
  GlassWater,
  User,
  Moon,
  PhoneCall,
  MoveHorizontal,
  Baby,
  Settings,
  Bed
} from 'lucide-react'
import { safetyTipsData, statsData } from '../data/safetyTipsData'
import ScrollReveal from './ScrollReveal'
import ParallaxSection from './ParallaxSection'

const iconMap = {
  Shield,
  PhoneOff,
  Gauge,
  ArrowLeftRight,
  GlassWater,
  User,
  Moon,
  PhoneCall,
  MoveHorizontal,
  Baby,
  Settings,
  Bed
}

function CountUp({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  const display =
    target >= 1000000
      ? (count / 1000000).toFixed(1) + 'M'
      : count.toLocaleString()

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const headingVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function RoadSafetyTips() {
  return (
    <section
      id="safety"
      className="relative overflow-hidden bg-white dark:bg-[#0f172a] py-24 px-6 transition-colors duration-500"
    >
      {/* Dot-grid background */}
      <ParallaxSection speed={0.15}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.2] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        />
      </ParallaxSection>

      {/* Radial glow */}
      <ParallaxSection speed={-0.1}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.08),_transparent_65%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.12),_transparent_65%)]" />
      </ParallaxSection>

      <div className="relative mx-auto max-w-7xl">
        {/* ── Section Heading ── */}
        <ScrollReveal blur={true} distance={30}>
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-600 dark:text-emerald-200">
              <Shield size={15} />
              Road Safety Awareness
            </div>

            <h2 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              🚦 Road Safety Tips
            </h2>

            <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" />

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              Every journey matters. These essential guidelines protect you, your
              passengers, and everyone sharing the road with you.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Did You Know? Counter Strip ── */}
        <ScrollReveal delay={0.2} blur={true} distance={40}>
          <div className="mb-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {statsData.map((stat) => (
              <motion.div
                whileHover={{ y: -5 }}
                key={stat.label}
                className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-6 text-center backdrop-blur shadow-sm dark:shadow-none"
              >
                <p className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm leading-5 text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Cards Grid ── */}
        <ScrollReveal delay={0.3} blur={true} distance={50}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {safetyTipsData.map((tip) => {
              const Icon = iconMap[tip.icon]
              return (
                <motion.div
                  key={tip.id}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className={`group relative cursor-default rounded-2xl border border-slate-200 dark:border-white/10 ${tip.bg.replace('bg-opacity-10', 'bg-opacity-50 dark:bg-opacity-10')} p-6 backdrop-blur transition-all duration-300 shadow-sm dark:shadow-none hover:shadow-xl dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)]`}
                >
                {/* Icon */}
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl ${tip.iconBg} transition-transform duration-300 group-hover:scale-110`}
                >
                  {Icon && (
                    <Icon
                      size={28}
                      className={`${tip.color} transition-colors duration-300`}
                    />
                  )}
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-bold leading-snug text-slate-900 dark:text-white">
                  {tip.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {tip.description}
                </p>

                {/* Hover accent bar — uses static gradientFrom from data */}
                <div
                  className={`absolute bottom-0 left-6 right-6 h-[2px] scale-x-0 rounded-full bg-gradient-to-r ${tip.gradientFrom} to-transparent transition-transform duration-300 group-hover:scale-x-100`}
                />
              </motion.div>
            )
          })}
          </div>
        </ScrollReveal>

        {/* ── Emergency CTA Strip ── */}
        <ScrollReveal delay={0.4} blur={true} distance={60}>
          <div className="mt-20 rounded-3xl border border-rose-500/25 dark:border-rose-500/25 bg-rose-50 dark:bg-rose-500/10 p-8 text-center shadow-sm dark:shadow-none">
            <PhoneCall className="mx-auto mb-4 text-rose-500 dark:text-rose-400" size={36} />
            <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
              In an Emergency, Act Fast
            </h3>
            <p className="mx-auto max-w-xl text-slate-600 dark:text-slate-400">
              Save these numbers right now. Every second counts in a road
              emergency.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {[
                { label: 'Rescue', number: '1122' },
                { label: 'Police', number: '15' },
                { label: 'Highway', number: '1168' },
                { label: 'Ambulance', number: '1122' }
              ].map((item) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  key={item.label}
                  className="rounded-xl border border-rose-200 dark:border-rose-500/30 bg-white dark:bg-rose-500/15 px-6 py-3 shadow-sm dark:shadow-none"
                >
                  <p className="text-xs text-rose-500 dark:text-rose-300">{item.label}</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{item.number}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
