import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  heading: string;
  description?: string;
  className?: string;
  centered?: boolean;
}

export function SectionLabel({
  label,
  heading,
  description,
  className,
  centered = false,
}: SectionLabelProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      <div
        className={cn(
          "flex items-center gap-2 mb-3",
          centered && "justify-center"
        )}
      >
        <span className="h-px w-5 bg-primary rounded-full" />
        <span className="text-xs font-semibold text-primary uppercase tracking-widest">
          {label}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
        {heading}
      </h2>
      {description && (
        <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
