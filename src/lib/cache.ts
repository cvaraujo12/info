import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => console.error('Redis Client Error', err));

// Conecta ao Redis
client.connect().catch(console.error);

export const cache = {
  async get(key: string): Promise<string | null> {
    try {
      return await client.get(key);
    } catch (error) {
      console.error('Cache Get Error:', error);
      return null;
    }
  },

  async set(key: string, value: string, expirationInSeconds: number): Promise<void> {
    try {
      await client.set(key, value, {
        EX: expirationInSeconds
      });
    } catch (error) {
      console.error('Cache Set Error:', error);
    }
  },

  async del(key: string): Promise<void> {
    try {
      await client.del(key);
    } catch (error) {
      console.error('Cache Del Error:', error);
    }
  },

  async flush(): Promise<void> {
    try {
      await client.flushAll();
    } catch (error) {
      console.error('Cache Flush Error:', error);
    }
  }
}; 