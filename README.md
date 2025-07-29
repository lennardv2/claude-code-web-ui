# Claude Code Web UI - Production Build

This is the production build of Claude Code Web UI, a web-based interface for interacting with Claude Code CLI.

<img width="887" height="714" alt="Scherm­afbeelding 2025-07-29 om 22 02 22" src="https://github.com/user-attachments/assets/8652996a-5622-4fbb-ac78-7b8c872060a4" />

## Prerequisites

- Node.js 18+ 
- Claude Code CLI installed and configured
- npm or yarn package manager

## Installation

1. Extract this build to your desired location

2. Install production dependencies:
   ```bash
   npm install --production
   ```

3. Set up environment variables (if needed):
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## Running the Application

Start the production server:
```bash
node ./server/index.mjs
```

The application will be available at `http://localhost:3000` by default.

### Using PM2 (Recommended for production)

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start ./server/index.mjs --name "claude-code-ui"

# Save PM2 configuration
pm2 save
pm2 startup
```

### Using systemd (Linux)

Create a service file at `/etc/systemd/system/claude-code-ui.service`:

```ini
[Unit]
Description=Claude Code UI
After=network.target

[Service]
Type=simple
User=youruser
WorkingDirectory=/path/to/claude-code-ui/.output
ExecStart=/usr/bin/node ./server/index.mjs
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl enable claude-code-ui
sudo systemctl start claude-code-ui
```

## Configuration

### Port Configuration

To run on a different port:
```bash
PORT=8080 node ./server/index.mjs
```

### HTTPS Configuration

For HTTPS, use a reverse proxy like nginx or caddy.

## Troubleshooting

- Ensure Claude Code CLI is properly installed and accessible
- Check that the port (default 3000) is not in use
- Verify Node.js version is 18 or higher
- Check logs for any error messages

## Support

For issues and documentation, visit the Claude Code UI repository.
