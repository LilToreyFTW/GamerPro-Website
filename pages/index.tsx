import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Monitor, Cpu, Zap, Shield, Gamepad2, Settings } from 'lucide-react'
import GameCard from '../components/GameCard'
import StatusPanel from '../components/StatusPanel'
import PerformanceMonitor from '../components/PerformanceMonitor'
import ModuleControl from '../components/ModuleControl'

interface GameInfo {
  name: string
  programId: string
  steamAppId: string
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

const gamesData: GameInfo[] = [
  {
    name: "ARC Raiders",
    programId: "UGP-ARC-001",
    steamAppId: "1808500",
    moduleName: "arc_raiders_module",
    status: "inactive",
    performance: { cpu: 0, memory: 0, fps: 0 },
    images: {
      header: "/images/games/arc-raiders-header.jpg",
      capsule: "/images/games/arc-raiders-capsule.jpg",
      library: "/images/games/arc-raiders-library.jpg",
      logo: "/images/games/arc-raiders-logo.png"
    }
  },
  {
    name: "THE FINALS",
    programId: "UGP-FINALS-002",
    steamAppId: "2073850",
    moduleName: "finals_module",
    status: "inactive",
    performance: { cpu: 0, memory: 0, fps: 0 },
    images: {
      header: "/images/games/the-finals-header.jpg",
      capsule: "/images/games/the-finals-capsule.jpg",
      library: "/images/games/the-finals-library.jpg",
      logo: "/images/games/the-finals-logo.png"
    }
  },
  {
    name: "Borderlands 4",
    programId: "UGP-BL4-003",
    steamAppId: "1285190",
    moduleName: "borderlands_module",
    status: "inactive",
    performance: { cpu: 0, memory: 0, fps: 0 },
    images: {
      header: "/images/games/borderlands-4-header.jpg",
      capsule: "/images/games/borderlands-4-capsule.jpg",
      library: "/images/games/borderlands-4-library.jpg",
      logo: "/images/games/borderlands-4-logo.png"
    }
  },
  {
    name: "Call of Duty",
    programId: "UGP-COD-004",
    steamAppId: "1938090",
    moduleName: "cod_module",
    status: "inactive",
    performance: { cpu: 0, memory: 0, fps: 0 },
    images: {
      header: "/images/games/call-of-duty-header.jpg",
      capsule: "/images/games/call-of-duty-capsule.jpg",
      library: "/images/games/call-of-duty-library.jpg",
      logo: "/images/games/call-of-duty-logo.png"
    }
  },
  {
    name: "Dying Light The Beast",
    programId: "UGP-DLTB-005",
    steamAppId: "3008130",
    moduleName: "dyinglight_module",
    status: "inactive",
    performance: { cpu: 0, memory: 0, fps: 0 },
    images: {
      header: "/images/games/dying-light-beast-header.jpg",
      capsule: "/images/games/dying-light-beast-capsule.jpg",
      library: "/images/games/dying-light-beast-library.jpg",
      logo: "/images/games/dying-light-beast-logo.png"
    }
  },
  {
    name: "Forza Horizon 5",
    programId: "UGP-FH5-006",
    steamAppId: "1551360",
    moduleName: "forza_module",
    status: "inactive",
    performance: { cpu: 0, memory: 0, fps: 0 },
    images: {
      header: "/images/games/forza-horizon-5-header.jpg",
      capsule: "/images/games/forza-horizon-5-capsule.jpg",
      library: "/images/games/forza-horizon-5-library.jpg",
      logo: "/images/games/forza-horizon-5-logo.png"
    }
  },
  {
    name: "Red Dead Redemption 2",
    programId: "UGP-RDR2-007",
    steamAppId: "1174180",
    moduleName: "rdr2_module",
    status: "inactive",
    performance: { cpu: 0, memory: 0, fps: 0 },
    images: {
      header: "/images/games/red-dead-redemption-2-header.jpg",
      capsule: "/images/games/red-dead-redemption-2-capsule.jpg",
      library: "/images/games/red-dead-redemption-2-library.jpg",
      logo: "/images/games/red-dead-redemption-2-logo.png"
    }
  },
  {
    name: "Grand Theft Auto V",
    programId: "UGP-GTA5-008",
    steamAppId: "271590",
    moduleName: "gta_module",
    status: "inactive",
    performance: { cpu: 0, memory: 0, fps: 0 },
    images: {
      header: "/images/games/gta-v-header.jpg",
      capsule: "/images/games/gta-v-capsule.jpg",
      library: "/images/games/gta-v-library.jpg",
      logo: "/images/games/gta-v-logo.png"
    }
  },
  {
    name: "Rainbow Six Siege",
    programId: "UGP-R6S-009",
    steamAppId: "359550",
    moduleName: "r6_module",
    status: "inactive",
    performance: { cpu: 0, memory: 0, fps: 0 },
    images: {
      header: "/images/games/rainbow-six-siege-header.jpg",
      capsule: "/images/games/rainbow-six-siege-capsule.jpg",
      library: "/images/games/rainbow-six-siege-library.jpg",
      logo: "/images/games/rainbow-six-siege-logo.png"
    }
  },
  {
    name: "The Elder Scrolls Online",
    programId: "UGP-ESO-010",
    steamAppId: "306130",
    moduleName: "eso_module",
    status: "inactive",
    performance: { cpu: 0, memory: 0, fps: 0 },
    images: {
      header: "/images/games/elder-scrolls-online-header.jpg",
      capsule: "/images/games/elder-scrolls-online-capsule.jpg",
      library: "/images/games/elder-scrolls-online-library.jpg",
      logo: "/images/games/elder-scrolls-online-logo.png"
    }
  }
]

export default function Home() {
  const [games, setGames] = useState<GameInfo[]>(gamesData)
  const [selectedGame, setSelectedGame] = useState<GameInfo | null>(null)
  const [engineStatus, setEngineStatus] = useState<'online' | 'offline'>('offline')
  const [systemMetrics, setSystemMetrics] = useState({
    totalModules: 0,
    activeModules: 0,
    systemLoad: 0
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setGames(prevGames => 
        prevGames.map(game => ({
          ...game,
          performance: {
            cpu: game.status === 'active' ? Math.random() * 30 + 10 : 0,
            memory: game.status === 'active' ? Math.random() * 200000 + 100000 : 0,
            fps: game.status === 'active' ? Math.floor(Math.random() * 60 + 60) : 0
          }
        }))
      )
      
      setSystemMetrics({
        totalModules: games.length,
        activeModules: games.filter(g => g.status === 'active').length,
        systemLoad: Math.random() * 50 + 10
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [games])

  const handleModuleToggle = (programId: string) => {
    setGames(prevGames =>
      prevGames.map(game =>
        game.programId === programId
          ? { ...game, status: game.status === 'active' ? 'inactive' : 'active' }
          : game
      )
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gamer-primary via-gamer-secondary to-gamer-accent text-gamer-text">
      {/* Header */}
      <header className="bg-gamer-accent/50 backdrop-blur-lg border-b border-gamer-gray/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center space-x-4"
            >
              <Gamepad2 className="w-10 h-10 text-gamer-highlight" />
              <div>
                <h1 className="text-3xl font-bold font-gaming bg-gradient-to-r from-gamer-highlight to-module-blue bg-clip-text text-transparent">
                  GamerPro Control Panel
                </h1>
                <p className="text-gamer-gray text-sm">Professional Gaming Module Management System</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center space-x-6"
            >
              <StatusPanel status={engineStatus} />
              <PerformanceMonitor metrics={systemMetrics} />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gamer-accent/30 backdrop-blur-lg rounded-lg p-6 border border-gamer-gray/20">
            <div className="flex items-center justify-between">
              <Monitor className="w-8 h-8 text-module-blue" />
              <span className="text-2xl font-bold">{games.length}</span>
            </div>
            <p className="text-gamer-gray mt-2">Total Games</p>
          </div>

          <div className="bg-gamer-accent/30 backdrop-blur-lg rounded-lg p-6 border border-gamer-gray/20">
            <div className="flex items-center justify-between">
              <Cpu className="w-8 h-8 text-module-green" />
              <span className="text-2xl font-bold">{systemMetrics.activeModules}</span>
            </div>
            <p className="text-gamer-gray mt-2">Active Modules</p>
          </div>

          <div className="bg-gamer-accent/30 backdrop-blur-lg rounded-lg p-6 border border-gamer-gray/20">
            <div className="flex items-center justify-between">
              <Zap className="w-8 h-8 text-module-yellow" />
              <span className="text-2xl font-bold">{systemMetrics.systemLoad.toFixed(1)}%</span>
            </div>
            <p className="text-gamer-gray mt-2">System Load</p>
          </div>

          <div className="bg-gamer-accent/30 backdrop-blur-lg rounded-lg p-6 border border-gamer-gray/20">
            <div className="flex items-center justify-between">
              <Shield className="w-8 h-8 text-gamer-highlight" />
              <span className="text-2xl font-bold">{engineStatus === 'online' ? 'ONLINE' : 'OFFLINE'}</span>
            </div>
            <p className="text-gamer-gray mt-2">Engine Status</p>
          </div>
        </motion.div>

        {/* Games Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {games.map((game, index) => (
            <GameCard
              key={game.programId}
              game={game}
              onToggle={() => handleModuleToggle(game.programId)}
              onSelect={() => setSelectedGame(game)}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Selected Game Details */}
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedGame(null)}
          >
            <motion.div
              className="bg-gamer-secondary rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gamer-gray/20"
              onClick={(e) => e.stopPropagation()}
            >
              <ModuleControl game={selectedGame} onClose={() => setSelectedGame(null)} />
            </motion.div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gamer-accent/50 backdrop-blur-lg border-t border-gamer-gray/20 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <p className="text-gamer-gray">© 2026 GamerPro Control Panel. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <Settings className="w-5 h-5 text-gamer-gray" />
              <span className="text-gamer-gray text-sm">Version 1.0.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
