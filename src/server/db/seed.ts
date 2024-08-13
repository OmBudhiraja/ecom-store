import { config } from "dotenv";
config();

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { type Product, products as productsTable } from "./schema";

const products: Omit<Product, "id">[] = [
  {
    name: `realme Watch S2, 1.43" AMOLED Display, Super AI Engine & upto 20 days battery Smartwatch  (Black Strap, One Size)`,
    originalPrice: 4999,
    discountedPrice: 4999,
    thumbnail:
      "https://res.cloudinary.com/dklj8gnbm/image/upload/v1723558657/ecom-store/wq3nmhcdsjnzpp9bsioh.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Mens Casual Premium Slim Fit T-Shirts",
    originalPrice: 999,
    discountedPrice: 799,
    thumbnail:
      "https://res.cloudinary.com/dklj8gnbm/image/upload/v1723558657/ecom-store/xqyhyj7fizilqkayhccn.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: `boAt Wave Fury with 1.83'' HD Display, Bluetooth Calling & Functional Crown Smartwatch  (Blue Strap, Free Size)`,
    originalPrice: 6999,
    discountedPrice: 1499,
    thumbnail:
      "https://res.cloudinary.com/dklj8gnbm/image/upload/v1723558657/ecom-store/wi5mncqqzbpl2zpezygl.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: `Casual Sneaker Shoes For Men | Enhanced Comfort with Cushioned Insole High Tops For Men  (White, Blue , 6)`,
    originalPrice: 999,
    discountedPrice: 734,
    thumbnail:
      "https://res.cloudinary.com/dklj8gnbm/image/upload/v1723558658/ecom-store/nbk9ccevkbqe9bynghqn.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: `Men Full Sleeve Printed Hooded Sweatshirt`,
    originalPrice: 1499,
    discountedPrice: 809,
    thumbnail:
      "https://res.cloudinary.com/dklj8gnbm/image/upload/v1723558658/ecom-store/bfe1olzmol7b19hx5qsg.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: `Men Printed Round Neck Pure Cotton Black T-Shirt`,
    originalPrice: 999,
    discountedPrice: 399,
    thumbnail:
      "https://res.cloudinary.com/dklj8gnbm/image/upload/v1723558658/ecom-store/urjiulxxrdco9gwyrjuf.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: `NIKE W Revolution 7 Running Shoes For Women  (Black , 3.5)`,
    originalPrice: 3695,
    discountedPrice: 2032,
    thumbnail:
      "https://res.cloudinary.com/dklj8gnbm/image/upload/v1723558658/ecom-store/ispgszctkdoaqbattpzg.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: `deconstruct Sunscreen - SPF 55+ PA+++ Lightweight Gel Sunscreen | No White Cast | For men & Women |  (50 g)`,
    originalPrice: 349,
    discountedPrice: 331,
    thumbnail:
      "https://res.cloudinary.com/dklj8gnbm/image/upload/v1723558659/ecom-store/n4ltjkskvtrs5ybudn2g.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    name: `EVM Nano Type-C OTG, USB 3.1 Gen 1 - Ultra Fast Access, Shockproof Metal Casing 64 GB OTG Drive  (Silver, Type C)`,
    originalPrice: 3199,
    discountedPrice: 499,
    thumbnail:
      "https://res.cloudinary.com/dklj8gnbm/image/upload/v1723558659/ecom-store/lms1eqhoulesmmmn9csm.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedProducts() {
  console.log("Seeding products");
  const conn = neon(process.env.DATABASE_URL!);
  const db = drizzle(conn);
  await db.insert(productsTable).values(products);
  console.log("completed");
}

void seedProducts();
