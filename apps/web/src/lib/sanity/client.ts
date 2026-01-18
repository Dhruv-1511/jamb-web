import type { SanityImageSource } from "@sanity/asset-utils";
import { createImageUrlBuilder } from "@sanity/image-url";
import { env } from "@workspace/env/client";
import { env as serverEnv } from "@workspace/env/server";
import { createClient } from "next-sanity";

// Public client (for client-side, won't work with private datasets)
export const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  perspective: "published",
  // Add token for private dataset access
  token: serverEnv.SANITY_API_READ_TOKEN,
  stega: {
    studioUrl: env.NEXT_PUBLIC_SANITY_STUDIO_URL,
    enabled: env.NEXT_PUBLIC_VERCEL_ENV === "preview",
  },
});

const imageBuilder = createImageUrlBuilder({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
});

export const urlFor = (source: SanityImageSource) =>
  imageBuilder.image(source).auto("format").quality(80).format("webp");
