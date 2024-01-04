import { FunctionComponent, useState } from "react";
import DataTable from "./Table";
import { Button, Modal } from "flowbite-react";
import { useModalStore } from "../../store/useStore";

interface IndexProps {}

const Index: FunctionComponent<IndexProps> = () => {
  const [openModal, setOpenModal] = useState(false);
  const { addProduct, products } = useModalStore();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    purchasePrice: "",
    sellingPrice: "",
    quantity: "",
    category: "",
    description: "",
  });

  const headers = [
    "Codigo",
    "Producto",
    "Precio Compra",
    "Precio Venta",
    "Entradas",
    "Salidas",
    "Stock Actual",
  ];

  const result = products.map((product) => [
    product.code,
    product.name,
    `$${product.purchasePrice}.00`,
    `$${product.sellingPrice}.00`,
    product.quantity,
    product.category,
    product.description,
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    setOpenModal(false);
  };

  const handleCreate = (): void => {
    setOpenModal(false);

    // Incrementar el codeCounter desde el componente
    useModalStore.getState().incrementCodeCounter();

    // Obtener el nuevo codeCounter actualizado
    const updatedCodeCounter = useModalStore.getState().codeCounter;

    const newProduct = {
      ...formData,
      code: `00${updatedCodeCounter}`,
    };

    addProduct(newProduct);
  };

  return (
    <>
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl dark:text-white">Productos</h1>
        <div className="flex justify-center m-5">
          <button
            id="productModalButton"
            data-modal-target="productModal"
            data-modal-toggle="productModal"
            className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="button"
            onClick={() => setOpenModal(true)}
          >
            Nuevo Producto
          </button>
        </div>
      </div>

      <div className="flex  w-full">
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Crear Producto</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit} action="#">
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={formData.name}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="purchasePrice"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Precio Compra
                  </label>
                  <input
                    type="number"
                    name="purchasePrice"
                    value={formData.purchasePrice}
                    onChange={handleInputChange}
                    id="purchasePrice"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$12.00"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sellingPrice"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Precio Venta
                  </label>
                  <input
                    type="number"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleInputChange}
                    id="sellingPrice"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$15.00"
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCreate}>Crear</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
        <DataTable headers={headers} data={result} />
      </div>
    </>
  );
};

export default Index;
