import { motion } from 'framer-motion'
import { X, Play, Pause, Settings, Monitor, Cpu, Zap, ExternalLink, RefreshCw } from 'lucide-react'

interface ModuleControlProps {
  game: {
    name: string
    programId: string
    moduleName: string
    status: 'active' | 'inactive' | 'loading'
    performance: {
      cpu: number
      memory: number
      fps: number
    }
    images: {
      header: string
      capsule: string
      library: string
      logo: string
    }
  }
  onClose: () => void
}

export default function ModuleControl({ game, onClose }: ModuleControlProps) {
  const formatMemory = (bytes: number) => {
    if (bytes === 0) return '0 MB'
  }

  const getStatusColor = () => {
    switch (module.status) {
      case 'active': return 'text-module-green'
      case 'loading': return 'text-module-yellow'
      case 'inactive': return 'text-module-red'
      default: return 'text-gamer-gray'
    }
  }

  const getStatusBg = () => {
    switch (module.status) {
      case 'active': return 'bg-module-green/20 border-module-green/50'
      case 'loading': return 'bg-module-yellow/20 border-module-yellow/50'
      case 'inactive': return 'bg-module-red/20 border-module-red/50'
    }
  }

  return (
    <motion.div
      className="luxury-card p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden">
              <img 
                src={module.image} 
                alt={module.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="luxury-heading text-2xl">{module.name}</h3>
              <p className="luxury-subheading">Program ID: {module.programId}</p>
              <div className={`luxury-status ${getStatusColor()} mt-2`}>
                {module.status === 'active' && <Play className="w-4 h-4" />}
                {module.status === 'inactive' && <Pause className="w-4 h-4" />}
                {module.status === 'syncing' && <RefreshCw className="w-4 h-4" />}
                {module.status}
              </div>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="luxury-button p-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Game Image */}
        <div className="relative h-48 rounded-xl overflow-hidden">
          <img 
            src={module.image} 
            alt={module.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Performance Metrics */}
        {module.status === 'active' && (
          <div>
            <h4 className="luxury-heading text-lg mb-4">Performance Metrics</h4>
            <div className="luxury-grid luxury-grid-3">
              <div className="luxury-card p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Cpu className="w-5 h-5 text-indigo-600" />
                  <span className="luxury-subheading">CPU Usage</span>
                </div>
                <div className="luxury-metric-value">{module.performance.cpu}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                    style={{ width: `${module.performance.cpu}%` }}
                  ></div>
                </div>
              </div>

              <div className="luxury-card p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  <span className="luxury-subheading">Memory</span>
                </div>
                <div className="luxury-metric-value">{formatMemory(module.performance.memory)}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                    style={{ width: `${(module.performance.memory / 2048) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="luxury-card p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Monitor className="w-5 h-5 text-blue-600" />
                  <span className="luxury-subheading">FPS</span>
                </div>
                <div className="luxury-metric-value">{module.performance.fps}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full"
                    style={{ width: `${(module.performance.fps / 144) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Module Information */}
        <div>
          <h4 className="luxury-heading text-lg mb-4">Module Information</h4>
          <div className="luxury-grid luxury-grid-2">
            <div className="luxury-card p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="luxury-subheading">Last Update</span>
              </div>
              <div className="luxury-text">{formatTime(module.lastUpdate)}</div>
            </div>

            <div className="luxury-card p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Settings className="w-5 h-5 text-orange-600" />
                <span className="luxury-subheading">Module Type</span>
              </div>
              <div className="luxury-text">Game Module</div>
            </div>
          </div>
        </div>

        {/* Control Actions */}
        <div className="flex space-x-4">
          <button 
            className={`luxury-button flex-1 ${
              module.status === 'active' 
                ? 'bg-gradient-to-r from-red-500 to-red-600' 
                : 'bg-gradient-to-r from-green-500 to-green-600'
            }`}
          >
            {module.status === 'active' ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Stop Module
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Module
              </>
            )}
          </button>

          <button className="luxury-button flex-1">
            <RefreshCw className="w-4 h-4 mr-2" />
            Restart Module
          </button>

          <button className="luxury-button flex-1">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </button>
          <div className="flex justify-between">
            <span className="text-gamer-gray">Version:</span>
            <span className="font-mono">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gamer-gray">Last Updated:</span>
            <span className="font-mono">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
