import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold font-mono uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        critical: "border-transparent bg-severity-critical text-white shadow-[0_0_10px_hsl(var(--severity-critical)/0.5)]",
        high: "border-transparent bg-severity-high text-white",
        medium: "border-transparent bg-severity-medium text-black",
        low: "border-transparent bg-severity-low text-white",
        resolved: "border-transparent bg-severity-resolved text-primary-foreground",
        active: "border-transparent bg-status-active text-white",
        pending: "border-transparent bg-status-pending text-black",
        escalated: "border-transparent bg-status-escalated text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
