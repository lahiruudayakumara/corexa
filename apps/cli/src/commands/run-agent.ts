import chalk from "chalk";
import type { AgentRole } from "@corexa/shared";

export async function runAgentCommand(role: AgentRole, task: string): Promise<void> {
  console.log(chalk.yellow(`Running ${role} agent`));
  console.log(`Task: ${task}`);
}
