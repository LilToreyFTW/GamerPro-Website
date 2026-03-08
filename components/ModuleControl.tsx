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
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Cpu className="w-4 h-4 text-module-blue" />
                <span className="text-sm text-gamer-gray">CPU</span>
              </div>
              <div className="text-2xl font-bold text-module-blue">
                {game.performance.cpu.toFixed(1)}%
              </div>
              <div className="w-full h-2 bg-gamer-accent rounded-full overflow-hidden mt-2">
                <motion.div
                  className="h-full bg-module-blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${game.performance.cpu}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Monitor className="w-4 h-4 text-module-green" />
                <span className="text-sm text-gamer-gray">Memory</span>
              </div>
              <div className="text-2xl font-bold text-module-green">
                {formatMemory(game.performance.memory)}
              </div>
              <div className="text-xs text-gamer-gray mt-2">
                {(game.performance.memory / 1024 / 1024 / 1024).toFixed(2)} GB
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap className="w-4 h-4 text-module-yellow" />
                <span className="text-sm text-gamer-gray">FPS</span>
              </div>
              <div className="text-2xl font-bold text-module-yellow">
                {game.performance.fps}
              </div>
              <div className="text-xs text-gamer-gray mt-2">
                {game.performance.fps >= 60 ? 'Smooth' : game.performance.fps >= 30 ? 'Playable' : 'Low'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Control Actions */}
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center space-x-2 ${
            game.status === 'active'
              ? 'bg-module-red/20 text-module-red border border-module-red/50 hover:bg-module-red/30'
              : 'bg-module-green/20 text-module-green border border-module-green/50 hover:bg-module-green/30'
          }`}
        >
          {game.status === 'active' ? (
            <>
              <Pause className="w-5 h-5" />
              <span>STOP MODULE</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span>START MODULE</span>
            </>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="py-3 rounded-lg font-bold bg-module-yellow/20 text-module-yellow border border-module-yellow/50 hover:bg-module-yellow/30 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>RELOAD MODULE</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="py-3 rounded-lg font-bold bg-module-blue/20 text-module-blue border border-module-blue/50 hover:bg-module-blue/30 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Settings className="w-5 h-5" />
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
