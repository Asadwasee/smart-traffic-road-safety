import { motion } from "framer-motion";
import { Clock, Navigation, GitBranch, Activity, ArrowRight, Zap } from "lucide-react";
import { getTrafficColor, formatTime } from "../../utils/routeUtils";

function StatCard({ icon: Icon, label, value, accent, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.38 }}
      className="bg-slate-50 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl p-4
                 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800/60 transition-all duration-200"
    >
      <div className="flex items-center gap-1.5 mb-2">
        <Icon size={12} style={{ color: accent }} />
        <span className="text-slate-500 text-xs font-medium">{label}</span>
      </div>
      <span className="text-slate-900 dark:text-white font-bold text-lg leading-tight block">{value}</span>
    </motion.div>
  );
}

export default function RouteResult({ route, from, to }) {
  if (!route) return null;
  const traffic     = getTrafficColor(route.trafficLevel);
  const statusLabel = { low: "Smooth Drive", medium: "Moderate", high: "Congested" }[route.trafficLevel];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900/70 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xl dark:shadow-black/20 transition-colors duration-500"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="min-w-0">
            <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-widest font-semibold mb-1">
              Suggested Route
            </p>
            <h3 className="text-slate-900 dark:text-white font-bold text-sm md:text-base leading-snug">
              {route.routeName}
            </h3>
          </div>
          <span className="shrink-0 text-xs px-3 py-1 rounded-full font-semibold border"
            style={{ color: traffic.hex, borderColor: traffic.border, backgroundColor: traffic.bg }}>
            {traffic.label}
          </span>
        </div>

        {/* Journey line */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0 shadow-lg shadow-emerald-500/40" />
            <span className="text-slate-900 dark:text-white text-sm font-medium truncate">{from}</span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 text-slate-400 dark:text-slate-600">
            <div className="w-4 h-px bg-slate-200 dark:bg-slate-700" /><ArrowRight size={13} /><div className="w-4 h-px bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
            <span className="text-slate-900 dark:text-white text-sm font-medium truncate">{to}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 flex-shrink-0 shadow-lg shadow-rose-500/40" />
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard index={0} icon={Clock}      label="Est. Time"  value={formatTime(route.estimatedTime)} accent="#10b981" />
        <StatCard index={1} icon={Navigation} label="Distance"   value={route.distance}                  accent="#f59e0b" />
        <StatCard index={2} icon={GitBranch}  label="Waypoints"  value={`${route.waypoints.length} stop${route.waypoints.length !== 1 ? "s" : ""}`} accent="#6366f1" />
        <StatCard index={3} icon={Activity}   label="Status"     value={statusLabel}                     accent={traffic.hex} />
      </div>

      {/* Alternate route */}
      {route.alternateRoute && (
        <motion.div
          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
          className="bg-slate-900/70 backdrop-blur-sm border border-slate-700/50 border-dashed
                     rounded-xl px-5 py-4 flex items-center justify-between gap-4"
        >
          <div className="min-w-0 flex items-center gap-3">
            <div className="bg-amber-500/10 p-1.5 rounded-lg border border-amber-500/20 flex-shrink-0">
              <Zap size={12} className="text-amber-400" />
            </div>
            <div className="min-w-0">
              <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-widest font-semibold mb-0.5">
                Alternate Route
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-sm font-medium truncate">{route.alternateRoute}</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-semibold mb-0.5">Est. Time</p>
            <p className="text-amber-400 text-base font-bold">{formatTime(route.alternateTime)}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}