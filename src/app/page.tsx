import ProductCard from "~/components/ProductCard";
import { getProducts } from "~/server/api/products";
import { type Product } from "~/server/db/schema";

export default async function HomePage() {
  const products = await getProducts();

  async function handleAddToCart(product: Product) {
    "use server";
    //TODO:
  }

  return (
    <main className="m-auto grid max-w-screen-2xl grid-cols-1 justify-items-center gap-12 p-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </main>
  );
}
