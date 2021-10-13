import React from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export default function DataGrid({ columnDefs, rowData }) {
  return (
    <div
      className="ag-theme-balham"
      style={{
        width: 1204,
        height: 500,
      }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection="multiple"
      />
    </div>
  );
}
