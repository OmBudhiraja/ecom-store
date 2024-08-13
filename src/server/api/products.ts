"use server";
import { db } from "~/server/db";
import { products } from "../db/schema";

export async function getProducts() {
  const data = await db.select().from(products);
  return data;
}
