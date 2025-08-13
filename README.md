# Claude Code Web – Web UI for Claude Code CLI

A browser-based interface for [Claude Code CLI](https://github.com/anthropic/claude-code) with extras like voice input, text-to-speech, drag-and-drop images, hotkeys, and a built-in todo sidebar.

## Quick Start

1. **Install** (requires Node.js 18+ and Claude Code CLI set up)

   ```bash
   npm install -g @sunpix/claude-code-web
   ```

2. **Run**

   ```bash
   claude-code-web
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

> ⚠️ **Security note:** No authentication is enabled by default. Anyone with access to the port can control your environment/computer. Run behind a firewall or proxy with auth.

---

## 📹 Demo Videos

https://github.com/user-attachments/assets/e787a7e3-4300-486d-bd20-4080c5ee255f


https://github.com/user-attachments/assets/418a2aba-829c-40f5-9b04-8e92eae4e8e3

(older version)

---

## Configuration

### Change Port

```bash
PORT=8080 claude-code-web
```

### Serve from Subpath (reverse proxy)

```bash
APP_BASE_URL=/claude-code claude-code-web
```

### Enable Whisper Mic Support

Requires OpenAI API key for speech-to-text:

```bash
OPENAI_API_KEY=sk_... claude-code-web
```

---

## Screenshot

<img width="887" height="714" alt="Screenshot of Claude Code Web UI" src="https://github.com/user-attachments/assets/48cfdd4d-6a85-499f-b745-c88e34a262f4" />
