# animejs-mcp

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
