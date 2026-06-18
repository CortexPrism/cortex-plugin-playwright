# Changelog

## [Unreleased]

### Changed
- Renamed manifest file from `cortex.json` to `manifest.json` for consistency with Cortex standard
- Standardized UI section structure to `ui.settings` format
- Normalized parameter naming: `defaultValue` → `default`, `options` → `enum`
- Added `homepage` field with repository URL
- Added `dependencies` field to manifest

## [1.0.1] — 2026-06-15

### Added
- Initial release
## [1.0.1] — 2026-06-17

### Fixed

- Replaced non-existent `cortex/plugins` import with local `types.ts` containing inline type definitions
- Removed broken `cortex/plugins` import map from `deno.json`
- Fixed test files with complete mock contexts (`state.delete`, `state.list`, `config.get/set/getAll`, `logger`, `host`)
- Rewrote scaffold test files to test actual plugin tools instead of template leftovers
- Added `defaultValue` and `default` fields to `ToolParam` type for compatibility

## [1.0.0] — 2026-06-15

### Added

- Initial plugin scaffold: browser automation via Cortex tools
- **7 tools**: `browser_navigate`, `browser_click`, `browser_type`, `browser_screenshot`,
  `browser_extract`, `browser_evaluate`, `browser_close`
- HTTP-fetch fallback for navigation and extraction when Playwright CLI is unavailable
- Full Playwright CLI integration path via `shell:run` capability for interactive operations
- CSS selector-based data extraction with attribute and multi-element support
- Configurable viewport, headless mode, and timeout settings
- Lifecycle hooks: `onLoad` (loads config via `ctx.config.get()`), `onUnload`
- README with installation, configuration, tool reference, and Playwright setup instructions

### Changed

- (v1.0.0-rc1) Refactored to use spec-compliant `ToolContext` (no logger/config in execute)
- (v1.0.0-rc1) Moved config loading to `onLoad` lifecycle hook (module closure pattern)
- (v1.0.0-rc1) Replaced invented `sandbox` capability with `network:fetch`, `shell:run`, `fs:read`
- (v1.0.0-rc1) Fixed manifest `ui.settings` format to use `section`/`fields` nesting

### Dependencies

- Cortex >=1.0.0
- Deno v2.0+ runtime
- Playwright CLI (optional, for full browser interaction)
