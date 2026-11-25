// Seed data katalog Juana Motor Tasikmalaya — DATABASE MASTER
// Sumber: UJANG_JUANA_MOTOR_TASIKMALAYA_Harga_Motor_Nov2026.xlsx
// 170 varian motor baru (22 merek) + 153 unit bekas dari 70 model terlaku
// Harga OTR = riset price list resmi/dealer/pasar per 25 November 2026
import { PrismaClient } from "@prisma/client";
import seedData from "./seed-data.json";

const db = new PrismaClient();

type Row = {
  name: string;
  brand: string;
  category: string;
  condition: string;
  year: number;
  engineCc: number;
  transmission: string;
  fuelType: string;
  color: string;
  price: number;
  priceMin?: number | null;
  priceMax?: number | null;
  image: string;
  badge?: string | null;
  stock: number;
  mileageKm?: number | null;
  grade?: string | null;
  specs: Record<string, string>;
  description: string;
  featured?: boolean;
};

async function main() {
  await db.motorcycle.deleteMany({});
  await db.inquiry.deleteMany({});

  const rows = [...(seedData.baru as Row[]), ...(seedData.bekas as Row[])];

  // chunk inserts untuk kecepatan
  const CHUNK = 40;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    await db.motorcycle.createMany({
      data: chunk.map((m) => ({
        name: m.name,
        brand: m.brand,
        category: m.category,
        condition: m.condition,
        year: m.year,
        engineCc: m.engineCc,
        transmission: m.transmission,
        fuelType: m.fuelType,
        color: m.color,
        price: m.price,
        priceMin: m.priceMin ?? null,
        priceMax: m.priceMax ?? null,
        image: m.image,
        badge: m.badge ?? null,
        stock: m.stock,
        mileageKm: m.mileageKm ?? null,
        grade: m.grade ?? null,
        specs: JSON.stringify(m.specs),
        description: m.description,
        featured: !!m.featured,
      })),
    });
  }

  const count = await db.motorcycle.count();
  const baru = await db.motorcycle.count({ where: { condition: "baru" } });
  const bekas = await db.motorcycle.count({ where: { condition: "bekas" } });
  const brands = await db.motorcycle.groupBy({ by: ["brand"] });
  console.log(
    `Seed selesai: ${count} motor (${baru} varian baru + ${bekas} unit bekas) dari ${brands.length} merek`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
