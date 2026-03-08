import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { logVisitorToDiscord } from './api/discord'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Log website visitor to Discord
    const logVisitor = async () => {
      try {
        const userAgent = navigator.userAgent;
        const page = window.location.pathname;
        
        // Get IP address (using a simple API)
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ip = ipData.ip;
        
        await logVisitorToDiscord(ip, userAgent, page);
      } catch (error) {
        console.error('Failed to log visitor:', error);
      }
    };

    logVisitor();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Component {...pageProps} />
    </motion.div>
  )
}
