import { config } from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';

const envPath = [resolve(process.cwd(), '.env'), resolve(__dirname, '..', '.env')].find((p) =>
  existsSync(p),
);
config(envPath ? { path: envPath } : undefined);
