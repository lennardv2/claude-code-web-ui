import { d as defineEventHandler, l as getRouterParam, c as createError, m as getActiveSession } from '../../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'stream';
import 'events';
import 'http';
import 'crypto';
import 'buffer';
import 'zlib';
import 'https';
import 'net';
import 'tls';
import 'url';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'path';
import '@anthropic-ai/claude-code';
import 'fs';
import 'fs/promises';
import 'readline';
import 'node:url';

const status_get = defineEventHandler(async (event) => {
  try {
    const sessionId = getRouterParam(event, "sessionId");
    if (!sessionId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Session ID required"
      });
    }
    const sessionInfo = getActiveSession(sessionId);
    return {
      sessionId,
      alive: sessionInfo !== null,
      busy: (sessionInfo == null ? void 0 : sessionInfo.busy) || false,
      projectId: (sessionInfo == null ? void 0 : sessionInfo.projectId) || null,
      startTime: (sessionInfo == null ? void 0 : sessionInfo.startTime) || null,
      lastActivity: (sessionInfo == null ? void 0 : sessionInfo.lastActivity) || null
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Internal Server Error"
    });
  }
});

export { status_get as default };
//# sourceMappingURL=status.get.mjs.map
