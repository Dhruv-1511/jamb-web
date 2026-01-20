/**
 * Prints a styled CLI message with instructions for importing Sanity seed data.
 * Only runs when environment variables are available (not during deployment).
 */
function printSeedDataImportInstructions() {
  // Skip during deployment if Sanity environment variables are not set
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET;

  if (!projectId || !dataset) {
    console.log("Skipping seed data instructions - Sanity environment variables not configured");
    process.exit(0);
  }
  // ANSI color codes for styling
  const COLOR_BLUE = "\x1b[34m";
  const COLOR_CYAN = "\x1b[36m";
  const COLOR_RESET = "\x1b[0m";

  // Box formatting
  const BOX_WIDTH = 109;
  const SIDE_PADDING = 2;

  /**
   * Pads a line with box characters and spaces for alignment.
   * Strips ANSI codes to calculate visible length.
   */
  function padLine(text = ""): string {
    // biome-ignore lint/suspicious/noControlCharactersInRegex: control characters are used for styling
    const visibleLength = text.replace(/\x1b\[[0-9;]*m/g, "").length;
    const totalPadding = BOX_WIDTH - visibleLength;
    const left = " ".repeat(SIDE_PADDING);
    const right = " ".repeat(Math.max(0, totalPadding - SIDE_PADDING));
    return `│${left}${text}${right}│`;
  }

  /**
   * Styles a command string for emphasis.
   */
  function styleCommand(cmd: string): string {
    return `${COLOR_CYAN}${cmd}${COLOR_RESET}${COLOR_BLUE}`;
  }

  // Message lines
  const lines = [
    "",
    `┌${"─".repeat(BOX_WIDTH)}┐`,
    padLine(
      `${COLOR_BLUE}To import the provided seed data into your Sanity dataset, run:${COLOR_RESET}`
    ),
    padLine(),
    padLine(
      `${COLOR_BLUE}${styleCommand("cd apps/studio && npx sanity dataset import seed-data.tar.gz <TARGET_DATASET>")}${COLOR_RESET}`
    ),
    padLine(),
    padLine(`${COLOR_BLUE}Example:${COLOR_RESET}`),
    padLine(
      `${COLOR_BLUE}${styleCommand("cd apps/studio && npx sanity dataset import seed-data.tar.gz production --replace")}${COLOR_RESET}`
    ),
    padLine(),
    `└${"─".repeat(BOX_WIDTH)}┘`,
    "",
    `${COLOR_BLUE}For more info, run: npx sanity dataset import --help${COLOR_RESET}`,
    "",
  ];

  for (const line of lines) {
    // biome-ignore lint/suspicious/noConsole: intentional logging
    console.log(line);
  }
}

printSeedDataImportInstructions();
