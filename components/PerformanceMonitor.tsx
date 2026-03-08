import { motion } from 'framer-motion'
import { Cpu, Activity, Zap, TrendingUp } from 'lucide-react'

interface PerformanceMonitorProps {
  metrics?: {
    totalModules: number
    activeModules: number
    systemLoad: number
  }
}

export function PerformanceMonitor({ metrics: propMetrics }: PerformanceMonitorProps = {}) {
  const internalMetrics = {
    cpu: 35,
    memory: 65,
    fps: 120,
    temperature: 65
  }

  return (
    <motion.div
      className="luxury-card p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="luxury-heading text-2xl mb-2">Performance Monitor</h3>
          <p className="luxury-subheading">Real-time system metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          <span className="luxury-status active">Live</span>
        </div>
      </div>

      <div className="luxury-grid luxury-grid-4">
        <div className="text-center">
          <div className="luxury-metric-value flex items-center justify-center">
            <Cpu className="w-6 h-6 mr-2" />
            {metrics.cpu}%
          </div>
          <div className="luxury-metric-label">CPU Usage</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
              style={{ width: `${metrics.cpu}%` }}
            ></div>
          </div>
        </div>

        <div className="text-center">
          <div className="luxury-metric-value flex items-center justify-center">
            <Zap className="w-6 h-6 mr-2" />
            {metrics.memory}%
          </div>
          <div className="luxury-metric-label">Memory Usage</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
              style={{ width: `${metrics.memory}%` }}
            ></div>
          </div>
        </div>

        <div className="text-center">
          <div className="luxury-metric-value">{metrics.fps}</div>
          <div className="luxury-metric-label">FPS</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full"
              style={{ width: `${(metrics.fps / 144) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="text-center">
          <div className="luxury-metric-value flex items-center justify-center">
            <TrendingUp className="w-6 h-6 mr-2" />
            {metrics.temperature}°C
          </div>
          <div className="luxury-metric-label">Temperature</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-orange-600 h-2 rounded-full"
              style={{ width: `${(metrics.temperature / 100) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
