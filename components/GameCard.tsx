import { motion } from 'framer-motion'
import { Play, Pause, Settings, Activity, Zap, Monitor } from 'lucide-react'

interface GameModule {
  id: string
  name: string
  status: 'active' | 'inactive' | 'syncing'
  performance: {
    cpu: number
    memory: number
    fps: number
  }
  lastUpdate: string
  image: string
  programId: string
}

interface GameCardProps {
  module: GameModule
  onSelect: () => void
}

export function GameCard({ module, onSelect }: GameCardProps) {
  const getStatusColor = () => {
    switch (module.status) {
      case 'active':
        return 'bg-gradient-to-r from-green-500 to-emerald-600'
      case 'inactive':
        return 'bg-gradient-to-r from-gray-500 to-slate-600'
      case 'syncing':
        return 'bg-gradient-to-r from-yellow-500 to-orange-600'
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-600'
    }
  }

  const getStatusIcon = () => {
    switch (module.status) {
      case 'active':
        return <Play className="w-4 h-4" />
      case 'inactive':
        return <Pause className="w-4 h-4" />
      case 'syncing':
        return <Activity className="w-4 h-4" />
      default:
        return <Pause className="w-4 h-4" />
    }
  }

  const formatMemory = (memory: number) => {
    return memory > 0 ? `${(memory / 1024).toFixed(1)}GB` : '0GB'
  }

  return (
    <motion.div
      className="luxury-game-card cursor-pointer"
      onClick={onSelect}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Game Image */}
      <div className="luxury-game-image">
        <img 
          src={module.image} 
          alt={module.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <div className={`luxury-status ${module.status}`}>
            {getStatusIcon()}
            {module.status}
          </div>
        </div>
        
        {/* Program ID */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-white text-xs font-medium">{module.programId}</span>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="luxury-game-content">
        <h3 className="luxury-game-title">{module.name}</h3>
        <p className="luxury-game-subtitle">Program ID: {module.programId}</p>
        
        {/* Performance Stats */}
        <div className="luxury-game-stats">
          <div className="luxury-game-stat">
            <div className="luxury-game-stat-value">
              <Monitor className="w-4 h-4 inline mr-1" />
              {module.performance.fps}
            </div>
            <div className="luxury-game-stat-label">FPS</div>
          </div>
          
          <div className="luxury-game-stat">
            <div className="luxury-game-stat-value">
              <Zap className="w-4 h-4 inline mr-1" />
              {module.performance.cpu}%
            </div>
            <div className="luxury-game-stat-label">CPU</div>
          </div>
          
          <div className="luxury-game-stat">
            <div className="luxury-game-stat-value">
              {formatMemory(module.performance.memory)}
            </div>
            <div className="luxury-game-stat-label">Memory</div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button 
            className={`luxury-button flex-1 text-sm py-2 ${module.status === 'active' ? 'opacity-50' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              // Handle start/stop
            }}
          >
            {module.status === 'active' ? 'Stop' : 'Start'}
          </button>
          
          <button 
            className="luxury-button flex-1 text-sm py-2"
            onClick={(e) => {
              e.stopPropagation()
              // Handle settings
            }}
          >
            <Settings className="w-4 h-4 inline mr-1" />
            Config
          </button>
        </div>
      </div>
    </motion.div>
  )
}
