import type { Car } from "@/types";

export const MOCK_CARS: Car[] = [
  {
    id: "hyundai-h1-vip",
    make: "Hyundai",
    model: "H1 VIP",
    year: 2023,
    category: "VAN",
    pricePerDay: 0,
    imageUrl: "/fleet/h1-white-side.jpeg",
    withDriver: true,
    isAvailable: true,
    description:
      "H1 كبيرة ومريحة للرحلات والمشاوير الخاصة، كراسي واسعة ومساحة ممتازة للركاب والشنط.",
  },
  {
    id: "hyundai-h1-comfort",
    make: "Hyundai",
    model: "H1 Comfort",
    year: 2023,
    category: "VAN",
    pricePerDay: 0,
    imageUrl: "/fleet/h1-white-front-day.jpeg",
    withDriver: true,
    isAvailable: true,
    description:
      "اختيار عملي ومريح للعائلات والمجموعات، تكييف قوي ومساحة داخلية واسعة لرحلة هادئة.",
  },
];
