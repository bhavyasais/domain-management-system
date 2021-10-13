import React from "react";
import DataGrid from "./DataGrid";

export default {
  title: "Molecules/Grid",
};

const clickedCheckbox = (params) => {
}

const checkboxRenderer = (params) => {
  return <div><input type="checkbox" onClick={() => clickedCheckbox(params)} /></div>;
}

const headerRenderer = (params) => {
  const name = params.displayName;
  return <div><input type="checkbox" onClick={() => clickedCheckbox(params)} /><label>{name}</label></div>;
}

const redoFunction = (headerName, headerField) => {
  return  { headerName: headerName, field: headerField, cellRendererFramework: (params) => {
    return checkboxRenderer(params);
  }, headerComponentFramework: (params) => {
    return headerRenderer(params);
  }, cellStyle: {textAlign: 'center'}};

}

const columnDefs = [
    { headerName: "S no", valueGetter: "node.rowIndex + 1"},
    { headerName: 'A Trust Group', field: 'trustGroup', sortable: true, filter: true },
];

columnDefs.push(redoFunction("Edit File?", "editFile"));
columnDefs.push(redoFunction("View File?", "viewFile"));
columnDefs.push(redoFunction("Delete File?", "deleteFile"));
columnDefs.push(redoFunction("Share File?", "shareFile"));

const rowData = [
    { trustGroup: 'DO NOT TRUST'},
    { trustGroup: 'Top 10'},
    { trustGroup: 'Top 10000'},
    { trustGroup: 'Top 30000'}
];

export const trustGroup = () => {
  return <DataGrid columnDefs={columnDefs} rowData={rowData}/>;
};
