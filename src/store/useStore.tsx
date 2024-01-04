import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ModalState {
  codeCounter: number;
  products: Product[];
  sales: Sale[];
  addProduct: (product: Product) => void;
  incrementCodeCounter: () => void;
}

interface Product {
  code: string;
  name: string;
  purchasePrice: string;
  sellingPrice: string;
  quantity: string;
  category: string;
  description: string;
}

interface Sale {
  productName: string;
  quantity: number;
  totalPrice: number;
}

export const useModalStore = create<ModalState>()(
  devtools((set) => ({
    codeCounter: 1,
    products: [],
    sales: [],
    addProduct: (product) =>
      set((state) => ({
        codeCounter: state.codeCounter,
        products: [
          ...state.products,
          { ...product, code: `00${state.codeCounter}` },
        ],
      })),
    incrementCodeCounter: () =>
      set((state) => ({ codeCounter: state.codeCounter + 1 })),
  }))
);
