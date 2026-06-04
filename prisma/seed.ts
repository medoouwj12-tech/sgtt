import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { MOCK_CARS } from "../src/data/mock-cars";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const carIds = MOCK_CARS.map((car) => car.id);

  await prisma.car.updateMany({
    where: {
      id: {
        notIn: carIds,
      },
    },
    data: {
      isAvailable: false,
    },
  });

  for (const car of MOCK_CARS) {
    await prisma.car.upsert({
      where: { id: car.id },
      update: car,
      create: car,
    });
  }

  const adminExists = await prisma.user.findUnique({
    where: { email: "admin@sgt-luxury.com" },
  });

  if (!adminExists) {
    await prisma.user.create({
      data: {
        email: "admin@sgt-luxury.com",
        passwordHash: "change-me-in-production",
        name: "SGT Admin",
        role: "ADMIN",
      },
    });
  }

  console.log(`Seeded ${MOCK_CARS.length} cars.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
