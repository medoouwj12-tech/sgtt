import { getCarStats, getAllCarsAdmin } from "@/lib/cars";
import { getPrisma } from "@/lib/prisma";
import { StatsCards } from "@/components/admin/stats-cards";
import { Car, Calendar } from "lucide-react";

export default async function AdminDashboardPage() {
  const stats = await getCarStats();
  const cars = await getAllCarsAdmin();

  let recentBookings: {
    id: string;
    name: string;
    phone: string;
    date: Date;
    status: string;
    car: { make: string; model: string };
  }[] = [];

  const prisma = getPrisma();
  try {
    if (!prisma) throw new Error("no db");
    recentBookings = await prisma.bookingRequest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { car: { select: { make: true, model: true } } },
    });
  } catch {
    // no db
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-light text-gold">Dashboard</h1>
        <p className="mt-1 text-zinc-500">Overview of your luxury fleet</p>
      </div>

      <StatsCards stats={stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gold/10 bg-[#0a0a0a] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Car className="h-5 w-5 text-gold" />
            <h2 className="font-medium">Fleet ({cars.length})</h2>
          </div>
          <ul className="space-y-3">
            {cars.slice(0, 5).map((car) => (
              <li
                key={car.id}
                className="flex items-center justify-between text-sm border-b border-white/5 pb-2"
              >
                <span>
                  {car.make} {car.model}
                </span>
                <span className={car.isAvailable ? "text-green-400" : "text-red-400"}>
                  {car.isAvailable ? "Available" : "Unavailable"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gold/10 bg-[#0a0a0a] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gold" />
            <h2 className="font-medium">Recent Bookings</h2>
          </div>
          {recentBookings.length === 0 ? (
            <p className="text-sm text-zinc-500">No bookings yet</p>
          ) : (
            <ul className="space-y-3">
              {recentBookings.map((b) => (
                <li
                  key={b.id}
                  className="text-sm border-b border-white/5 pb-2"
                >
                  <p className="font-medium">
                    {b.name} — {b.car.make} {b.car.model}
                  </p>
                  <p className="text-zinc-500">
                    {b.phone} · {new Date(b.date).toLocaleDateString()} · {b.status}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
