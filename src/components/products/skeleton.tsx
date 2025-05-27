export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="h-56 w-full bg-gray-300 rounded-t-2xl" />
      <div className="p-5 flex flex-col flex-grow space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-20 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
