export default function SkeletonCard() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-muted" />
      <div className="p-6">
        <div className="h-4 bg-muted rounded-lg w-1/3 mb-2" />
        <div className="h-6 bg-muted rounded-lg w-full mb-4" />
        <div className="h-8 bg-muted rounded-lg w-2/3" />
      </div>
    </div>
  );
}
