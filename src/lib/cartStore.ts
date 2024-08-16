import { create } from "zustand";
import { addToCart } from "~/server/api/cart";
import { type Cart } from "~/types";

type CartStore = {
  cart: Cart | null;
  initCart: (items: Cart) => void;
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
  initCart: (items) => {
    // init has already been called
    const existingCart = get().cart;
    if (existingCart && existingCart.length > 0) {
      return;
    }

    // check if there are items in local storage and merge them with server items
    try {
      const localCart = JSON.parse(
        localStorage.getItem(localStorageKey) ?? "[]",
      ) as Cart;
      if (localCart.length > 0) {
        void addToCart(
          localCart.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        );

        const merged = mergeCartProducts([...localCart, ...items]);
        localStorage.removeItem(localStorageKey);
        set({ cart: merged });
        return;
      }
    } catch (err) {
      console.log("Error reading from local storage", err);
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

// merges the same products in the cart
function mergeCartProducts(items: Cart) {
  // items might have duplicate products
  const updatedCart = items.reduce((acc, item) => {
    const existingItemIdx = acc.findIndex(
      (p) => p.productId === item.productId,
    );

    if (existingItemIdx === -1 || existingItemIdx === undefined) {
      acc.push(item);
    } else {
      const currentQuantity =
        acc[existingItemIdx]!.quantity < 1 ? 1 : acc[existingItemIdx]!.quantity;
      const newQuantity = item.quantity < 1 ? 1 : item.quantity;

      acc[existingItemIdx] = {
        ...acc[existingItemIdx]!,
        quantity: currentQuantity + newQuantity,
      };
    }

    return acc;
  }, [] as Cart);

  return updatedCart;
}
