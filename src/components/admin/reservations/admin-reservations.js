import fileDownload from "js-file-download";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { downloadReservations, getReservationsByPage } from "../../../api/reservation-service";
import { downloadUsers, getUsersByPage } from "../../../api/user-service";

const columns = [
  {
    name: "Vehicle",
    selector: (row) => row.car.model,
  },
  {
    name: "Pickup",
    selector: (row) => row.pickUpLocation,
  },
  {
    name: "Dropoff",
    selector: (row) => row.dropOffLocation,
  },
  {
    name: "Price",
    selector: (row) => row.totalPrice,
  },
];

const AdminReservations = () => {
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const navigate = useNavigate();

  const loadData = async (page) => {
    try {
      const resp = await getReservationsByPage(page, perPage);
      const { content, totalElements } = resp.data;
      setReservations(content);
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
      const resp = await getReservationsByPage(page - 1, newPerPage);
      const { content } = resp.data;
      setReservations(content);
      setPerPage(newPerPage);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClicked = (row) => {
    navigate(`/admin/reservations/${row.id}`);
  };

  const handleDownload = async() => { 
    setDownloading(true);

    try {
        const resp = await downloadReservations();
        fileDownload(resp.data, `reservations.xlsx`);
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
        {downloading && <Spinner animation="border" size="sm"/>} Download Reservations
      </Button>
      <DataTable
        title="Reservations"
        columns={columns}
        data={reservations}
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

export default AdminReservations;
