export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border-2 border-muted" />
          <div className="absolute inset-0 rounded-full border-2 border-t-primary animate-spin" />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="h-3 w-24 rounded-full bg-muted animate-pulse" />
          <div className="h-3 w-32 rounded-full bg-muted/60 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
