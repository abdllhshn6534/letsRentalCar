import fileDownload from "js-file-download";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { downloadUsers, getUsersByPage } from "../../../api/user-service";
import { downloadVehicles, getVehiclesByPage } from "../../../api/vehicle-service";
import { settings } from "../../../helpers/settings";

const columns = [
  {
    name: "Image",
    selector: (row) => <Link to={`/admin/vehicles/${row.id}`}><img src={`${settings.apiURL}/files/display/${row.image[0]}`} width="100" /></Link>,
    width: "150px"
  },
  {
    name: "Model",
    selector: (row) => row.model,
  },
  {
    name: "Age",
    selector: (row) => row.age,
  },
  {
    name: "Price/hour",
    selector: (row) => `$${row.pricePerHour}`,
  },
 
];

const AdminVehicles = () => {
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const navigate = useNavigate();

  const loadData = async (page) => {
    try {
      const resp = await getVehiclesByPage(page, perPage);
      const { content, totalElements } = resp.data;
      setVehicles(content);
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
      const resp = await getVehiclesByPage(page - 1, newPerPage);
      const { content } = resp.data;
      setVehicles(content);
      setPerPage(newPerPage);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClicked = (row) => {
    navigate(`/admin/vehicles/${row.id}`);
  };

  const handleDownload = async() => { 
    setDownloading(true);

    try {
        const resp = await downloadVehicles();
        fileDownload(resp.data, `vehicles.xlsx`);
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
      <Button variant="primary" as={Link} to="/admin/vehicles/new">
        New Vehicle
      </Button>
      <Button variant="secondary" onClick={handleDownload} disabled={downloading}>
        {downloading && <Spinner animation="border" size="sm"/>} Download Vehicles
      </Button>
      <DataTable
        title="Vehicles"
        columns={columns}
        data={vehicles}
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

export default AdminVehicles;
