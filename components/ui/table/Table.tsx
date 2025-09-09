import React, { ReactNode } from "react";
type TableProps = {
  rows: ReactNode[];
};
const Table: React.FC<TableProps> = ({ rows }) => {
  return (
    <div className="perspective relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-400 text-gray-500 rtl:text-right">
        <thead className="bg-transparent text-xs text-gray-400 uppercase" />
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
