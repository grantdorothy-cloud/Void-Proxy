import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import { scramjetPath } from "@mercuryworkshop/scramjet/path";
import { baremuxPath } from "@mercuryworkshop/bare-mux/path";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport/path";
import { createServer } from "@mercuryworkshop/wisp-js/server";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import path from "path";
import http from "http";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8080;

const app = Fastify({ logger: false });

// ── Serve your frontend (public/) ──────────────────────────────
await app.register(FastifyStatic, {
  root: path.join(__dirname, "../public"),
  prefix: "/",
  decorateReply: false,
});

// ── Serve Scramjet bundles (/scram/) ───────────────────────────
await app.register(FastifyStatic, {
  root: scramjetPath,
  prefix: "/scram/",
  decorateReply: false,
});

// ── Serve BareMux worker (/baremux/) ──────────────────────────
await app.register(FastifyStatic, {
  root: baremuxPath,
  prefix: "/baremux/",
  decorateReply: false,
});

// ── Serve libcurl transport (/libcurl/) ───────────────────────
await app.register(FastifyStatic, {
  root: libcurlPath,
  prefix: "/libcurl/",
  decorateReply: false,
});

// ── Build the HTTP server and attach Wisp (/wisp/) ────────────
const server = http.createServer(app.server ? undefined : app.server);

// Fastify exposes its underlying http.Server at app.server
// We need to hook into the upgrade event for WebSocket (Wisp)
app.server.on("upgrade", (req, socket, head) => {
  if (req.url.startsWith("/wisp/")) {
    createServer({ request: req, socket, head });
  } else {
    socket.destroy();
  }
});

// ── Start ──────────────────────────────────────────────────────
try {
  await app.listen({ port: PORT, host: "0.0.0.0" });
  console.log(`\n  ✦  void proxy running → http://localhost:${PORT}\n`);
} catch (err) {
  console.error("Server failed to start:", err);
  process.exit(1);
}
