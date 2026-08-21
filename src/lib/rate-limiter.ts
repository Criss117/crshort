type RateLimitEntry = {
  count: number;
  resetTime: number;
};

export class MemoryRateLimiter {
  private _store = new Map<string, RateLimitEntry>();

  constructor(
    private limit: number,
    private windowMs: number,
  ) {}

  get store() {
    return this._store;
  }

  isAllowed(key: string) {
    const now = Date.now();
    const entry = this._store.get(key);

    // Primera vez
    if (!entry) {
      this._store.set(key, {
        count: 1,
        resetTime: now + this.windowMs,
      });

      return {
        allowed: true,
        remaining: this.limit - 1,
        resetTime: now + this.windowMs,
      };
    }

    // Reiniciar ventana
    if (now > entry.resetTime) {
      this._store.set(key, {
        count: 1,
        resetTime: now + this.windowMs,
      });

      return {
        allowed: true,
        remaining: this.limit - 1,
        resetTime: now + this.windowMs,
      };
    }

    // Excedido
    if (entry.count >= this.limit) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }

    // Incrementar contador
    entry.count++;

    return {
      allowed: true,
      remaining: this.limit - entry.count,
      resetTime: entry.resetTime,
    };
  }

  cleanup() {
    const now = Date.now();

    for (const [key, value] of this._store) {
      if (now > value.resetTime) {
        this._store.delete(key);
      }
    }
  }
}
