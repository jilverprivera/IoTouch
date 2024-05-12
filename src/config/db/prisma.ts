import { PrismaClient } from '@prisma/client';
import { fieldEncryptionExtension } from 'prisma-field-encryption';

const globalClient = new PrismaClient();

export const Prisma = globalClient.$extends(
  fieldEncryptionExtension({
    encryptionKey: process.env.EXPO_PUBLIC_ENCRYPTION_DB_KEY as string,
  }),
);
