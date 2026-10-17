import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDatabaseUrl(): string {
  // When running in Vercel or AWS Lambda, the root filesystem is read-only.
  // SQLite needs write/lock permissions, which are only permitted in /tmp.
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const tmpDbPath = path.join("/tmp", "dev.db");

    const possibleSources = [
      path.join(process.cwd(), "prisma", "dev.db"),
      path.join(process.cwd(), ".next", "server", "prisma", "dev.db"),
      path.resolve(__dirname, "..", "..", "prisma", "dev.db"),
      path.resolve(__dirname, "..", "prisma", "dev.db"),
    ];

    let foundSource: string | null = null;
    for (const src of possibleSources) {
      if (fs.existsSync(src)) {
        foundSource = src;
        break;
      }
    }

    if (foundSource) {
      try {
        if (!fs.existsSync(tmpDbPath)) {
          fs.copyFileSync(foundSource, tmpDbPath);
        }
      } catch (err) {
        console.error("Failed to copy SQLite dev.db to /tmp:", err);
      }
    }

    if (fs.existsSync(tmpDbPath)) {
      return `file:${tmpDbPath}`;
    }
  }

  const localDb = path.resolve(process.cwd(), "prisma", "dev.db");
  return `file:${localDb}`;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

