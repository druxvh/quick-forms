import { PrismaClient } from '@/generated/prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

const DATABASE_URL = process.env.DATABASE_URL as string;

if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in environment variables');
}

const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        accelerateUrl: DATABASE_URL,
    }).$extends(withAccelerate());

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export default prisma;
