# animejs-mcp
<p>
  <a href="https://github.com/Microck/opencode-studio"><img src="https://img.shields.io/badge/opencode-studio-brown?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAABiElEQVR4nF2Sv0tWcRTGPyeVIpCWwmyJGqQagsqCsL2hhobsD3BvdWhoj/6CiIKaoqXBdMjKRWwQgqZ%2BokSvkIhg9BOT9xPn9Vx79cD3cu6953zP8zznCQB1V0S01d3AKeAKcBVYA94DjyJioru2k9SHE%2Bqc%2Bkd9rL7yf7TUm%2BpQ05yPUM%2Bo626Pp%2BqE2q7GGfWrOpjNnWnAOPAGeAK8Bb4U5D3AJ%2BAQsAAMAHfVvl7gIrAf2Kjiz8BZYB3YC/wFpoGDwHfgEnA0oU7tgHiheEShyXxY/Vn/n6ljye8DcBiYAloRcV3tAdrV1xMRG%2Bo94DywCAwmx33AJHASWK7iiAjzNFOBl7WapPYtYdyo8RlLqVpOVPvq9KoH1NUuOneycaRefqnP1ftdUyiOt5KS%2BqLWdDpVzTXMl5It4Jr6u%2BQ/nhyBc8C7jpowGxGvmxuPqT9qyYuFIKdP71B8WT3SOKexXLrntvqxq3BefaiuFMQ0wqZftxl3M78MjBasfiDN/SAi0kFbtf8ACtKBWZBDoJEAAAAASUVORK5CYII%3D" alt="Add with OpenCode Studio" /></a>
</p>

an expert animation advisor mcp that generates production-ready anime.js code for your web projects. it handles timelines, staggering, motion paths, and complex sequences via simple natural language commands.

## installation

**note:** installation is streamlined for ai-native environments.

### codex

tell codex:

```
Fetch and follow instructions from https://raw.githubusercontent.com/microck/animejs-mcp/master/.codex/INSTALL.md
```

### opencode

tell opencode:

```
Fetch and follow instructions from https://raw.githubusercontent.com/microck/animejs-mcp/master/.opencode/INSTALL.md
```

## features

-   **instant animations**: generate css/svg animations for single or multiple elements with one prompt.
-   **timeline builder**: create complex sequencing with `anime.timeline()` to orchestrate multiple effects.
-   **stagger effects**: automatically generate stagger code for grids, lists, and text.
-   **motion paths**: create svg path following animations (`anime.path()`).
-   **easing expert**: suggests the best easing functions (`spring`, `elastic`, `steps`) based on your description.

## usage

### tools

-   `animate`: generate basic animation code for specific elements.
-   `timeline`: generate timeline code for sequencing multiple animations.
-   `stagger`: generate stagger effect code.
-   `svg_path`: generate svg path animation code.

### example

```json
{
  "name": "animate",
  "arguments": {
    "targets": ".box",
    "properties": { "translateX": 250, "rotate": "1turn" },
    "duration": 800,
    "easing": "easeInOutSine"
  }
}
```

```json
{
  "name": "timeline",
  "arguments": {
    "animations": [
      { "targets": ".el-1", "properties": { "opacity": 1 } },
      { "targets": ".el-2", "properties": { "opacity": 1 }, "offset": "-=500" }
    ],
    "loop": true
  }
}
```

## license

mit
