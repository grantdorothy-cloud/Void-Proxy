# void. — Scramjet Web Proxy

A clean, production-ready web proxy powered by **Scramjet** (service worker interception), **EpoxyTransport**, and a **Wisp WebSocket server**.

Supports: Google, YouTube, Discord, Spotify, Reddit, Twitch, GitHub, and most other sites.

---

## Stack

| Component | Role |
|---|---|
| [Scramjet](https://github.com/MercuryWorkshop/scramjet) | Service worker that intercepts and rewrites all page requests |
| [EpoxyTransport](https://github.com/MercuryWorkshop/EpoxyTransport) | Encrypted Wisp-based HTTP transport layer |
| [bare-mux](https://github.com/MercuryWorkshop/bare-mux) | Transport manager that connects Scramjet ↔ Epoxy |
| [wisp-server-node](https://github.com/MercuryWorkshop/wisp-server-node) | WebSocket tunnel server (runs on your backend) |

---

## Quick Start (Local)

```bash
# 1. Install dependencies
npm install

# 2. Run the server
npm start

# 3. Open in browser
open http://localhost:3000
```

> **Node.js 18+** is required.

---

## File Structure

```
void-proxy/
├── public/
│   ├── index.html   ← Frontend UI
│   └── sw.js        ← Scramjet service worker
├── src/
│   └── server.js    ← Express + Wisp backend
└── package.json
```

The server automatically serves Scramjet's built assets from `node_modules` under these routes:
- `/scram/`   → Scramjet JS/WASM bundles
- `/baremux/` → BareMux transport worker
- `/epoxy/`   → EpoxyTransport WASM module
- `/wisp/`    → WebSocket Wisp tunnel

---

## Deploy to Railway (Free)

1. Push this folder to a GitHub repo
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Set start command: `npm start`
4. Done — Railway gives you a public URL

## Deploy to Render (Free)

1. Push to GitHub
2. New Web Service → connect repo
3. Build command: `npm install`
4. Start command: `npm start`
5. Done

## Deploy to Heroku

```bash
heroku create my-void-proxy
git push heroku main
```

---

## Notes

- **Service Workers require HTTPS** in production. All major free hosts (Railway, Render, Heroku) provide HTTPS automatically.
- **localhost** works fine for local dev (browsers allow SW on localhost without HTTPS).
- The proxy does **not log** your browsing — traffic flows through your own Wisp server.
- For high traffic, consider rotating IPs or using Cloudflare proxying to avoid CAPTCHA rate limits on some sites.
