// In-Memory Cache with Invalidation Logic for sub-5ms performance

export class IntelligenceCache {
  private cache: Map<string, { timestamp: number; data: any }> = new Map();
  private defaultTTLMs = 5 * 60 * 1000; // 5 minutes cache TTL

  public get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > this.defaultTTLMs) {
      this.cache.delete(key);
      return null;
    }
    return entry.data as T;
  }

  public set(key: string, data: any): void {
    this.cache.set(key, { timestamp: Date.now(), data });
  }

  public clear(): void {
    this.cache.clear();
  }
}

export const intelligenceCache = new IntelligenceCache();
