import fileDownload from "js-file-download";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { downloadUsers, getUsersByPage } from "../../../api/user-service";

const columns = [
  {
    name: "First Name",
    selector: (row) => row.firstName,
  },
  {
    name: "Last Name",
    selector: (row) => row.lastName,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Roles",
    selector: (row) => row.roles.join("-"),
  },
];

const AdminUsers = () => {
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [users, setUsers] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const navigate = useNavigate();

  const loadData = async (page) => {
    try {
      const resp = await getUsersByPage(page, perPage);
      const { content, totalElements } = resp.data;
      setUsers(content);
      setTotalRows(totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (page) => {
    // Data table component i sayfa yapısında 1 tabanlı çalışırken, API 0 tabanlı çalışmaktadır.
    loadData(page - 1);
  };

  const handleChangeRowsPerPage = async (newPerPage, page) => {
    try {
      const resp = await getUsersByPage(page - 1, newPerPage);
      const { content } = resp.data;
      setUsers(content);
      setPerPage(newPerPage);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClicked = (row) => {
    navigate(`/admin/users/${row.id}`);
  };

  const handleDownload = async() => { 
    setDownloading(true);

    try {
        const resp = await downloadUsers();
        fileDownload(resp.data, `users.xlsx`);
    } catch (err) {
        console.log(err)
    }
    finally{
        setDownloading(false);
    }
    
  }

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <div>
      <Button variant="secondary" onClick={handleDownload} disabled={downloading}>
        {downloading && <Spinner animation="border" size="sm"/>} Download Users
      </Button>
      <DataTable
        title="Users"
        columns={columns}
        data={users}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onChangePage={handleChangePage}
        onRowClicked={handleRowClicked}
      />
    </div>
  );
};

export default AdminUsers;
