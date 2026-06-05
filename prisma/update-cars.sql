-- Delete old sedan cars (Mercedes and Toyota)
DELETE FROM "Car" WHERE id IN ('mercedes-benz-c200', 'toyota-camry');

-- Upsert DFSK Glory 330
INSERT INTO "Car" (id, make, model, year, category, "pricePerDay", "imageUrl", "withDriver", "isAvailable", description)
VALUES (
  'dfsk-glory-330', 'DFSK', 'Glory 330', 2023, 'VAN', 0,
  '/fleet/glory-330-4.jpg', true, true,
  'دفسك جلوري 330 عائلية 7 راكب مريحة جداً، مثالية للسفر والرحلات والمشاوير الخاصة مع العائلة.'
)
ON CONFLICT (id) DO UPDATE SET
  make = EXCLUDED.make, model = EXCLUDED.model, year = EXCLUDED.year,
  category = EXCLUDED.category, "pricePerDay" = EXCLUDED."pricePerDay",
  "imageUrl" = EXCLUDED."imageUrl", "withDriver" = EXCLUDED."withDriver",
  "isAvailable" = EXCLUDED."isAvailable", description = EXCLUDED.description;

-- Upsert Chery Tiggo 8
INSERT INTO "Car" (id, make, model, year, category, "pricePerDay", "imageUrl", "withDriver", "isAvailable", description)
VALUES (
  'chery-tiggo-8', 'Chery', 'Tiggo 8', 2023, 'SUV', 0,
  '/fleet/tiggo-8-5.jpg', true, true,
  'شيري تيجو 8 العائلية 7 راكب، تصميم فاخر ومساحة واسعة وتكنولوجيا متطورة لرحلة مريحة وآمنة.'
)
ON CONFLICT (id) DO UPDATE SET
  make = EXCLUDED.make, model = EXCLUDED.model, year = EXCLUDED.year,
  category = EXCLUDED.category, "pricePerDay" = EXCLUDED."pricePerDay",
  "imageUrl" = EXCLUDED."imageUrl", "withDriver" = EXCLUDED."withDriver",
  "isAvailable" = EXCLUDED."isAvailable", description = EXCLUDED.description;

-- Upsert Hyundai Elantra CN7
INSERT INTO "Car" (id, make, model, year, category, "pricePerDay", "imageUrl", "withDriver", "isAvailable", description)
VALUES (
  'hyundai-elantra-cn7', 'Hyundai', 'Elantra CN7', 2023, 'SEDAN', 0,
  '/fleet/elantra-cn7-2.jpg', true, true,
  'هيونداي إلنترا CN7 بتصميمها الرياضي العصري، مريحة وأنيقة ومناسبة جداً لجميع المشاوير.'
)
ON CONFLICT (id) DO UPDATE SET
  make = EXCLUDED.make, model = EXCLUDED.model, year = EXCLUDED.year,
  category = EXCLUDED.category, "pricePerDay" = EXCLUDED."pricePerDay",
  "imageUrl" = EXCLUDED."imageUrl", "withDriver" = EXCLUDED."withDriver",
  "isAvailable" = EXCLUDED."isAvailable", description = EXCLUDED.description;

-- Confirm result
SELECT id, make, model, category FROM "Car" ORDER BY "createdAt";
