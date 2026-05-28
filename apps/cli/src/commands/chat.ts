import chalk from "chalk";

export async function chatCommand(prompt: string): Promise<void> {
  console.log(chalk.green("Launching local chat session"));
  console.log(`Prompt: ${prompt}`);
}
