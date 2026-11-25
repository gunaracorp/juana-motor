import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { SITE, waLink } from "@/config/site";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, phone, bikeDetail, year, mileageKm, expectPrice, message } =
      body || {};

    if (!name || !phone || !bikeDetail) {
      return NextResponse.json(
        { ok: false, error: "Nama, nomor HP, dan detail motor wajib diisi" },
        { status: 400 }
      );
    }

    const inquiry = await db.inquiry.create({
      data: {
        type: type || "jual-motor",
        name: String(name).slice(0, 120),
        phone: String(phone).slice(0, 40),
        bikeDetail: String(bikeDetail).slice(0, 200),
        year: year ? Number(year) : null,
        mileageKm: mileageKm ? Number(mileageKm) : null,
        expectPrice: expectPrice ? Number(expectPrice) : null,
        message: message ? String(message).slice(0, 1000) : null,
      },
    });

    const waMessage = [
      `Halo ${SITE.name} Tasikmalaya, saya ingin jual motor:`,
      `Nama: ${name}`,
      `Motor: ${bikeDetail}`,
      year ? `Tahun: ${year}` : "",
      mileageKm ? `Kilometer: ${mileageKm} km` : "",
      expectPrice ? `Harga harapan: Rp ${Number(expectPrice).toLocaleString("id-ID")}` : "",
      message ? `Catatan: ${message}` : "",
      `(Terkirim via website, ref: ${inquiry.id})`,
    ]
      .filter(Boolean)
      .join("\n");

    return NextResponse.json({
      ok: true,
      id: inquiry.id,
      waUrl: waLink(waMessage),
    });
  } catch (e) {
    console.error("POST /api/inquiries error:", e);
    return NextResponse.json(
      { ok: false, error: "Gagal mengirim pengajuan. Coba lagi ya!" },
      { status: 500 }
    );
  }
}
