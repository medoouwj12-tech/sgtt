import "server-only";
import { getPrisma } from "@/lib/prisma";
import { MOCK_CARS } from "@/data/mock-cars";
import type { Car, FleetFilters, PublicCar } from "@/types";

const ACTIVE_FLEET_IDS = MOCK_CARS.map((car) => car.id);
const activeFleetIdSet = new Set(ACTIVE_FLEET_IDS);

function applyFilters(cars: Car[], filters?: FleetFilters): Car[] {
  let result = cars.filter((c) => c.isAvailable);

  if (filters?.category && filters.category !== "ALL") {
    result = result.filter((c) => c.category === filters.category);
  }

  if (filters?.withDriver !== undefined && filters.withDriver !== "ALL") {
    result = result.filter((c) => c.withDriver === filters.withDriver);
  }

  if (filters?.search?.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (c) =>
        c.make.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q) ||
        `${c.make} ${c.model}`.toLowerCase().includes(q)
    );
  }

  return result;
}

function toPublicCar(car: Car): PublicCar {
  const { pricePerDay: _pricePerDay, ...publicCar } = car;
  return publicCar;
}

export async function getCars(filters?: FleetFilters): Promise<PublicCar[]> {
  const prisma = getPrisma();
  if (prisma) {
    try {
      const cars = await prisma.car.findMany({
        where: {
          id: { in: ACTIVE_FLEET_IDS },
          isAvailable: true,
        },
        orderBy: { pricePerDay: "desc" },
      });
      if (cars.length > 0) {
        return applyFilters(cars as Car[], filters).map(toPublicCar);
      }
    } catch {
      // fall through to mock
    }
  }
  return applyFilters(MOCK_CARS, filters).map(toPublicCar);
}

export async function getCarById(id: string): Promise<PublicCar | null> {
  if (!activeFleetIdSet.has(id)) return null;

  const prisma = getPrisma();
  if (prisma) {
    try {
      const car = await prisma.car.findUnique({ where: { id } });
      if (car) return toPublicCar(car as Car);
    } catch {
      // fallback
    }
  }
  const car = MOCK_CARS.find((c) => c.id === id);
  return car ? toPublicCar(car) : null;
}

export async function getAllCarsAdmin(): Promise<Car[]> {
  const prisma = getPrisma();
  if (prisma) {
    try {
      const cars = await prisma.car.findMany({ orderBy: { createdAt: "desc" } });
      if (cars.length > 0) return cars as Car[];
    } catch {
      // fallback
    }
  }
  return MOCK_CARS;
}

export async function getCarStats() {
  const prisma = getPrisma();
  if (prisma) {
    try {
      const [totalCars, availableCars, totalBookings, pendingBookings] =
        await Promise.all([
          prisma.car.count(),
          prisma.car.count({ where: { isAvailable: true } }),
          prisma.bookingRequest.count(),
          prisma.bookingRequest.count({ where: { status: "PENDING" } }),
        ]);
      return { totalCars, availableCars, totalBookings, pendingBookings };
    } catch {
      // fallback
    }
  }
  return {
    totalCars: MOCK_CARS.length,
    availableCars: MOCK_CARS.filter((c) => c.isAvailable).length,
    totalBookings: 0,
    pendingBookings: 0,
  };
}
