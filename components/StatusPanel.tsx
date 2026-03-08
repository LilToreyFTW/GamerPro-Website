import { motion } from 'framer-motion'
import { Wifi, WifiOff } from 'lucide-react'

interface StatusPanelProps {
  status: 'online' | 'offline'
}

export default function StatusPanel({ status }: StatusPanelProps) {
  return (
    <motion.div
      className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
        status === 'online'
          ? 'bg-module-green/20 border-module-green/50'
          : 'bg-module-red/20 border-module-red/50'
      }`}
      animate={{
        opacity: [1, 0.5, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    >
      {status === 'online' ? (
        <Wifi className="w-4 h-4 text-module-green" />
      ) : (
        <WifiOff className="w-4 h-4 text-module-red" />
      )}
      <span className={`text-xs font-bold ${
        status === 'online' ? 'text-module-green' : 'text-module-red'
      }`}>
        {status.toUpperCase()}
      </span>
    </motion.div>
  )
}
