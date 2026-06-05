export type CarCategory = "SEDAN" | "SUV" | "SPORTS" | "LUXURY" | "VAN";

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  category: CarCategory;
  pricePerDay: number;
  imageUrl: string;
  withDriver: boolean;
  isAvailable: boolean;
  description: string | null;
}

export type PublicCar = Omit<Car, "pricePerDay">;

export interface FleetFilters {
  category?: CarCategory | "ALL";
  withDriver?: boolean | "ALL";
  search?: string;
}

export interface BookingFormData {
  carId: string;
  carName: string;
  name: string;
  phone: string;
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  tripType?: string;
  passengers: number | string;
  notes?: string;
}
