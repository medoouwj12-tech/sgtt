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
    id: "dfsk-glory-330",
    make: "DFSK",
    model: "Glory 330",
    year: 2023,
    category: "VAN",
    pricePerDay: 0,
    imageUrl: "/fleet/glory-330-4.jpg",
    withDriver: true,
    isAvailable: true,
    description:
      "دفسك جلوري 330 عائلية 7 راكب مريحة جداً، مثالية للسفر والرحلات والمشاوير الخاصة مع العائلة.",
  },
  {
    id: "chery-tiggo-8",
    make: "Chery",
    model: "Tiggo 8",
    year: 2023,
    category: "SUV",
    pricePerDay: 0,
    imageUrl: "/fleet/tiggo-8-5.jpg",
    withDriver: true,
    isAvailable: true,
    description:
      "شيري تيجو 8 العائلية 7 راكب، تصميم فاخر ومساحة واسعة وتكنولوجيا متطورة لرحلة مريحة وآمنة.",
  },
  {
    id: "hyundai-elantra-cn7",
    make: "Hyundai",
    model: "Elantra CN7",
    year: 2023,
    category: "SEDAN",
    pricePerDay: 0,
    imageUrl: "/fleet/elantra-cn7-2.jpg",
    withDriver: true,
    isAvailable: true,
    description:
      "هيونداي إلنترا CN7 بتصميمها الرياضي العصري، مريحة وأنيقة ومناسبة جداً لجميع المشاوير.",
  },
];
