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
  {
    id: "mercedes-c200",
    make: "Mercedes-Benz",
    model: "C200",
    year: 2023,
    category: "SEDAN",
    pricePerDay: 0,
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600&auto=format&fit=crop",
    withDriver: true,
    isAvailable: true,
    description:
      "مرسيدس C200 الفاخرة، مثالية لرجال الأعمال والمناسبات الخاصة، تجمع بين الأناقة والراحة المتناهية.",
  },
  {
    id: "toyota-camry",
    make: "Toyota",
    model: "Camry",
    year: 2023,
    category: "SEDAN",
    pricePerDay: 0,
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=600&auto=format&fit=crop",
    withDriver: true,
    isAvailable: true,
    description:
      "تويوتا كامري مريحة واقتصادية، خيار ممتاز للمشاوير اليومية والسفر الطويل.",
  },
];
