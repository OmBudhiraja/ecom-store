import { type Session } from "next-auth";

export type Cart = {
  productId: string;
  quantity: number;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  thumbnail: string;
}[];

export type User = Session["user"];
