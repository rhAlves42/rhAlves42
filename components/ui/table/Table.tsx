import React, { ReactNode } from "react";
type TableProps = {
  rows: ReactNode[];
};
const Table: React.FC<TableProps> = ({ rows }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg perspective">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 text-gray-400">
        <thead className="text-xs uppercase bg-transparent dark:bg-gray-700 text-gray-400" />
        <tbody>
          {rows.map((i, index) => (
            <React.Fragment key={index}>{i}</React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
