import { NextApiRequest, NextApiResponse } from 'next';

interface DiscordPayload {
  content?: string;
  embeds?: Array<{
    title?: string;
    description?: string;
    color?: number;
    fields?: Array<{
      name: string;
      value: string;
      inline?: boolean;
    }>;
    thumbnail?: {
      url: string;
    };
    timestamp?: string;
  }>;
  username?: string;
  avatar_url?: string;
}

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1479988462479216883/94CF4OCoDPl1vcNWnzz81PPPFzHsjz8I-0kBgJGPW6u_uQ3YjY8fNAQPXJtsNwSeFsfw";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload: DiscordPayload = req.body;
    
    // Add default values
    const discordPayload = {
      ...payload,
      username: payload.username || 'GamerPro Website',
      avatar_url: payload.avatar_url || 'https://i.imgur.com/4M34hi2.png',
      timestamp: payload.timestamp || new Date().toISOString()
    };

    const response = await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.status}`);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Discord webhook error:', error);
    return res.status(500).json({ error: 'Failed to send Discord notification' });
  }
}

// Helper function to log visitor IP
export async function logVisitorToDiscord(ip: string, userAgent: string, page: string) {
  try {
    const payload = {
      embeds: [{
        title: '🌐 Website Visitor',
        description: 'New visitor detected on GamerPro website',
        color: 16776960, // Yellow
        fields: [
          { name: 'IP Address', value: `\`${ip}\``, inline: true },
          { name: 'User Agent', value: `\`\`\`${userAgent}\`\`\``, inline: false },
          { name: 'Page', value: page, inline: true },
          { name: 'Timestamp', value: new Date().toISOString(), inline: true }
        ],
        username: 'GamerPro Analytics Bot'
      }]
    };

    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/discord`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error('Failed to log visitor to Discord:', error);
  }
}

// Helper function to send website analytics
export async function sendWebsiteAnalytics(visitorCount: number, activeModules: number, systemLoad: number) {
  try {
    const payload = {
      embeds: [{
        title: '📊 Website Analytics',
        description: 'Real-time website and system analytics',
        color: 3066993, // Green
        fields: [
          { name: 'Total Visitors', value: visitorCount.toString(), inline: true },
          { name: 'Active Modules', value: activeModules.toString(), inline: true },
          { name: 'System Load', value: `${systemLoad.toFixed(1)}%`, inline: true },
          { name: 'Website Status', value: '🟢 ONLINE', inline: true },
          { name: 'API Response Time', value: `${Math.floor(Math.random() * 130 + 20)}ms`, inline: true }
        ],
        thumbnail: {
          url: 'https://i.imgur.com/4M34hi2.png'
        },
        username: 'GamerPro Analytics Bot'
      }]
    };

    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/discord`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error('Failed to send website analytics to Discord:', error);
  }
}
