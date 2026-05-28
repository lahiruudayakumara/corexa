import chalk from "chalk";

export async function scanCommand(targetPath: string): Promise<void> {
  console.log(chalk.blue(`Scanning workspace: ${targetPath}`));
  console.log("Indexing pipeline: discover -> parse -> chunk -> embed -> persist");
}
