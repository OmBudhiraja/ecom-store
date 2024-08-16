"use server";

import { and, eq, getTableName, sql } from "drizzle-orm";
import { getServerAuthSession } from "../auth";
import { db } from "../db";
import { cartItem, products } from "../db/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function getCart() {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return { message: "Unauthorized", success: false };
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

    return { success: true, cart };
  } catch (e) {
    return { sucess: false, message: "Something went wrong" };
  }
}

const addToCartSchema = z.array(
  z.object({ productId: z.string(), quantity: z.number().min(1) }).strict(),
);

export async function addToCart(
  items: { productId: string; quantity: number }[],
) {
  try {
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
        set: {
          quantity: sql.raw(
            `${getTableName(cartItem)}.${cartItem.quantity.name} + excluded.quantity`,
          ),
        },
      });

    return { success: true };
  } catch (e) {
    revalidatePath("/cart");
    return { message: "Something went wrong", success: false };
  }
}

export async function removeFromCart(productId: string) {
  try {
    if (!productId || typeof productId !== "string") {
      return { message: "Invalid request body", success: false };
    }

    const session = await getServerAuthSession();

    if (!session) {
      return { message: "Unauthorized", success: false };
    }

    await db
      .delete(cartItem)
      .where(
        and(
          eq(cartItem.userId, session.user.id),
          eq(cartItem.productId, productId),
        ),
      );

    revalidatePath("/cart");

    return { success: true };
  } catch (e) {
    revalidatePath("/");
    return { message: "Something went wrong", success: false };
  }
}

const updateQuantitySchema = z
  .object({
    productId: z.string(),
    quantity: z.number().min(1),
  })
  .strict();

export async function updateQuantity(productId: string, quantity: number) {
  try {
    const body = updateQuantitySchema.safeParse({ productId, quantity });

    if (!body.success) {
      return { message: "Invalid request body", success: false };
    }

    const session = await getServerAuthSession();

    if (!session) {
      return { message: "Unauthorized", success: false };
    }

    await db
      .update(cartItem)
      .set({ quantity })
      .where(
        and(
          eq(cartItem.userId, session.user.id),
          eq(cartItem.productId, productId),
        ),
      );

    return { success: true };
  } catch (e) {
    revalidatePath("/cart");
    return { message: "Something went wrong", success: false };
  }
}
