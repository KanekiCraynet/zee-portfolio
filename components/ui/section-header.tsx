import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" && "text-center mx-auto", className)}>
      <div
        className={cn(
          "mb-4 flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-px w-10 bg-accent" aria-hidden="true" />
        <span className="kicker">{label}</span>
      </div>
      <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
