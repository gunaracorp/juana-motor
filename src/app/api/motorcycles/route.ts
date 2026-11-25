import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const condition = sp.get("condition") || "";
    const brand = sp.get("brand") || "";
    const category = sp.get("category") || "";
    const q = (sp.get("q") || "").trim();
    const minPrice = sp.get("minPrice");
    const maxPrice = sp.get("maxPrice");
    const sort = sp.get("sort") || "featured";

    const where: Record<string, unknown> = {};
    if (condition === "baru" || condition === "bekas") where.condition = condition;
    if (brand) where.brand = brand;
    if (category) where.category = category;
    if (minPrice || maxPrice) {
      where.price = {
        ...(minPrice ? { gte: Number(minPrice) } : {}),
        ...(maxPrice ? { lte: Number(maxPrice) } : {}),
      };
    }
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { brand: { contains: q } },
        { description: { contains: q } },
        { color: { contains: q } },
      ];
    }

    let orderBy: Record<string, string> = { createdAt: "asc" };
    if (sort === "harga-asc") orderBy = { price: "asc" };
    if (sort === "harga-desc") orderBy = { price: "desc" };
    if (sort === "tahun") orderBy = { year: "desc" };
    if (sort === "featured") orderBy = [{ featured: "desc" }, { price: "asc" }];

    const data = await db.motorcycle.findMany({ where, orderBy });

    return NextResponse.json({ ok: true, total: data.length, data });
  } catch (e) {
    console.error("GET /api/motorcycles error:", e);
    return NextResponse.json(
      { ok: false, error: "Gagal memuat katalog motor" },
      { status: 500 }
    );
  }
}
