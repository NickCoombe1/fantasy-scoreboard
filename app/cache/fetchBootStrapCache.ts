import NodeCache from "node-cache";
import { FplBootstrapResponse } from "@/app/models/fplBootstrapResponse";
import { fetchBootStrap } from "@/app/apiHelpers/apiHelpers";

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

export async function getCachedBootstrapData() {
  const cacheKey = "bootstrapData";
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return cachedData as FplBootstrapResponse;
  }

  const bootstrapData = await fetchBootStrap();
  cache.set(cacheKey, bootstrapData);

  return bootstrapData;
}
