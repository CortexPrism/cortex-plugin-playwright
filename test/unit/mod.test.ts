import { assertEquals, assertStringIncludes } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { tools } from '../../mod.ts';
import type { PluginContext, ToolContext } from '../../types.ts';

// Mock PluginContext
const mockContext: PluginContext & ToolContext = {
  pluginId: 'cortex-plugin-playwright',
  pluginDir: '/tmp/plugins/cortex-plugin-playwright',
  state: {
    get: async () => null,
    set: async () => {},
    delete: async () => {},
    list: async () => ({}),
  },
  config: {
    get: async () => null,
    set: async () => {},
    getAll: async () => ({}),
  },
  logger: {
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
  },
  host: {
    registerTool: () => {},
    unregisterTool: () => {},
  },
  sessionId: 'test-session',
  workingDir: '/tmp',
  agentId: 'test-agent',
  workspaceDir: '/tmp',
};

function findTool(name: string) {
  const tool = tools.find((t) => t.definition.name === name);
  if (!tool) throw new Error(`Tool "${name}" not found`);
  return tool;
}

Deno.test('tools array — exports all tools', () => {
  assertEquals(tools.length, 7);
  assertEquals(tools[0].definition.name, 'browser_navigate');
  assertEquals(tools[1].definition.name, 'browser_click');
  assertEquals(tools[2].definition.name, 'browser_type');
  assertEquals(tools[3].definition.name, 'browser_screenshot');
  assertEquals(tools[4].definition.name, 'browser_extract');
  assertEquals(tools[5].definition.name, 'browser_evaluate');
  assertEquals(tools[6].definition.name, 'browser_close');
});

Deno.test('browser_navigate — rejects empty url', async () => {
  const tool = findTool('browser_navigate');
  const result = await tool.execute({ 'url': '' }, mockContext);
  assertEquals(result.success, false);
  assertStringIncludes(result.error ?? '', 'non-empty string');
});

Deno.test('browser_click — rejects empty selector', async () => {
  const tool = findTool('browser_click');
  const result = await tool.execute({ 'selector': '' }, mockContext);
  assertEquals(result.success, false);
  assertStringIncludes(result.error ?? '', 'non-empty string');
});

Deno.test('browser_type — rejects empty selector', async () => {
  const tool = findTool('browser_type');
  const result = await tool.execute({ 'selector': '' }, mockContext);
  assertEquals(result.success, false);
  assertStringIncludes(result.error ?? '', 'non-empty string');
});

Deno.test('browser_screenshot — tool is defined with name and description', () => {
  const tool = findTool('browser_screenshot');
  assertEquals(typeof tool.definition.description, 'string');
  assertEquals(tool.definition.description.length > 0, true);
});

Deno.test('browser_extract — rejects empty url', async () => {
  const tool = findTool('browser_extract');
  const result = await tool.execute({ 'url': '' }, mockContext);
  assertEquals(result.success, false);
  assertStringIncludes(result.error ?? '', 'non-empty string');
});

Deno.test('browser_evaluate — rejects empty script', async () => {
  const tool = findTool('browser_evaluate');
  const result = await tool.execute({ 'script': '' }, mockContext);
  assertEquals(result.success, false);
  assertStringIncludes(result.error ?? '', 'non-empty string');
});

Deno.test('browser_close — tool is defined with name and description', () => {
  const tool = findTool('browser_close');
  assertEquals(typeof tool.definition.description, 'string');
  assertEquals(tool.definition.description.length > 0, true);
});

Deno.test('all tools return durationMs', async () => {
  for (const tool of tools) {
    const args: Record<string, unknown> = {};
    const result = await tool.execute(args, mockContext);
    assertEquals(typeof result.durationMs, 'number');
    assertEquals(result.durationMs >= 0, true);
  }
});
