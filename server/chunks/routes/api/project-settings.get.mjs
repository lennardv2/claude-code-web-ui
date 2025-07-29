import { d as defineEventHandler, g as getQuery, c as createError, e as extractProjectDirectory } from '../../nitro/nitro.mjs';
import { promises } from 'fs';
import path from 'path';
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
import '@anthropic-ai/claude-code';
import 'fs/promises';
import 'readline';
import 'node:url';

const projectSettings_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const projectId = query.projectId;
    if (!projectId) {
      throw createError({ statusCode: 400, statusMessage: "Project ID required" });
    }
    const projectDirectory = await extractProjectDirectory(projectId);
    const settingsPath = path.join(projectDirectory, ".claude", "settings.json");
    try {
      const settingsContent = await promises.readFile(settingsPath, "utf8");
      const settings = JSON.parse(settingsContent);
      return settings;
    } catch (error) {
      if (error.code === "ENOENT") {
        return {
          env: {},
          includeCoAuthoredBy: true,
          cleanupPeriodDays: 30,
          permissions: {
            defaultMode: "acceptEdits",
            allow: [],
            deny: [],
            additionalDirectories: []
          }
        };
      } else {
        throw error;
      }
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to read project settings"
    });
  }
});

export { projectSettings_get as default };
//# sourceMappingURL=project-settings.get.mjs.map
