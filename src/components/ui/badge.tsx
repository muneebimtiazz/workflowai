import * as React from "react";

import { cn } from "./utils";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  asChild?: boolean;
}

const getVariantClasses = (variant: BadgeVariant) => {
  switch (variant) {
    case "default":
      return "border-transparent bg-primary text-primary-foreground hover:bg-primary/90";
    case "secondary":
      return "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90";
    case "destructive":
      return "border-transparent bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60";
    case "outline":
      return "text-foreground hover:bg-accent hover:text-accent-foreground";
    default:
      return "border-transparent bg-primary text-primary-foreground hover:bg-primary/90";
  }
};

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
        getVariantClasses(variant),
        className,
      )}
      {...props}
    />
  );
}

const badgeVariants = getVariantClasses;

export { Badge, badgeVariants };