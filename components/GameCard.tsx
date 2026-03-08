import { motion } from 'framer-motion'
import { Monitor, Cpu, Zap, Play, Pause } from 'lucide-react'

interface GameCardProps {
  game: {
    name: string
    programId: string
    status: 'active' | 'inactive' | 'loading'
    performance: {
      cpu: number
      memory: number
      fps: number
    }
    images: {
      header: string
      logo: string
    }
  }
  onToggle: () => void
  onSelect: () => void
  delay: number
}

export default function GameCard({ game, onToggle, onSelect, delay }: GameCardProps) {
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

  const formatMemory = (bytes: number) => {
    if (bytes === 0) return '0 MB'
    const mb = bytes / 1024 / 1024
    return `${mb.toFixed(0)} MB`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      className="bg-gamer-accent/30 backdrop-blur-lg rounded-xl overflow-hidden border border-gamer-gray/20 hover:border-gamer-highlight/50 transition-all duration-300 cursor-pointer"
      onClick={onSelect}
    >
      {/* Game Header Image */}
      <div className="relative h-32 bg-gradient-to-br from-gamer-primary to-gamer-accent overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <img
          src={game.images.header}
          alt={game.name}
          className="w-full h-full object-cover opacity-80"
        />
        
        {/* Status Badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${getStatusBg()} ${getStatusColor()} border`}>
          {game.status.toUpperCase()}
        </div>

        {/* Game Logo */}
        <div className="absolute bottom-2 left-2">
          <img
            src={game.images.logo}
            alt={game.name}
            className="w-12 h-12 object-contain"
          />
        </div>
      </div>

      {/* Game Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 font-tech">{game.name}</h3>
        <p className="text-gamer-gray text-xs mb-3">{game.programId}</p>

        {/* Performance Metrics */}
        {game.status === 'active' && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1">
                <Cpu className="w-3 h-3 text-module-blue" />
                <span>CPU</span>
              </div>
              <span className="text-module-blue">{game.performance.cpu.toFixed(1)}%</span>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1">
                <Monitor className="w-3 h-3 text-module-green" />
                <span>Memory</span>
              </div>
              <span className="text-module-green">{formatMemory(game.performance.memory)}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-module-yellow" />
                <span>FPS</span>
              </div>
              <span className="text-module-yellow">{game.performance.fps}</span>
            </div>
          </div>
        )}

        {/* Control Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
          className={`w-full py-2 rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center space-x-2 ${
            game.status === 'active'
              ? 'bg-module-red/20 text-module-red border border-module-red/50 hover:bg-module-red/30'
              : 'bg-module-green/20 text-module-green border border-module-green/50 hover:bg-module-green/30'
          }`}
        >
          {game.status === 'active' ? (
            <>
              <Pause className="w-4 h-4" />
              <span>STOP MODULE</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>START MODULE</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}
