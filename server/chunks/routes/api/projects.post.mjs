import { d as defineEventHandler, r as readBody, c as createError, j as addProjectManually } from '../../nitro/nitro.mjs';
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

const projects_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { projectPath, displayName } = body;
    if (!projectPath) {
      throw createError({
        statusCode: 400,
        statusMessage: "Project path is required"
      });
    }
    return await addProjectManually(projectPath, displayName);
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Internal Server Error"
    });
  }
});

export { projects_post as default };
//# sourceMappingURL=projects.post.mjs.map
