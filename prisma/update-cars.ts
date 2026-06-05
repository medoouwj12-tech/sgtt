import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Show current cars
  const currentCars = await prisma.car.findMany({ select: { id: true, make: true, model: true, category: true } });
  console.log("=== Current cars in DB ===");
  console.log(JSON.stringify(currentCars, null, 2));

  // Delete old sedans (Mercedes and Toyota)
  const deleted = await prisma.car.deleteMany({
    where: {
      id: { in: ["mercedes-c200", "toyota-camry", "mercedes-benz-c200"] },
    },
  });
  console.log(`\nDeleted ${deleted.count} old sedan(s).`);

  // Upsert new cars
  const newCars = [
    {
      id: "dfsk-glory-330",
      make: "DFSK",
      model: "Glory 330",
      year: 2023,
      category: "VAN" as const,
      pricePerDay: 0,
      imageUrl: "/fleet/glory-330-4.jpg",
      withDriver: true,
      isAvailable: true,
      description: "دفسك جلوري 330 عائلية 7 راكب مريحة جداً، مثالية للسفر والرحلات والمشاوير الخاصة مع العائلة.",
    },
    {
      id: "chery-tiggo-8",
      make: "Chery",
      model: "Tiggo 8",
      year: 2023,
      category: "SUV" as const,
      pricePerDay: 0,
      imageUrl: "/fleet/tiggo-8-5.jpg",
      withDriver: true,
      isAvailable: true,
      description: "شيري تيجو 8 العائلية 7 راكب، تصميم فاخر ومساحة واسعة وتكنولوجيا متطورة لرحلة مريحة وآمنة.",
    },
    {
      id: "hyundai-elantra-cn7",
      make: "Hyundai",
      model: "Elantra CN7",
      year: 2023,
      category: "SEDAN" as const,
      pricePerDay: 0,
      imageUrl: "/fleet/elantra-cn7-2.jpg",
      withDriver: true,
      isAvailable: true,
      description: "هيونداي إلنترا CN7 بتصميمها الرياضي العصري، مريحة وأنيقة ومناسبة جداً لجميع المشاوير.",
    },
  ];

  for (const car of newCars) {
    const result = await prisma.car.upsert({
      where: { id: car.id },
      update: car,
      create: car,
    });
    console.log(`✓ Upserted: ${result.make} ${result.model} (${result.id})`);
  }

  // Show final state
  const finalCars = await prisma.car.findMany({ select: { id: true, make: true, model: true, category: true }, orderBy: { createdAt: "asc" } });
  console.log("\n=== Final cars in DB ===");
  console.log(JSON.stringify(finalCars, null, 2));
}

main()
  .catch((e) => { console.error("ERROR:", e); process.exitCode = 1; })
  .finally(async () => { await prisma.$disconnect(); await pool.end(); });
