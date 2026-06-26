import { CsesProfile } from '../types';

interface CacheEntry {
  profile: CsesProfile;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

/**
 * Gets a profile from the cache if it exists and has not expired.
 */
export function getCachedProfile(userId: string): CsesProfile | null {
  const entry = cache.get(userId);
  if (!entry) return null;

  const now = Date.now();
  if (now - entry.timestamp > CACHE_TTL) {
    cache.delete(userId);
    return null;
  }

  return entry.profile;
}

/**
 * Saves a profile to the cache.
 */
export function setCachedProfile(userId: string, profile: CsesProfile): void {
  cache.set(userId, {
    profile,
    timestamp: Date.now(),
  });
}

/**
 * Clears the cache (useful for testing).
 */
export function clearCache(): void {
  cache.clear();
}
