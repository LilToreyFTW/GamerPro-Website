// Discord webhook API endpoint for static export
// This file is needed for static export builds

export default function handler(req, res) {
  res.status(200).json({ 
    message: "Discord API endpoint - Static Export Mode",
    note: "API routes are disabled in static export mode. Discord integration is handled client-side."
  });
}
