import { sanityClient } from "@/lib/sanity/client";

/**
 * Runs a GROQ query at build time and returns its result, or `fallback`
 * when Sanity isn't configured yet, the query comes back empty, or the
 * request fails for any reason (a bad token, a network hiccup during
 * `next build`). A broken query should never fail the whole site build —
 * it should just mean that one section falls back to the local content
 * that shipped before Sanity existed.
 */
export async function fetchWithFallback<T>(query: string, fallback: T): Promise<T> {
  if (!sanityClient) return fallback;
  try {
    const result = await sanityClient.fetch<T>(query);
    if (result == null || (Array.isArray(result) && result.length === 0)) return fallback;
    return result;
  } catch (error) {
    console.error(`[sanity] query failed, falling back to local content:\n${query}\n`, error);
    return fallback;
  }
}
