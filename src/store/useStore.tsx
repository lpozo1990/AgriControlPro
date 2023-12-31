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
  sales: Sale[];
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

interface Sale {
  productName: string;
  quantity: number;
  totalPrice: number;
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
    sales: [],
    setFormData: (data) =>
      set((state) => ({ formData: { ...state.formData, ...data } })),
    addProduct: (product) =>
      set((state) => {
        // Verificar si el producto ya está en las ventas
        const existingSaleIndex = state.sales.findIndex(
          (sale) => sale.productName === product.name
        );

        if (existingSaleIndex !== -1) {
          // Si el producto ya está en las ventas, actualizar la cantidad y el precio total
          const updatedSales = [...state.sales];
          updatedSales[existingSaleIndex].quantity += product.quantity;
          updatedSales[existingSaleIndex].totalPrice +=
            product.quantity * product.price;

          return { products: [...state.products], sales: updatedSales };
        } else {
          // Si el producto no está en las ventas, agregarlo al array de productos
          const updatedProducts = [...state.products, product];

          // Calcular la venta y agregarla al array de ventas
          const sale = {
            productName: product.name,
            quantity: product.quantity,
            totalPrice: product.quantity * product.price,
          };

          const updatedSales = [...state.sales, sale];

          return { products: updatedProducts, sales: updatedSales };
        }
      }),
  }))
);
