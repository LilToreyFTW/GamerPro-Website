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
      avatar_url: payload.avatar_url || 'https://i.imgur.com/4M34hi2.png'
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
