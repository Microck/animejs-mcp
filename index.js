#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
  {
    name: 'animejs-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'animate',
        description: 'Generate Anime.js animation code for specific elements. Supports CSS properties, transforms, and SVG attributes.',
        inputSchema: {
          type: 'object',
          properties: {
            targets: {
              type: 'string',
              description: 'CSS selector or target elements (e.g. ".box", "#el", "path")',
            },
            properties: {
              type: 'object',
              description: 'Animation properties (e.g. { translateX: 250, opacity: 0.5 })',
            },
            duration: {
              type: 'number',
              description: 'Duration in milliseconds',
              default: 1000,
            },
            easing: {
              type: 'string',
              description: 'Easing function name (e.g. "easeInOutQuad", "spring(1, 80, 10, 0)")',
              default: 'easeOutElastic(1, .5)',
            },
            delay: {
              type: 'number',
              description: 'Delay in milliseconds',
              default: 0,
            },
            loop: {
              type: 'boolean',
              description: 'Loop animation',
              default: false,
            },
            direction: {
              type: 'string',
              enum: ['normal', 'reverse', 'alternate', 'alternate-reverse'],
              default: 'normal',
            },
          },
          required: ['targets', 'properties'],
        },
      },
      {
        name: 'timeline',
        description: 'Generate Anime.js timeline code for sequencing multiple animations.',
        inputSchema: {
          type: 'object',
          properties: {
            animations: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  targets: { type: 'string' },
                  properties: { type: 'object' },
                  offset: { type: 'string', description: 'Timeline offset (e.g. "-=500")' },
                },
                required: ['targets', 'properties'],
              },
            },
            loop: {
              type: 'boolean',
              default: false,
            },
          },
          required: ['animations'],
        },
      },
      {
        name: 'stagger',
        description: 'Generate Anime.js stagger effect code.',
        inputSchema: {
          type: 'object',
          properties: {
            targets: { type: 'string', description: 'CSS selector for multiple elements' },
            property: { type: 'string', description: 'Property to animate (e.g. "translateY")' },
            value: { type: 'number', description: 'Target value' },
            delay: { type: 'number', description: 'Stagger delay per element' },
            start: { type: 'number', description: 'Start delay', default: 0 },
            from: { type: 'string', description: 'Stagger starting position (center, last, first)', default: 'first' },
          },
          required: ['targets', 'property', 'value', 'delay'],
        },
      },
      {
        name: 'svg_path',
        description: 'Generate Anime.js SVG path animation code (motion path).',
        inputSchema: {
          type: 'object',
          properties: {
            pathSelector: { type: 'string', description: 'Selector for the SVG path element' },
            targetSelector: { type: 'string', description: 'Selector for the element to move along path' },
            duration: { type: 'number', default: 2000 },
          },
          required: ['pathSelector', 'targetSelector'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'animate') {
    const { targets, properties, duration, easing, delay, loop, direction } = args;
    const code = `
anime({
  targets: '${targets}',
  ...${JSON.stringify(properties)},
  duration: ${duration},
  easing: '${easing}',
  delay: ${delay},
  loop: ${loop},
  direction: '${direction}'
});`;
    return { content: [{ type: 'text', text: code.trim() }] };
  }

  if (name === 'timeline') {
    const { animations, loop } = args;
    let code = `const tl = anime.timeline({ loop: ${loop} });\n\ntl`;
    animations.forEach((anim) => {
      const { targets, properties, offset } = anim;
      const offsetStr = offset ? `, '${offset}'` : '';
      code += `\n  .add({\n    targets: '${targets}',\n    ...${JSON.stringify(properties)}\n  }${offsetStr})`;
    });
    code += ';';
    return { content: [{ type: 'text', text: code }] };
  }

  if (name === 'stagger') {
    const { targets, property, value, delay, start, from } = args;
    const code = `
anime({
  targets: '${targets}',
  ${property}: ${value},
  delay: anime.stagger(${delay}, { start: ${start}, from: '${from}' })
});`;
    return { content: [{ type: 'text', text: code.trim() }] };
  }

  if (name === 'svg_path') {
    const { pathSelector, targetSelector, duration } = args;
    const code = `
const path = anime.path('${pathSelector}');
anime({
  targets: '${targetSelector}',
  translateX: path('x'),
  translateY: path('y'),
  rotate: path('angle'),
  easing: 'linear',
  duration: ${duration},
  loop: true
});`;
    return { content: [{ type: 'text', text: code.trim() }] };
  }

  throw new Error(`Tool ${name} not found`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
