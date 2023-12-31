import { FunctionComponent } from "react";
import BarChart from "./Charts/BarChart";
import { useModalStore } from "../store/useStore";

interface SalesProps {}

const Sales: FunctionComponent<SalesProps> = () => {
  const { sales: data } = useModalStore();
  return (
    <>
      <h1 className="text-2xl">Ventas</h1>
      <div className="h-72">
        <BarChart data={data} keys={["totalPrice"]} indexBy={"productName"} />
      </div>
    </>
  );
};

export default Sales;
