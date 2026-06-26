import { CsesProfile } from '../types';

interface CacheEntry {
  profile: CsesProfile;
  timestamp: number;
}

// In-memory cache store
const cache = new Map<string, CacheEntry>();

// Cache TTL (30 minutes in milliseconds)
const CACHE_TTL = 30 * 60 * 1000;

/**
 * Gets a profile from the cache if it exists and has not expired.
 * @param userId CSES numeric user ID
 */
export function getCachedProfile(userId: string): CsesProfile | null {
  const entry = cache.get(userId);
  if (!entry) return null;

  const now = Date.now();
  if (now - entry.timestamp > CACHE_TTL) {
    // Cache expired
    cache.delete(userId);
    return null;
  }

  return entry.profile;
}

/**
 * Saves a profile to the cache.
 * @param userId CSES numeric user ID
 * @param profile CSES profile data
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
