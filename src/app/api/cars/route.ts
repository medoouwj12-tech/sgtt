import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCars } from "@/lib/cars";

export async function GET() {
  const cars = await getCars();
  return NextResponse.json(cars);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prisma = getPrisma();
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const car = await prisma.car.create({ data: body });
    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create car" },
      { status: 500 }
    );
  }
}
