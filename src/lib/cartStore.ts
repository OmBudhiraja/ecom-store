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
  remoteItem: (productId: string, updateLocal?: boolean) => void;
  hydrateFromLocalStoreage: () => void;
  handleQuantityChange: (
    productId: string,
    quantity: number,
    updateLocal?: boolean,
  ) => void;
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
      (p) => p.productId === item.productId,
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
  remoteItem: (productId, updateLocal = false) => {
    const updatedCart = get().cart?.filter(
      (item) => item.productId !== productId,
    );

    if (updateLocal) {
      localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));
    }
    set({
      cart: updatedCart,
    });
  },

  handleQuantityChange: (productId, quantity, updateLocal = false) => {
    const updatedCart = get().cart?.map((item) => {
      if (item.productId === productId) {
        return { ...item, quantity };
      }
      return item;
    });

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
