"use server";

import { eq, sql } from "drizzle-orm";
import { getServerAuthSession } from "../auth";
import { db } from "../db";
import { cartItem, products } from "../db/schema";
import { z } from "zod";

export async function getCart() {
  const session = await getServerAuthSession();

  if (!session) {
    return null;
  }

  const cart = await db
    .select({
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      name: products.name,
      originalPrice: products.originalPrice,
      discountedPrice: products.discountedPrice,
      thumbnail: products.thumbnail,
    })
    .from(cartItem)
    .innerJoin(products, eq(cartItem.productId, products.id))
    .where(eq(cartItem.userId, session.user.id));

  return cart;
}

export type UserCart = Awaited<ReturnType<typeof getCart>>;

const addToCartSchema = z.array(
  z.object({ productId: z.string(), quantity: z.number().min(1) }),
);

export async function addToCart(
  items: { productId: string; quantity: number }[],
) {
  const body = addToCartSchema.safeParse(items);

  if (!body.success) {
    return { message: "Invalid request body", success: false };
  }

  const session = await getServerAuthSession();

  if (!session) {
    return { message: "Unauthorized", success: false };
  }

  await db
    .insert(cartItem)
    .values(
      items.map((item) => ({
        userId: session.user.id,
        ...item,
      })),
    )
    .onConflictDoUpdate({
      target: [cartItem.userId, cartItem.productId],
      set: { quantity: sql.raw(`excluded.quantity`) },
    });

  const updatedCart = await db
    .select({
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      name: products.name,
      originalPrice: products.originalPrice,
      discountedPrice: products.discountedPrice,
      thumbnail: products.thumbnail,
    })
    .from(cartItem)
    .innerJoin(products, eq(cartItem.productId, products.id))
    .where(eq(cartItem.userId, session.user.id));

  return { cart: updatedCart, success: true };
}
