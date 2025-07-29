# Claude Code Web UI - Production Build

This product is in alpha state. There is not authentication! So you need to bring your own via a reverse proxy.

This is the production build of Claude Code Web UI, a web-based interface for interacting with Claude Code CLI.

<img width="887" height="714" alt="Scherm­afbeelding 2025-07-29 om 22 02 22" src="https://github.com/user-attachments/assets/8652996a-5622-4fbb-ac78-7b8c872060a4" />

## Video
https://github.com/user-attachments/assets/418a2aba-829c-40f5-9b04-8e92eae4e8e3

## Prerequisites

- Node.js 18+ 
- Claude Code CLI installed and configured

## Running the Application

1. Git clone
   ```bash
   git clone https://github.com/lennardv2/claude-code-web-ui && cd ./claude-code-web-ui
   ```

3. Run it:
   ```bash
   node server/index.mjs
   ```

It will then listen on port 3000. BE AWARE: there is no authentication. So everyone with access to that port control your environment/computer.

## Configuration

### Port Configuration

To run on a different port:
```bash
PORT=8080 node ./server/index.mjs
```

## Support

For issues and documentation, visit the Claude Code UI repository.
