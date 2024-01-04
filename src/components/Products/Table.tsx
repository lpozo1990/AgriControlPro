import { Table } from "flowbite-react";
import { FunctionComponent, ReactNode } from "react";

// Define tipos para las cabeceras y datos
interface DataTableProps {
  headers: ReactNode[];
  data: Array<Array<ReactNode>>;
}

const DataTable: FunctionComponent<DataTableProps> = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          {headers.map((header, index) => (
            <Table.HeadCell key={index}>{header}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((row, rowIndex) => (
            <Table.Row
              key={rowIndex}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {row.map((cell, cellIndex) => (
                <Table.Cell key={cellIndex}>{cell}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DataTable;
