# Claude Code Web UI

This product is in alpha state. There is not authentication! So you need to bring your own via a reverse proxy.

This is the production build of Claude Code Web UI, a web-based interface for interacting with Claude Code CLI.

## Video
https://github.com/user-attachments/assets/418a2aba-829c-40f5-9b04-8e92eae4e8e3

## Prerequisites

- Node.js 18+ 
- Claude Code CLI installed and configured

## Running the Application

1. Git clone
   ```bash
   git clone https://github.com/lennardv2/claude-code-web-ui && cd ./claude-code-web-ui/sercer
   ```

2. Install packages:
   ```bash
   npm install
   ```
3. Run it
   ```bash
   node index.mjs
   ```

It will then listen on port 3000. BE AWARE: there is no authentication. So everyone with access to that port control your environment/computer.

## Configuration

### Port Configuration

To run on a different port:
```bash
PORT=8080 node ./server/index.mjs
```

### Path

To run on a different subpath (behind a reverse proxy) for example:
```bash
APP_BASE_URL=/claude-code node ./server/index.mjs
```

## Image
<img width="887" height="714" alt="472182159-8652996a-5622-4fbb-ac78-7b8c872060a4" src="https://github.com/user-attachments/assets/48cfdd4d-6a85-499f-b745-c88e34a262f4" />

## Support
For issues and documentation, visit the Claude Code UI repository.
