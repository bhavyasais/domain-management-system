import React from "react";
import faker from "faker";

const clickedCheckbox = (params) => {};

const checkboxRenderer = (params) => {
  return (
    <div>
      <input type="checkbox" onClick={() => clickedCheckbox(params)} />
    </div>
  );
};

const headerRenderer = (params) => {
  const name = params.displayName;
  return (
    <div>
      <input type="checkbox" onClick={() => clickedCheckbox(params)} />
      <label>{name}</label>
    </div>
  );
};

const redoFunction = (headerName, headerField) => {
  return {
    headerName: headerName,
    field: headerField,
    cellRendererFramework: (params) => {
      return checkboxRenderer(params);
    },
    headerComponentFramework: (params) => {
      return headerRenderer(params);
    },
    cellStyle: { textAlign: "center" },
  };
};

const columnDefs = [
  { headerName: "S no", valueGetter: "node.rowIndex + 1" },
  {
    headerName: "A Trust Group",
    field: "trustGroup",
    sortable: true,
    filter: true,
  },
];

columnDefs.push(redoFunction("Edit File?", "editFile"));
columnDefs.push(redoFunction("View File?", "viewFile"));
columnDefs.push(redoFunction("Delete File?", "deleteFile"));
columnDefs.push(redoFunction("Share File?", "shareFile"));

export const trustGroupcolumnDefs = columnDefs;

export const trustGrouprowData = [
  {
    trustGroup: "DO NOT TRUST",
    editFile: true,
    viewFile: false,
    deleteFile: false,
    shareFile: false,
  },
  {
    trustGroup: "Top 10",
    editFile: false,
    viewFile: false,
    deleteFile: true,
    shareFile: false,
  },
  {
    trustGroup: "Top 10000",
    editFile: false,
    viewFile: false,
    deleteFile: false,
    shareFile: false,
  },
  {
    trustGroup: "Top 30000",
    editFile: false,
    viewFile: false,
    deleteFile: false,
    shareFile: false,
  },
];

export const DomaincolumnDefs = [
  { headerName: "S no", valueGetter: "node.rowIndex + 1" },
  { headerName: "A Domain", field: "domain", sortable: true, filter: true },
  {
    headerName: "Trust Score",
    field: "trustScore",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Trust Group",
    field: "trustGroup",
    sortable: true,
    filter: true,
  },
];

export const DomainrowData = [
  {
    domain: faker.lorem.word(),
    email: "example@yahoo.com",
    trustScore: faker.random.number(),
    trustGroup: "Do not trust",
    id: 0,
  },
  {
    domain: faker.lorem.word(),
    email: "user123@gamil.com", //NOSONAR
    trustScore: faker.random.number(),
    trustGroup: "Top 100",
    id: 1,
  },
  {
    domain: faker.lorem.word(),
    email: "testEmail@Zemoso.com", //NOSONAR
    trustScore: faker.random.number(),
    trustGroup: "Do not trust",
    id: 2,
  },
  {
    domain: faker.lorem.word(),
    email: "testUser@Zemoso.com", //NOSONAR
    trustScore: faker.random.number(),
    trustGroup: "Top 1000",
    id: 3,
  },
  {
    domain: faker.lorem.word(),
    email: "testPerson@Zemoso.com", //NOSONAR
    trustScore: faker.random.number(),
    trustGroup: "Top 3000",
    id: 4,
  },
];
export const RelationshipData = [
  {
    domain: faker.lorem.word(),
    trustScore: faker.random.number(),
    relationship: "Partner",
  },
  {
    domain: faker.lorem.word(),
    trustScore: faker.random.number(),
    relationship: "Vendor",
  },
  {
    domain: faker.lorem.word(),
    trustScore: faker.random.number(),
    relationship: "Customer",
  },
  {
    domain: faker.lorem.word(),
    rustScore: faker.random.number(),
    relationship: "Partner",
  },
  {
    domain: faker.lorem.word(),
    trustScore: faker.random.number(),
    relationship: "Vendor",
  },
];
