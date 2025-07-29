import { d as defineEventHandler, g as getQuery, c as createError, a as deleteSession, b as deleteProject } from '../../nitro/nitro.mjs';
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

const projects_delete = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { projectName, sessionId } = query;
    if (!projectName) {
      throw createError({
        statusCode: 400,
        statusMessage: "Project name is required"
      });
    }
    if (sessionId) {
      return await deleteSession(projectName, sessionId);
    } else {
      return await deleteProject(projectName);
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Internal Server Error"
    });
  }
});

export { projects_delete as default };
//# sourceMappingURL=projects.delete.mjs.map
