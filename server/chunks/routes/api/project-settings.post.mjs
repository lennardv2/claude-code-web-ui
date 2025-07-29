import { d as defineEventHandler, r as readBody, c as createError, e as extractProjectDirectory } from '../../nitro/nitro.mjs';
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

const projectSettings_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { projectId, settings } = body;
    if (!projectId) {
      throw createError({ statusCode: 400, statusMessage: "Project ID required" });
    }
    if (!settings) {
      throw createError({ statusCode: 400, statusMessage: "Settings data required" });
    }
    const projectDirectory = await extractProjectDirectory(projectId);
    const claudeDir = path.join(projectDirectory, ".claude");
    const settingsPath = path.join(claudeDir, "settings.json");
    try {
      await promises.mkdir(claudeDir, { recursive: true });
    } catch (error) {
      if (error.code !== "EEXIST") {
        throw error;
      }
    }
    const cleanedSettings = {};
    if (settings.env && typeof settings.env === "object") {
      cleanedSettings.env = settings.env;
    }
    if (typeof settings.includeCoAuthoredBy === "boolean") {
      cleanedSettings.includeCoAuthoredBy = settings.includeCoAuthoredBy;
    }
    if (typeof settings.cleanupPeriodDays === "number" && settings.cleanupPeriodDays > 0) {
      cleanedSettings.cleanupPeriodDays = settings.cleanupPeriodDays;
    }
    if (settings.permissions && typeof settings.permissions === "object") {
      cleanedSettings.permissions = {};
      if (typeof settings.permissions.defaultMode === "string") {
        const validModes = ["default", "acceptEdits", "plan", "bypassPermissions"];
        if (validModes.includes(settings.permissions.defaultMode)) {
          cleanedSettings.permissions.defaultMode = settings.permissions.defaultMode;
        }
      }
      if (Array.isArray(settings.permissions.allow)) {
        cleanedSettings.permissions.allow = settings.permissions.allow.filter(
          (item) => typeof item === "string" && item.trim()
        );
      }
      if (Array.isArray(settings.permissions.deny)) {
        cleanedSettings.permissions.deny = settings.permissions.deny.filter(
          (item) => typeof item === "string" && item.trim()
        );
      }
      if (Array.isArray(settings.permissions.additionalDirectories)) {
        cleanedSettings.permissions.additionalDirectories = settings.permissions.additionalDirectories.filter(
          (item) => typeof item === "string" && item.trim()
        );
      }
    }
    await promises.writeFile(settingsPath, JSON.stringify(cleanedSettings, null, 2), "utf8");
    return { success: true, message: "Settings saved successfully" };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to save project settings"
    });
  }
});

export { projectSettings_post as default };
//# sourceMappingURL=project-settings.post.mjs.map
