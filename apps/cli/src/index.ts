#!/usr/bin/env node

import type { AgentRole } from "@corexa/shared";
import { Command } from "commander";
import { chatCommand } from "./commands/chat.js";
import { initCommand } from "./commands/init.js";
import { modelsCommand } from "./commands/models.js";
import { runAgentCommand } from "./commands/run-agent.js";
import { scanCommand } from "./commands/scan.js";

const program = new Command();

program
  .name("corexa")
  .description("Corexa CLI for local-first autonomous engineering")
  .version("0.1.0");

program.command("init").argument("[name]").action(initCommand);

program.command("chat").argument("<prompt>").action(chatCommand);

program
  .command("run-agent")
  .argument("<role>")
  .argument("<task>")
  .action((role, task) => {
    void runAgentCommand(role as AgentRole, task);
  });

program.command("models").action(modelsCommand);

program.command("scan").argument("[path]", process.cwd()).action(scanCommand);

// Exit with code 0 when displaying help (no arguments provided)
if (process.argv.length === 2) {
  program.outputHelp();
  process.exit(0);
}

void program.parseAsync(process.argv);
