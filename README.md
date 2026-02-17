# void. — Scramjet Web Proxy

Clean web proxy using Scramjet (service worker interception) + libcurl-transport + wisp-js.

## What was wrong before (fixed)
- ❌ `wisp-server-node` → outdated, replaced with `@mercuryworkshop/wisp-js`
- ❌ `epoxy-transport` → replaced with `@mercuryworkshop/libcurl-transport` (more stable)
- ❌ `express` → replaced with `fastify` (what Scramjet-App uses)
- ❌ Old scramjet npm version → now uses `2.0.0-alpha` tarball (latest working release)
- ✅ Dockerfile included so platforms don't have to figure out the build

## Deploy to Railway (free, recommended)

1. Push this folder to a new GitHub repo  
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**  
3. Select your repo — Railway auto-detects the Dockerfile  
4. Done. You'll get a `*.up.railway.app` URL in ~2 minutes

## Deploy to Render (free)

1. Push to GitHub  
2. [dashboard.render.com](https://dashboard.render.com) → **New Web Service**  
3. Connect repo — `render.yaml` is auto-detected  
4. Done in ~3 minutes

## Run locally

```bash
npm install
node src/server.js
# open http://localhost:8080
```

Node.js 18+ required.

## Stack

| Package | Version | Role |
|---|---|---|
| `@mercuryworkshop/scramjet` | 2.0.0-alpha | Service worker proxy engine |
| `@mercuryworkshop/libcurl-transport` | ^1.5.2 | Transport layer (libcurl via WASM) |
| `@mercuryworkshop/bare-mux` | ^2.1.7 | Transport manager |
| `@mercuryworkshop/wisp-js` | ^0.4.1 | WebSocket tunnel server |
| `fastify` | ^5.4.0 | HTTP server |
