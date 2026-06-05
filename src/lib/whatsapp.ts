export const WHATSAPP_NUMBER = "201005845698";

export function buildBookingMessage(data: {
  name: string;
  carName: string;
  passengers?: number;
  pickup: string;
  dropoff: string;
  date: string;
  time?: string;
  phone?: string;
}): string {
  const lines = [
    "Hello SGT! I'd like to book a car.",
    `Name: ${data.name}`,
    `Phone: ${data.phone ?? "—"}`,
    `Car: ${data.carName}`,
    `From: ${data.pickup}`,
    `To: ${data.dropoff}`,
    `Date: ${data.date}`,
  ];

  if (data.passengers) {
    lines.splice(4, 0, `Passengers: ${data.passengers}`);
  }

  if (data.time) {
    lines.push(`Time: ${data.time}`);
  }

  return lines.join("\n");
}

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
