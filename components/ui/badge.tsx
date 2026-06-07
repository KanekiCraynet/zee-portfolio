import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-200",
        variant === "default" && "bg-muted text-muted-foreground",
        variant === "primary" && "border border-primary/20 bg-primary/10 text-primary hover:bg-primary/15",
        variant === "outline" && "border border-border bg-background/45 text-muted-foreground hover:border-accent/30 hover:text-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
