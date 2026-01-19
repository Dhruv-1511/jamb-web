import { Logger } from "@workspace/logger";
import { defineCliConfig } from "sanity/cli";
import tsconfigPaths from "vite-plugin-tsconfig-paths";

const logger = new Logger("SanityCLI");

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "gqhcqy1g";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

if (!process.env.SANITY_STUDIO_PROJECT_ID) {
  logger.warn(
    "SANITY_STUDIO_PROJECT_ID is missing. Using fallback for configuration."
  );
}

if (!process.env.SANITY_STUDIO_DATASET) {
  logger.warn(
    "SANITY_STUDIO_DATASET is missing. Using fallback for configuration."
  );
}

/**
 * Returns the correct studio host based on environment variables.
 * - If HOST_NAME is set and not "main", returns `${HOST_NAME}-${PRODUCTION_HOSTNAME}`
 * - If HOST_NAME is "main" or not set, returns PRODUCTION_HOSTNAME
 * - If PRODUCTION_HOSTNAME is not set, returns a default using projectId
 */
function getStudioHost(): string | undefined {
  const host = process.env.HOST_NAME;
  const productionHostName = process.env.SANITY_STUDIO_PRODUCTION_HOSTNAME;

  if (productionHostName) {
    if (host && host !== "main") {
      return `${host}-${productionHostName}`;
    }

    return productionHostName;
  }

  if (projectId) {
    return `${projectId}`;
  }

  return;
}

const studioHost = getStudioHost();

if (studioHost) {
  logger.info(`Sanity Studio Host: https://${studioHost}.sanity.studio`);
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost,
  deployment: {
    autoUpdates: false,
  },
  vite: {
    plugins: [tsconfigPaths()],
  },
});
