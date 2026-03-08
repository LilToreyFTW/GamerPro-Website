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
    const mb = bytes / 1024 / 1024
    return `${mb.toFixed(0)} MB`
  }

  const getStatusColor = () => {
    switch (game.status) {
      case 'active': return 'text-module-green'
      case 'loading': return 'text-module-yellow'
      case 'inactive': return 'text-module-red'
      default: return 'text-gamer-gray'
    }
  }

  const getStatusBg = () => {
    switch (game.status) {
      case 'active': return 'bg-module-green/20 border-module-green/50'
      case 'loading': return 'bg-module-yellow/20 border-module-yellow/50'
      case 'inactive': return 'bg-module-red/20 border-module-red/50'
      default: return 'bg-gamer-gray/20 border-gamer-gray/50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={game.images.logo}
            alt={game.name}
            className="w-16 h-16 object-contain"
          />
          <div>
            <h2 className="text-2xl font-bold font-tech">{game.name}</h2>
            <p className="text-gamer-gray">{game.programId}</p>
            <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold ${getStatusBg()} ${getStatusColor()} border mt-2`}>
              <div className={`w-2 h-2 rounded-full ${game.status === 'active' ? 'bg-module-green' : game.status === 'loading' ? 'bg-module-yellow' : 'bg-module-red'}`} />
              <span>{game.status.toUpperCase()}</span>
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 rounded-lg bg-gamer-accent/50 hover:bg-gamer-accent/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Game Image */}
      <div className="relative h-48 rounded-lg overflow-hidden">
        <img
          src={game.images.header}
          alt={game.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Performance Metrics */}
      {game.status === 'active' && (
        <div className="bg-gamer-accent/30 rounded-lg p-4 border border-gamer-gray/20">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
            <Monitor className="w-5 h-5 text-module-blue" />
            <span>Performance Metrics</span>
          </h3>
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

      {/* Module Information */}
      <div className="mb-8">
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
          <span>CONFIGURE</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="py-3 rounded-lg font-bold bg-gamer-accent/50 text-gamer-text border border-gamer-gray/50 hover:bg-gamer-accent/70 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <ExternalLink className="w-5 h-5" />
          <span>OPEN FOLDER</span>
        </motion.button>
      </div>

      {/* Module Info */}
      <div className="bg-gamer-accent/30 rounded-lg p-4 border border-gamer-gray/20">
        <h3 className="text-lg font-bold mb-3">Module Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gamer-gray">Module Name:</span>
            <span className="font-mono">{game.moduleName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gamer-gray">Program ID:</span>
            <span className="font-mono">{game.programId}</span>
          </div>
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
    </div>
  )
}
