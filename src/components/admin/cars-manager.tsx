"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CAR_CATEGORIES } from "@/lib/constants";
import type { Car, CarCategory } from "@/types";

interface CarsManagerProps {
  initialCars: Car[];
}

const emptyCar = {
  make: "",
  model: "",
  year: new Date().getFullYear(),
  category: "LUXURY" as CarCategory,
  pricePerDay: 0,
  imageUrl: "",
  withDriver: true,
  isAvailable: true,
  description: "",
};

export function CarsManager({ initialCars }: CarsManagerProps) {
  const [cars, setCars] = useState(initialCars);
  const [editing, setEditing] = useState<Partial<Car> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const openNew = () => {
    setEditing({ ...emptyCar, id: "" });
    setIsNew(true);
  };

  const openEdit = (car: Car) => {
    setEditing({ ...car });
    setIsNew(false);
  };

  const close = () => {
    setEditing(null);
    setIsNew(false);
  };

  const save = async () => {
    if (!editing) return;
    setLoading(true);

    const payload = {
      make: editing.make,
      model: editing.model,
      year: Number(editing.year),
      category: editing.category,
      pricePerDay: Number(editing.pricePerDay),
      imageUrl: editing.imageUrl,
      withDriver: editing.withDriver,
      isAvailable: editing.isAvailable,
      description: editing.description || null,
    };

    try {
      if (isNew) {
        const res = await fetch("/api/cars", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const car = await res.json();
          setCars((c) => [car, ...c]);
          close();
        }
      } else if (editing.id) {
        const res = await fetch(`/api/cars/${editing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const car = await res.json();
          setCars((c) => c.map((x) => (x.id === car.id ? car : x)));
          close();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this car?")) return;
    const res = await fetch(`/api/cars/${id}`, { method: "DELETE" });
    if (res.ok) setCars((c) => c.filter((x) => x.id !== id));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-light text-gold">Manage Cars</h1>
        <Button onClick={openNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Car
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gold/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold/10 bg-[#0a0a0a] text-left text-zinc-500">
              <th className="p-4">Vehicle</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price/Day</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id} className="border-b border-white/5">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-16 overflow-hidden rounded">
                      <Image src={car.imageUrl} alt="" fill className="object-cover" />
                    </div>
                    <span>
                      {car.make} {car.model}
                    </span>
                  </div>
                </td>
                <td className="p-4">{car.category}</td>
                <td className="p-4 text-gold">{car.pricePerDay.toLocaleString()} EGP</td>
                <td className="p-4">
                  {car.isAvailable ? (
                    <span className="text-green-400">Available</span>
                  ) : (
                    <span className="text-red-400">Unavailable</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(car)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400"
                      onClick={() => remove(car.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gold/20 bg-[#0a0a0a] p-6">
            <h2 className="mb-6 font-serif text-xl text-gold">
              {isNew ? "Add Car" : "Edit Car"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Make">
                <Input
                  value={editing.make ?? ""}
                  onChange={(e) => setEditing((x) => ({ ...x!, make: e.target.value }))}
                  className="bg-black/50 text-white"
                />
              </Field>
              <Field label="Model">
                <Input
                  value={editing.model ?? ""}
                  onChange={(e) => setEditing((x) => ({ ...x!, model: e.target.value }))}
                  className="bg-black/50 text-white"
                />
              </Field>
              <Field label="Year">
                <Input
                  type="number"
                  value={editing.year ?? ""}
                  onChange={(e) =>
                    setEditing((x) => ({ ...x!, year: parseInt(e.target.value, 10) }))
                  }
                  className="bg-black/50 text-white"
                />
              </Field>
              <Field label="Price/Day">
                <Input
                  type="number"
                  value={editing.pricePerDay ?? ""}
                  onChange={(e) =>
                    setEditing((x) => ({
                      ...x!,
                      pricePerDay: parseFloat(e.target.value),
                    }))
                  }
                  className="bg-black/50 text-white"
                />
              </Field>
              <Field label="Category" className="sm:col-span-2">
                <select
                  value={editing.category}
                  onChange={(e) =>
                    setEditing((x) => ({
                      ...x!,
                      category: e.target.value as CarCategory,
                    }))
                  }
                  className="h-11 w-full rounded-lg border border-border bg-black/50 px-4 text-white"
                >
                  {CAR_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Image URL" className="sm:col-span-2">
                <Input
                  value={editing.imageUrl ?? ""}
                  onChange={(e) => setEditing((x) => ({ ...x!, imageUrl: e.target.value }))}
                  className="bg-black/50 text-white"
                />
              </Field>
              <Field label="Description" className="sm:col-span-2">
                <Input
                  value={editing.description ?? ""}
                  onChange={(e) =>
                    setEditing((x) => ({ ...x!, description: e.target.value }))
                  }
                  className="bg-black/50 text-white"
                />
              </Field>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editing.withDriver}
                  onChange={(e) =>
                    setEditing((x) => ({ ...x!, withDriver: e.target.checked }))
                  }
                />
                With Driver
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editing.isAvailable}
                  onChange={(e) =>
                    setEditing((x) => ({ ...x!, isAvailable: e.target.checked }))
                  }
                />
                Available
              </label>
            </div>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button onClick={save} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
