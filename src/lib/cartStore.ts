import { create } from "zustand";
import { type Cart } from "~/types";

type CartStore = {
  cart: Cart | null;
  setCart: (items: Cart, updateLocal?: boolean) => void;
  addItem: (
    item: {
      productId: string;
      quantity: number;
      name: string;
      originalPrice: number;
      discountedPrice: number;
      thumbnail: string;
    },
    updateLocal?: boolean,
  ) => void;
  hydrateFromLocalStoreage: () => void;
};

const localStorageKey = "user-cart";

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  setCart: (items, updateLocal = false) => {
    if (updateLocal) {
      localStorage.setItem(localStorageKey, JSON.stringify(items));
    }
    set({ cart: items });
  },
  addItem: (item, updateLocal = false) => {
    const existingItemIdx = get().cart?.findIndex(
      (item) => item.productId === item.productId,
    );

    const updatedCart = [...(get().cart ?? [])];

    if (existingItemIdx === -1 || existingItemIdx === undefined) {
      updatedCart.push(item);
    } else {
      updatedCart[existingItemIdx] = {
        ...updatedCart[existingItemIdx]!,
        quantity: updatedCart[existingItemIdx]!.quantity + item.quantity,
      };
    }

    if (updateLocal) {
      localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));
    }
    set({
      cart: updatedCart,
    });
  },
  hydrateFromLocalStoreage: () => {
    try {
      const localCart = JSON.parse(
        localStorage.getItem(localStorageKey) ?? "[]",
      ) as Cart;
      set({ cart: localCart ?? [] });
    } catch (_) {
      localStorage.removeItem(localStorageKey);
    }
  },
}));
