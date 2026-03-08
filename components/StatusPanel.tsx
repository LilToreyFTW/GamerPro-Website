import { motion } from 'framer-motion'
import { Activity, Shield } from 'lucide-react'

interface StatusPanelProps {
  status: 'online' | 'offline'
}

export function StatusPanel({ status }: StatusPanelProps) {
  const isOnline = status === 'online'

  return (
    <motion.div
      className="luxury-card flex items-center space-x-4 px-6 py-3"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
      <div className="flex items-center space-x-2">
        <Shield className={`w-5 h-5 ${isOnline ? 'text-green-500' : 'text-red-500'}`} />
        <span className={`luxury-subheading font-medium ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>
    </motion.div>
  )
}
