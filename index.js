#!/usr/bin/env node
// stdio -> HTTP shim for the Shop Search remote MCP server.
// Forwards newline-delimited JSON-RPC from stdin to https://amazon.lightanchor.ai/mcp.
import { createInterface } from 'node:readline'

const URL = process.env.SHOP_SEARCH_MCP_URL || 'https://amazon.lightanchor.ai/mcp'
const rl = createInterface({ input: process.stdin })
rl.on('line', async (line) => {
  const trimmed = line.trim()
  if (!trimmed) return
  let msg
  try { msg = JSON.parse(trimmed) } catch { return }
  try {
    const r = await fetch(URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(msg) })
    if (r.status === 202) return // notification, no response
    const out = await r.json()
    if (out !== null && msg.id !== undefined) process.stdout.write(JSON.stringify(out) + '\n')
  } catch (e) {
    if (msg.id !== undefined)
      process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: msg.id, error: { code: -32000, message: String(e.message) } }) + '\n')
  }
})
