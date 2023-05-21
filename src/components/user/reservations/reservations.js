import React, { useEffect, useState } from "react";
import { Container, Pagination, Row, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getReservations } from "../../../api/reservation-service";
import { formatDateTime } from "../../../helpers/functions/date-time";

const Reservations = () => {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [paging, setPaging] = useState({});
  const navigate = useNavigate();


  const loadData = async (page) => {
    try {
      const resp = await getReservations(page);
      const { content,totalPages, pageable } = resp.data;
      setReservations(content);
      setPaging({ totalPages, pageNumber: pageable.pageNumber });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Vehicle</th>
            <th>Pickup</th>
            <th>Dropoff</th>
          </tr>
        </thead>
        <tbody>
          {loading && <tr><td colSpan={4} className="text-center"><Spinner animation="border" size="sm"/></td></tr>}
          {reservations.map((item, index) => (
            <tr key={item.id} onClick={()=> navigate(`/user/reservations/${item.id}`)} style={{ cursor: "pointer" }}>
              <td>{index + 1}</td>
              <td>{item.car.model}</td>
              <td>
                {item.pickUpLocation} - {formatDateTime(item.pickUpTime)}
              </td>
              <td>
                {item.dropOffLocation} - {formatDateTime(item.dropOffTime)}
              </td>
            </tr>
          ))}

        </tbody>
      </Table>

      {paging.totalPages > 1 && (
        <Row className="mt-5">
          <Pagination className="justify-content-center">
            <Pagination.First
              onClick={() => loadData(0)}
              disabled={paging.pageNumber <= 0}
            />
            <Pagination.Prev
              onClick={() => loadData(paging.pageNumber - 1)}
              disabled={paging.pageNumber <= 0}
            />

            {[...Array(paging.totalPages)].map((item, index) => (
              <Pagination.Item
                active={index === paging.pageNumber}
                key={index}
                onClick={() => index !== paging.pageNumber && loadData(index)}
              >
                {index + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() => loadData(paging.pageNumber + 1)}
              disabled={paging.pageNumber >= paging.totalPages - 1}
            />
            <Pagination.Last
              onClick={() => loadData(paging.totalPages - 1)}
              disabled={paging.pageNumber >= paging.totalPages - 1}
            />
          </Pagination>
        </Row>
      )}
    </Container>
  );
};

export default Reservations;
