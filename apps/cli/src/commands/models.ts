import chalk from "chalk";

export async function modelsCommand(): Promise<void> {
  console.log(chalk.magenta("Listing available models"));
  console.log("- corexa-code-fast (corexa-runtime)");
  console.log("- corexa-code-pro (corexa-runtime)");
}
