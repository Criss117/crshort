import '@testing-library/jest-dom/vitest';

// Mock server-side environment variables for tests.
// This prevents @t3-oss/env-core from throwing "server-side env on client"
// when importing server actions that reference db/index.ts.
vi.mock('@/lib/config/server', () => ({
  serverEnv: {
    TURSO_CONNECTION_URL: 'file:./test.db',
    TURSO_AUTH_TOKEN: 'test-token',
    BETTER_AUTH_URL: 'http://localhost:3000',
    BETTER_AUTH_SECRET: 'test-secret',
    GITHUB_CLIENT_ID: 'test-client-id',
    GITHUB_CLIENT_SECRET: 'test-client-secret',
  },
}));
