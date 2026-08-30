# Shop Search MCP

**Product search for AI agents with an executable buy-path** — search across Amazon and live Shopify storefronts, vet the merchant, build a cart, get a checkout URL. Pay-per-call over [MPP](https://mpp.dev) (HTTP 402): no API key, no signup, no account.

Run by [Light Anchor](https://lightanchor.ai), an agency operating real Amazon brands.

## Connect (remote MCP server)

**Claude Code:**
```bash
claude mcp add --transport http shop-search https://amazon.lightanchor.ai/mcp
```

**Cursor / Claude Desktop / other stdio-only clients** — use the bundled shim:
```json
{
  "mcpServers": {
    "shop-search": {
      "command": "npx",
      "args": ["-y", "github:Light-Anchor/shop-search-mcp"]
    }
  }
}
```

## Tools

| Tool | Cost | What it does |
|---|---|---|
| `shop_search_preview` | **free** | Top Amazon result for any product query (rate-limited) |
| `get_paid_endpoints` | **free** | The full pay-per-call API and how to pay |

## The full API (pay-per-call, MPP)

| Endpoint | Price | |
|---|---|---|
| `POST /v1/shop/search` | $0.05 | 20+ results: Amazon + live Shopify stores with agent-executable cart routes |
| `POST /v1/shop/cart` | $0.05 | Builds a real cart on any Shopify store → returns its checkout URL |
| `POST /v1/amazon/product` | $0.05 | Live ASIN snapshot: price, BSR, rating distribution, seller |
| `POST /v1/amazon/listing-audit` | $1.00 | Conversion audit: score, grade, ranked defects, top fixes |
| `POST /v1/review-insights` | $5.00 | Evidence-linked review analysis (async, free polling) |
| [`trust.lightanchor.ai`](https://trust.lightanchor.ai) `/v1/trust-check` | $0.25 | Merchant buy-safety verdict for any shop URL |

Agent setup one-liner: **`Read https://amazon.lightanchor.ai/skill.md and set it up`**

- Try it in a browser: [amazon.lightanchor.ai/demo](https://amazon.lightanchor.ai/demo)
- Docs: [llms.txt](https://amazon.lightanchor.ai/llms.txt) · [OpenAPI](https://amazon.lightanchor.ai/openapi.json)
- Payments settle via MPP `tempo.charge`; malformed inputs are rejected **before** payment settles — agents are never charged for typos.
