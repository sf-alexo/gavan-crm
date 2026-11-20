import { config } from 'dotenv';
import { resolve } from 'path';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

config({ path: resolve(__dirname, '..', '.env') });

const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error('SEED_ADMIN_PASSWORD is required');
  }

  const adminHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: { passwordHash: adminHash, isActive: true, role: Role.ADMIN },
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      role: Role.ADMIN,
      passwordHash: adminHash,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
