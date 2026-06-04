import { Car, CheckCircle, Calendar, Clock } from "lucide-react";

interface StatsCardsProps {
  stats: {
    totalCars: number;
    availableCars: number;
    totalBookings: number;
    pendingBookings: number;
  };
}

const cards = [
  { key: "totalCars" as const, label: "Total Cars", icon: Car },
  { key: "availableCars" as const, label: "Available", icon: CheckCircle },
  { key: "totalBookings" as const, label: "Bookings", icon: Calendar },
  { key: "pendingBookings" as const, label: "Pending", icon: Clock },
];

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ key, label, icon: Icon }) => (
        <div
          key={key}
          className="rounded-2xl border border-gold/10 bg-[#0a0a0a] p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-500">{label}</p>
            <Icon className="h-5 w-5 text-gold/60" />
          </div>
          <p className="mt-2 text-3xl font-semibold text-gold">{stats[key]}</p>
        </div>
      ))}
    </div>
  );
}
