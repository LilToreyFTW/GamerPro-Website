import { motion } from 'framer-motion'
import { Cpu, Zap, Activity } from 'lucide-react'

interface PerformanceMonitorProps {
  metrics: {
    totalModules: number
    activeModules: number
    systemLoad: number
  }
}

export default function PerformanceMonitor({ metrics }: PerformanceMonitorProps) {
  const getLoadColor = () => {
    if (metrics.systemLoad < 30) return 'text-module-green'
    if (metrics.systemLoad < 70) return 'text-module-yellow'
    return 'text-module-red'
  }

  const getLoadBg = () => {
    if (metrics.systemLoad < 30) return 'bg-module-green/20'
    if (metrics.systemLoad < 70) return 'bg-module-yellow/20'
    return 'bg-module-red/20'
  }

  return (
    <div className="bg-gamer-accent/30 backdrop-blur-lg rounded-lg px-4 py-3 border border-gamer-gray/20">
      <div className="flex items-center space-x-4">
        {/* CPU Usage */}
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-module-blue" />
          <div className="flex items-center space-x-1">
            <div className="w-16 h-2 bg-gamer-accent rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-module-blue"
                initial={{ width: 0 }}
                animate={{ width: `${metrics.systemLoad}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className={`text-xs font-bold ${getLoadColor()}`}>
              {metrics.systemLoad.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Module Activity */}
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-module-green" />
          <span className="text-xs text-gamer-gray">
            {metrics.activeModules}/{metrics.totalModules}
          </span>
        </div>

        {/* System Status */}
        <div className={`px-2 py-1 rounded-full text-xs font-bold ${getLoadBg()} ${getLoadColor()}`}>
          {metrics.systemLoad < 30 ? 'OPTIMAL' : metrics.systemLoad < 70 ? 'MODERATE' : 'HIGH'}
        </div>
      </div>
    </div>
  )
}
