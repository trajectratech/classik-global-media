import Link from "next/link";

export function NoResults({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center my-1 md:my-4">
      {/* Artistic SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-32 h-32 mb-6 text-yellow-400"
        fill="none"
        viewBox="0 0 64 64"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle
          cx="32"
          cy="32"
          r="30"
          stroke="#F7D488"
          strokeWidth="4"
          fill="#FEF9EF"
        />
        <path
          d="M20 24l12 12 12-12"
          stroke="#F7D488"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      <h2 className="text-2xl font-semibold mb-2 text-gray-800">
        No products found
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        We couldn&apos;t find any products matching{" "}
        <strong className="text-golden">&quot;{query}&quot;</strong>. Try
        searching with different keywords or browse our collection.
      </p>

      <Link
        href="/"
        className="inline-block px-6 py-3 bg-golden text-white rounded-full font-semibold hover:bg-yellow-500 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
