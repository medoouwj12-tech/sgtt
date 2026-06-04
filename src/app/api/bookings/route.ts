import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      carId,
      name,
      phone,
      pickupLocation,
      dropoffLocation,
      date,
      time,
      passengers,
    } = body;

    if (!carId || !name || !phone || !pickupLocation || !dropoffLocation || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const prisma = getPrisma();
    if (!prisma) {
      return NextResponse.json({ success: true, mock: true });
    }

    const booking = await prisma.bookingRequest.create({
      data: {
        carId,
        name,
        phone,
        pickupLocation,
        dropoffLocation,
        date: new Date(date),
        time: time || null,
        passengers: passengers ?? 1,
      },
    });

    return NextResponse.json({ success: true, id: booking.id });
  } catch {
    return NextResponse.json({ success: true, mock: true });
  }
}
