# CortexPrism Playwright Browser Agent

Give Cortex agents a real Chromium browser via Playwright — navigate, click, type, screenshot, and
extract structured data from web pages. The #1 most-demanded MCP capability, now available as a
native Cortex plugin.

## Installation

```bash
cortex plugin install cortex-plugin-playwright
```

Or install from local development:

```bash
git clone https://github.com/CortexPrism/cortex-plugin-playwright.git
cd cortex-plugin-playwright
cortex plugin install .
```

## Configuration

Configure in the Cortex UI under **Plugins → Playwright → Settings**:

**General**

| Setting            | Type    | Default | Description                                    |
| ------------------ | ------- | ------- | ---------------------------------------------- |
| `headless`         | boolean | `true`  | Run browser without a visible window           |
| `viewportWidth`    | number  | `1280`  | Default viewport width in pixels               |
| `viewportHeight`   | number  | `720`   | Default viewport height in pixels              |
| `defaultTimeoutMs` | number  | `30000` | Default timeout for operations in milliseconds |

### Playwright Runtime

For full browser automation (click, type, evaluate, real screenshots), install Playwright:

```bash
npx playwright install chromium
npx playwright install-deps
```

Without Playwright installed, `browser_navigate` and `browser_extract` fall back to HTTP fetch with
regex-based extraction.

## Tools

### `browser_navigate`

Navigate the browser to a URL. Returns page title and text content.

```json
{ "url": "https://example.com", "waitUntil": "networkidle" }
```

### `browser_click`

Click on an element matching a CSS selector.

```json
{ "selector": "#submit-button", "timeout": 5000 }
```

### `browser_type`

Type text into an input element.

```json
{ "selector": "#search-input", "text": "cortex prism plugins" }
```

### `browser_screenshot`

Take a screenshot of a web page by URL.

```json
{ "url": "https://example.com", "fullPage": true }
```

### `browser_extract`

Extract structured data from a web page using CSS selectors.

```json
{ "url": "https://example.com", "selector": "a.title", "attribute": "href", "multiple": true }
```

### `browser_evaluate`

Execute JavaScript in the browser context. Requires Playwright CLI installed.

```json
{ "script": "document.querySelectorAll('h2').length" }
```

### `browser_close`

Close the browser instance and release resources.

```json
{}
```

## Usage Example

```
> Navigate to the CortexPrism marketplace page and extract all plugin names

1. browser_navigate → { url: "https://cortexprism.io/marketplace" }
2. browser_extract → { url: "https://cortexprism.io/marketplace", selector: ".plugin-card h3", multiple: true }
→ Returns array of all plugin names
```

## Capabilities

| Capability      | Purpose                                             |
| --------------- | --------------------------------------------------- |
| `network:fetch` | Fetch web pages via HTTPS                           |
| `shell:run`     | Execute Playwright CLI for full browser interaction |
| `fs:read`       | Read local files if needed for browser automation   |

## Development

```bash
# Run tests
deno task test

# Format and lint
deno fmt && deno lint

# Test locally
cortex plugin install .
cortex plugin call cortex-plugin-playwright browser_navigate '{"url":"https://example.com"}'
```

## License

MIT
