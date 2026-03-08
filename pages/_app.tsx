import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Log website visitor to Discord
    const logVisitor = async () => {
      try {
        const userAgent = navigator.userAgent;
        const page = window.location.pathname;
        
        // Get IP address using a more reliable API
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ip = ipData.ip;
        
        // Send to Discord webhook
        const payload = {
          embeds: [{
            title: '🌐 Website Visitor',
            description: 'New visitor detected on GamerPro website',
            color: 16776960, // Yellow
            fields: [
              { name: 'IP Address', value: `\`${ip}\``, inline: true },
              { name: 'User Agent', value: userAgent.substring(0, 100), inline: false },
              { name: 'Page', value: page, inline: true },
              { name: 'Timestamp', value: new Date().toISOString(), inline: true }
            ],
            username: 'GamerPro Analytics Bot'
          }]
        };

        await fetch('https://discord.com/api/webhooks/1479988462479216883/94CF4OCoDPl1vcNWnzz81PPPFzHsjz8I-0kBgJGPW6u_uQ3YjY8fNAQPXJtsNwSeFsfw', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
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
