# Installation for OpenCode

1. Clone the repository:
   ```bash
   git clone https://github.com/Microck/animejs-mcp.git
   cd animejs-mcp
   npm install
   ```

2. Add to `opencode.json`:
   ```json
   "animejs": {
     "type": "local",
     "command": ["node", "/path/to/animejs-mcp/index.js"],
     "enabled": true
   }
   ```
