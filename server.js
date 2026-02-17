import express from 'express';
import { createServer } from 'http';
import { scramjetPath }  from '@mercuryworkshop/scramjet/path';
import { baremuxPath }   from '@mercuryworkshop/bare-mux/path';
import { epoxyPath }     from '@mercuryworkshop/epoxy-transport/path';
import { wisp }          from 'wisp-server-node';
import path              from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);

// ── Static: your frontend ──────────────────────────────────────
app.use(express.static(path.join(__dirname, '../public')));

// ── Scramjet built assets (/scram/) ───────────────────────────
app.use('/scram/', express.static(scramjetPath));

// ── BareMux worker (/baremux/) ────────────────────────────────
app.use('/baremux/', express.static(baremuxPath));

// ── Epoxy transport (/epoxy/) ─────────────────────────────────
app.use('/epoxy/', express.static(epoxyPath));

// ── Wisp WebSocket server (/wisp/) ────────────────────────────
// The Scramjet frontend (via EpoxyTransport) tunnels all HTTP
// requests through this Wisp endpoint.
server.on('upgrade', (req, socket, head) => {
  if (req.url.startsWith('/wisp/')) {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.end();
  }
});

server.listen(PORT, () => {
  console.log(`\n  ✦  Void Proxy (Scramjet) running at http://localhost:${PORT}\n`);
});
