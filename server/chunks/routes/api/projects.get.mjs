import { d as defineEventHandler, g as getQuery, f as getProjects, c as createError, h as getSessionMessages, i as getSessions } from '../../nitro/nitro.mjs';
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

const projects_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const action = query.action;
    switch (action) {
      case "list":
        return await getProjects();
      case "sessions":
        const projectName = query.projectName;
        const limit = parseInt(query.limit) || 5;
        const offset = parseInt(query.offset) || 0;
        if (!projectName) {
          throw createError({ statusCode: 400, statusMessage: "Project name required" });
        }
        return await getSessions(projectName, limit, offset);
      case "messages":
        const msgProjectName = query.projectName;
        const sessionId = query.sessionId;
        if (!msgProjectName || !sessionId) {
          throw createError({ statusCode: 400, statusMessage: "Project name and session ID required" });
        }
        try {
          return await getSessionMessages(msgProjectName, sessionId);
        } catch (error) {
          throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.message || "Failed to fetch session messages"
          });
        }
      default:
        return await getProjects();
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Internal Server Error"
    });
  }
});

export { projects_get as default };
//# sourceMappingURL=projects.get.mjs.map
