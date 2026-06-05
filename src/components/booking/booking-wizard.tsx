"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  User,
  MapPin,
  Check,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildBookingMessage, getWhatsAppUrl } from "@/lib/whatsapp";
import type { PublicCar } from "@/types";

const STEPS = [1, 2, 3, 4] as const;

interface BookingWizardProps {
  cars: PublicCar[];
}

export function BookingWizard({ cars }: BookingWizardProps) {
  const t = useTranslations("booking");
  const searchParams = useSearchParams();
  const preselectedId = searchParams.get("carId");
  const preselectedPickup = searchParams.get("pickup");
  const preselectedDropoff = searchParams.get("dropoff");

  const [step, setStep] = useState<1 | 2 | 3 | 4>(preselectedId ? 2 : 1);
  const [form, setForm] = useState({
    carId: preselectedId ?? "",
    name: "",
    phone: "",
    pickupLocation: preselectedPickup ?? "",
    dropoffLocation: preselectedDropoff ?? "",
    date: "",
    time: "",
    passengers: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedCar = useMemo(
    () => cars.find((c) => c.id === form.carId),
    [cars, form.carId]
  );

  const carName = selectedCar
    ? `${selectedCar.make} ${selectedCar.model}`
    : "";

  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (s === 1 && !form.carId) newErrors.carId = t("required");
    if (s === 2) {
      if (!form.name.trim()) newErrors.name = t("required");
      if (!form.phone.trim()) newErrors.phone = t("required");
    }
    if (s === 3) {
      if (!form.pickupLocation.trim()) newErrors.pickupLocation = t("required");
      if (!form.dropoffLocation.trim()) newErrors.dropoffLocation = t("required");
      if (!form.date) newErrors.date = t("required");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(4, s + 1) as 1 | 2 | 3 | 4);
  };

  const back = () => setStep((s) => Math.max(1, s - 1) as 1 | 2 | 3 | 4);

  const submitWhatsApp = async () => {
    if (!validateStep(3) || !selectedCar) return;

    const message = buildBookingMessage({
      name: form.name,
      carName,
      passengers: form.passengers,
      pickup: form.pickupLocation,
      dropoff: form.dropoffLocation,
      date: form.date,
      time: form.time,
      phone: form.phone,
    });

    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: form.carId,
          name: form.name,
          phone: form.phone,
          pickupLocation: form.pickupLocation,
          dropoffLocation: form.dropoffLocation,
          date: form.date,
          time: form.time,
          passengers: form.passengers,
        }),
      });
    } catch {
      // Continue to WhatsApp even if DB save fails
    }

    window.open(getWhatsAppUrl(message), "_blank");
  };

  const stepIcons = [Car, User, MapPin, Check];

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-10 flex items-center justify-between">
        {STEPS.map((s, i) => {
          const Icon = stepIcons[i];
          return (
            <div key={s} className="flex flex-1 items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                  step >= s
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-border text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-2 h-px flex-1 transition-colors ${
                    step > s ? "bg-gold" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl">{t("selectCar")}</h2>
              <div className="grid gap-3">
                {cars.map((car) => (
                  <button
                    key={car.id}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, carId: car.id }))}
                    className={`flex items-center gap-4 rounded-xl border p-3 text-start transition-all ${
                      form.carId === car.id
                        ? "border-gold bg-gold/10"
                        : "border-border hover:border-gold/40"
                    }`}
                  >
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={car.imageUrl}
                        alt={car.make}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">
                        {car.make} {car.model}
                      </p>
                      <p className="line-clamp-1 text-sm text-muted-foreground">
                        {car.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              {errors.carId && (
                <p className="text-sm text-red-400">{errors.carId}</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-serif text-2xl">{t("step2")}</h2>
              <Field label={t("fullName")} error={errors.name}>
                <Input
                  placeholder={t("fullNamePlaceholder")}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </Field>
              <Field label={t("phone")} error={errors.phone}>
                <Input
                  type="tel"
                  placeholder={t("phonePlaceholder")}
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-serif text-2xl">{t("step3")}</h2>
              <Field label={t("pickup")} error={errors.pickupLocation}>
                <Input
                  placeholder={t("pickupPlaceholder")}
                  value={form.pickupLocation}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, pickupLocation: e.target.value }))
                  }
                />
              </Field>
              <Field label={t("dropoff")} error={errors.dropoffLocation}>
                <Input
                  placeholder={t("dropoffPlaceholder")}
                  value={form.dropoffLocation}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, dropoffLocation: e.target.value }))
                  }
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t("date")} error={errors.date}>
                  <Input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  />
                </Field>
                <Field label={t("time")}>
                  <Input
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                  />
                </Field>
              </div>
              <Field label={t("passengers")}>
                <Input
                  type="number"
                  min={1}
                  max={20}
                  value={form.passengers}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      passengers: parseInt(e.target.value, 10) || 1,
                    }))
                  }
                />
              </Field>
            </div>
          )}

          {step === 4 && selectedCar && (
            <div className="space-y-5">
              <h2 className="font-serif text-2xl">{t("review")}</h2>
              <div className="rounded-2xl border border-gold/20 bg-card p-6 space-y-3 text-sm">
                <Row label={t("selectedCar")} value={carName} />
                <Row label={t("fullName")} value={form.name} />
                <Row label={t("phone")} value={form.phone} />
                <Row label={t("pickup")} value={form.pickupLocation} />
                <Row label={t("dropoff")} value={form.dropoffLocation} />
                <Row label={t("date")} value={`${form.date} ${form.time}`} />
                <Row label={t("passengers")} value={String(form.passengers)} />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-10 flex gap-3">
        {step > 1 && (
          <Button variant="outline" onClick={back} className="gap-1">
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            {t("back")}
          </Button>
        )}
        <div className="flex-1" />
        {step < 4 ? (
          <Button onClick={next} className="gap-1">
            {t("next")}
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </Button>
        ) : (
          <Button onClick={submitWhatsApp} className="gap-2">
            <MessageCircle className="h-5 w-5" />
            {t("submit")}
          </Button>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/50 pb-2 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-end">{value}</span>
    </div>
  );
}
