import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-11 w-16",
  md: "h-14 w-20",
  lg: "h-20 w-28",
};

export function Logo({ className, size = "md" }: LogoProps) {
  return (
    <span
      className={cn(
        "block shrink-0 overflow-hidden rounded-sm bg-[url('/brand/sgt-logo-gold.png')] bg-[length:300%_auto] bg-[position:center_39%] bg-no-repeat",
        sizeMap[size],
        className
      )}
      aria-label="SGT"
      role="img"
    />
  );
}
