import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { getMessagesByPage } from "../../../api/contact-service";

const columns = [
  {
    name: "Subject",
    selector: (row) => row.subject,
    sortable: true,
  },
  {
    name: "Visitor",
    selector: (row) => row.name,
    sortable: true,
  },
];

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const navigate = useNavigate();


  const loadData = async (page) => {
    try {
      const resp = await getMessagesByPage(page, perPage);
      const { content, totalElements } = resp.data;
      setMessages(content);
      setTotalRows(totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    try {
        const resp = await getMessagesByPage(page-1, newPerPage);
        const { content  } = resp.data;
        setMessages(content);
        setPerPage(newPerPage);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
  };

  const handlePageChange = (page) => {
    loadData(page - 1);
  };

  const handleRowClicked = (row) => { 
    navigate(`/admin/contact-messages/${row.id}`);
   }

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <div>
      <DataTable
        title="Contact Messages"
        columns={columns}
        data={messages}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        onRowClicked={handleRowClicked}
      />
      
    </div>
  );
};

export default ContactMessages;
