import ProductCardSkeleton from "~/components/ProductCardSkeleton";

export default function Loading() {
  return (
    <main className="m-auto grid max-w-screen-2xl grid-cols-1 justify-items-center gap-12 p-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </main>
  );
}
