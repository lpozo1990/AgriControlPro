import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ModalState {
  formData: {
    name: string;
    price: number;
    quantity: number;
    category: string;
    description: string;
  };
  products: Product[];
  setFormData: (data: Partial<ModalState["formData"]>) => void;
  addProduct: (product: Product) => void;
}

interface Product {
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
}

export const useModalStore = create<ModalState>()(
  devtools((set) => ({
    formData: {
      name: "",
      price: 0,
      quantity: 0,
      category: "",
      description: "",
    },
    products: [],
    setFormData: (data) =>
      set((state) => ({ formData: { ...state.formData, ...data } })),
    addProduct: (product) =>
      set((state) => ({ products: [...state.products, product] })),
  }))
);
