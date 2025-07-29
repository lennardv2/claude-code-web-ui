// (c) Anthropic PBC. All rights reserved. Use is subject to Anthropic's Commercial Terms of Service (https://www.anthropic.com/legal/commercial-terms).

// Version: 1.0.59

// src/entrypoints/sdk.ts
import { spawn } from "child_process";
import { join } from "path";
import { fileURLToPath } from "url";
import { createInterface } from "readline";
import { existsSync } from "fs";

// src/utils/stream.ts
class Stream {
  returned;
  queue = [];
  readResolve;
  readReject;
  isDone = false;
  hasError;
  started = false;
  constructor(returned) {
    this.returned = returned;
  }
  [Symbol.asyncIterator]() {
    if (this.started) {
      throw new Error("Stream can only be iterated once");
    }
    this.started = true;
    return this;
  }
  next() {
    if (this.queue.length > 0) {
      return Promise.resolve({
        done: false,
        value: this.queue.shift()
      });
    }
    if (this.isDone) {
      return Promise.resolve({ done: true, value: undefined });
    }
    if (this.hasError) {
      return Promise.reject(this.hasError);
    }
    return new Promise((resolve, reject) => {
      this.readResolve = resolve;
      this.readReject = reject;
    });
  }
  enqueue(value) {
    if (this.readResolve) {
      const resolve = this.readResolve;
      this.readResolve = undefined;
      this.readReject = undefined;
      resolve({ done: false, value });
    } else {
      this.queue.push(value);
    }
  }
  done() {
    this.isDone = true;
    if (this.readResolve) {
      const resolve = this.readResolve;
      this.readResolve = undefined;
      this.readReject = undefined;
      resolve({ done: true, value: undefined });
    }
  }
  error(error) {
    this.hasError = error;
    if (this.readReject) {
      const reject = this.readReject;
      this.readResolve = undefined;
      this.readReject = undefined;
      reject(error);
    }
  }
  return() {
    this.isDone = true;
    if (this.returned) {
      this.returned();
    }
    return Promise.resolve({ done: true, value: undefined });
  }
}

// src/utils/abortController.ts
import { setMaxListeners } from "events";
var DEFAULT_MAX_LISTENERS = 50;
function createAbortController(maxListeners = DEFAULT_MAX_LISTENERS) {
  const controller = new AbortController;
  setMaxListeners(maxListeners, controller.signal);
  return controller;
}

// src/entrypoints/sdk.ts
function query({
  prompt,
  options: {
    abortController = createAbortController(),
    allowedTools = [],
    appendSystemPrompt,
    customSystemPrompt,
    cwd,
    disallowedTools = [],
    executable = isRunningWithBun() ? "bun" : "node",
    executableArgs = [],
    maxTurns,
    mcpServers,
    pathToClaudeCodeExecutable,
    permissionMode = "default",
    permissionPromptToolName,
    canUseTool,
    continue: continueConversation,
    resume,
    model,
    fallbackModel,
    strictMcpConfig,
    stderr,
    env
  } = {}
}) {
  if (!env) {
    env = { ...process.env };
  }
  if (!env.CLAUDE_CODE_ENTRYPOINT) {
    env.CLAUDE_CODE_ENTRYPOINT = "sdk-ts";
  }
  if (pathToClaudeCodeExecutable === undefined) {
    const filename = fileURLToPath(import.meta.url);
    const dirname = join(filename, "..");
    pathToClaudeCodeExecutable = join(dirname, "cli.js");
  }
  const args = ["--output-format", "stream-json", "--verbose"];
  if (customSystemPrompt)
    args.push("--system-prompt", customSystemPrompt);
  if (appendSystemPrompt)
    args.push("--append-system-prompt", appendSystemPrompt);
  if (maxTurns)
    args.push("--max-turns", maxTurns.toString());
  if (model)
    args.push("--model", model);
  if (canUseTool) {
    if (typeof prompt === "string") {
      throw new Error("canUseTool callback requires --input-format stream-json. Please set prompt as an AsyncIterable.");
    }
    if (permissionPromptToolName) {
      throw new Error("canUseTool callback cannot be used with permissionPromptToolName. Please use one or the other.");
    }
    permissionPromptToolName = "stdio";
  }
  if (permissionPromptToolName) {
    args.push("--permission-prompt-tool", permissionPromptToolName);
  }
  if (continueConversation)
    args.push("--continue");
  if (resume)
    args.push("--resume", resume);
  if (allowedTools.length > 0) {
    args.push("--allowedTools", allowedTools.join(","));
  }
  if (disallowedTools.length > 0) {
    args.push("--disallowedTools", disallowedTools.join(","));
  }
  if (mcpServers && Object.keys(mcpServers).length > 0) {
    args.push("--mcp-config", JSON.stringify({ mcpServers }));
  }
  if (strictMcpConfig) {
    args.push("--strict-mcp-config");
  }
  if (permissionMode !== "default") {
    args.push("--permission-mode", permissionMode);
  }
  if (fallbackModel) {
    if (model && fallbackModel === model) {
      throw new Error("Fallback model cannot be the same as the main model. Please specify a different model for fallbackModel option.");
    }
    args.push("--fallback-model", fallbackModel);
  }
  if (typeof prompt === "string") {
    args.push("--print", prompt.trim());
  } else {
    args.push("--input-format", "stream-json");
  }
  if (!existsSync(pathToClaudeCodeExecutable)) {
    throw new ReferenceError(`Claude Code executable not found at ${pathToClaudeCodeExecutable}. Is options.pathToClaudeCodeExecutable set?`);
  }
  logDebug(`Spawning Claude Code process: ${executable} ${[...executableArgs, pathToClaudeCodeExecutable, ...args].join(" ")}`);
  const child = spawn(executable, [...executableArgs, pathToClaudeCodeExecutable, ...args], {
    cwd,
    stdio: ["pipe", "pipe", "pipe"],
    signal: abortController.signal,
    env
  });
  let childStdin;
  if (typeof prompt === "string") {
    child.stdin.end();
  } else {
    streamToStdin(prompt, child.stdin, abortController);
    childStdin = child.stdin;
  }
  if (env.DEBUG || stderr) {
    child.stderr.on("data", (data) => {
      if (env.DEBUG) {
        console.error("Claude Code stderr:", data.toString());
      }
      if (stderr) {
        stderr(data.toString());
      }
    });
  }
  const cleanup = () => {
    if (!child.killed) {
      child.kill("SIGTERM");
    }
  };
  abortController.signal.addEventListener("abort", cleanup);
  process.on("exit", cleanup);
  const processExitPromise = new Promise((resolve) => {
    child.on("close", (code) => {
      if (abortController.signal.aborted) {
        query2.setError(new AbortError("Claude Code process aborted by user"));
      }
      if (code !== 0) {
        query2.setError(new Error(`Claude Code process exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
  const query2 = new Query(childStdin, child.stdout, processExitPromise, canUseTool);
  child.on("error", (error) => {
    if (abortController.signal.aborted) {
      query2.setError(new AbortError("Claude Code process aborted by user"));
    } else {
      query2.setError(new Error(`Failed to spawn Claude Code process: ${error.message}`));
    }
  });
  processExitPromise.finally(() => {
    cleanup();
    abortController.signal.removeEventListener("abort", cleanup);
  });
  return query2;
}

class Query {
  childStdin;
  childStdout;
  processExitPromise;
  canUseTool;
  pendingControlResponses = new Map;
  sdkMessages;
  inputStream = new Stream;
  constructor(childStdin, childStdout, processExitPromise, canUseTool) {
    this.childStdin = childStdin;
    this.childStdout = childStdout;
    this.processExitPromise = processExitPromise;
    this.canUseTool = canUseTool;
    this.readMessages();
    this.sdkMessages = this.readSdkMessages();
  }
  setError(error) {
    this.inputStream.error(error);
  }
  next(...[value]) {
    return this.sdkMessages.next(...[value]);
  }
  return(value) {
    return this.sdkMessages.return(value);
  }
  throw(e) {
    return this.sdkMessages.throw(e);
  }
  [Symbol.asyncIterator]() {
    return this.sdkMessages;
  }
  [Symbol.asyncDispose]() {
    return this.sdkMessages[Symbol.asyncDispose]();
  }
  async readMessages() {
    const rl = createInterface({ input: this.childStdout });
    try {
      for await (const line of rl) {
        if (line.trim()) {
          const message = JSON.parse(line);
          if (message.type === "control_response") {
            const handler = this.pendingControlResponses.get(message.response.request_id);
            if (handler) {
              handler(message.response);
            }
            continue;
          } else if (message.type === "control_request") {
            this.handleControlRequest(message);
            continue;
          }
          this.inputStream.enqueue(message);
        }
      }
      await this.processExitPromise;
    } catch (error) {
      this.inputStream.error(error);
    } finally {
      this.inputStream.done();
      rl.close();
    }
  }
  async handleControlRequest(request) {
    try {
      const response = await this.processControlRequest(request);
      const controlResponse = {
        type: "control_response",
        response: {
          subtype: "success",
          request_id: request.request_id,
          response
        }
      };
      this.childStdin?.write(JSON.stringify(controlResponse) + `
`);
    } catch (error) {
      const controlErrorResponse = {
        type: "control_response",
        response: {
          subtype: "error",
          request_id: request.request_id,
          error: error.message || String(error)
        }
      };
      this.childStdin?.write(JSON.stringify(controlErrorResponse) + `
`);
    }
  }
  async processControlRequest(request) {
    if (request.request.subtype === "can_use_tool") {
      if (!this.canUseTool) {
        throw new Error("canUseTool callback is not provided.");
      }
      return this.canUseTool(request.request.tool_name, request.request.input);
    }
    throw new Error("Unsupported control request subtype: " + request.request.subtype);
  }
  async* readSdkMessages() {
    for await (const message of this.inputStream) {
      yield message;
    }
  }
  async interrupt() {
    if (!this.childStdin) {
      throw new Error("Interrupt requires --input-format stream-json");
    }
    await this.request({
      subtype: "interrupt"
    }, this.childStdin);
  }
  request(request, childStdin) {
    const requestId = Math.random().toString(36).substring(2, 15);
    const sdkRequest = {
      request_id: requestId,
      type: "control_request",
      request
    };
    return new Promise((resolve, reject) => {
      this.pendingControlResponses.set(requestId, (response) => {
        if (response.subtype === "success") {
          resolve(response);
        } else {
          reject(new Error(response.error));
        }
      });
      childStdin.write(JSON.stringify(sdkRequest) + `
`);
    });
  }
}
async function streamToStdin(stream, stdin, abortController) {
  for await (const message of stream) {
    if (abortController.signal.aborted)
      break;
    stdin.write(JSON.stringify(message) + `
`);
  }
  stdin.end();
}
function logDebug(message) {
  if (process.env.DEBUG) {
    console.debug(message);
  }
}
function isRunningWithBun() {
  return process.versions.bun !== undefined || process.env.BUN_INSTALL !== undefined;
}

class AbortError extends Error {
}
export {
  query,
  AbortError
};
