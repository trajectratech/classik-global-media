export const ProductGallerySkeleton = () => {
  return (
    <div className="w-full bg-almostblack">
      {/* Main Image Skeleton */}
      <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-secondary">
        <div className="w-full h-full bg-muted animate-pulse" />
      </div>

      {/* Thumbnails Skeleton */}
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square rounded-md overflow-hidden cursor-pointer border-2 border-transparent"
          >
            <div className="w-full h-full bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};
