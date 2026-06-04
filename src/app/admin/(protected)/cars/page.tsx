import { getAllCarsAdmin } from "@/lib/cars";
import { CarsManager } from "@/components/admin/cars-manager";

export default async function AdminCarsPage() {
  const cars = await getAllCarsAdmin();
  return <CarsManager initialCars={cars} />;
}
