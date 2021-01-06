import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
//WIP 
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'fullname', headerName: 'Fullname', width: 130 },
  {
    field: 'role',
    headerName: 'Role',
    width: 160,
    valueFormatter: (params) => {
      params.value.toLowerCase().capitalize();
    },
  },
  {
    field: 'banned',
    headerName: 'Status',
    width: 100,
    valueFormatter: (params) => params.value === true ? "Banned" : "Active",
  },
];

const rows = [
  { id: 1, email: "123@gmail.com", fullname: "abc", role: "STUDENT", banned: true },
];

export default function DataTable() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    document.title = "Users"
  }, []);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}