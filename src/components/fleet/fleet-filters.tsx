"use client";

import { useCallback, useState, useEffect } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { CAR_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FleetFilters() {
  const t = useTranslations("fleet");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "ALL";
  const withDriver = searchParams.get("withDriver") ?? "ALL";
  const searchQuery = searchParams.get("search") ?? "";

  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "ALL" || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== searchQuery) {
        updateParams("search", searchInput);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, searchQuery, updateParams]);

  return (
    <div className="space-y-4 rounded-2xl border border-gold/10 bg-card/50 p-4 backdrop-blur-sm sm:p-6">
      <div className="relative">
        <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("search")}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="ps-10"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="w-full text-xs font-medium uppercase tracking-wider text-muted-foreground sm:w-auto sm:me-2 sm:self-center">
          {t("category")}:
        </span>
        <FilterChip
          active={category === "ALL"}
          onClick={() => updateParams("category", "ALL")}
          label={t("allCategories")}
        />
        {CAR_CATEGORIES.map((cat) => (
          <FilterChip
            key={cat}
            active={category === cat}
            onClick={() => updateParams("category", cat)}
            label={t(`categories.${cat}`)}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="w-full text-xs font-medium uppercase tracking-wider text-muted-foreground sm:w-auto sm:me-2 sm:self-center">
          {t("withDriver")}:
        </span>
        {(["ALL", "true", "false"] as const).map((val) => (
          <FilterChip
            key={val}
            active={withDriver === val}
            onClick={() => updateParams("withDriver", val)}
            label={val === "ALL" ? t("all") : val === "true" ? t("yes") : t("no")}
          />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm transition-all duration-300",
        active
          ? "border-gold bg-gold/15 text-gold"
          : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}
