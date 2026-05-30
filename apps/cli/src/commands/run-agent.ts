import type { AgentRole } from "@corexa/shared";
import chalk from "chalk";

export async function runAgentCommand(role: AgentRole, task: string): Promise<void> {
  console.log(chalk.yellow(`Running ${role} agent`));
  console.log(`Task: ${task}`);
}
