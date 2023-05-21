import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { deleteMessage, getMessage } from "../../../api/contact-service";
import { question, toast } from "../../../helpers/functions/swal";
import Loading from "../../common/loading/loading";

const ContactMessageEdit = () => {
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const { messageId } = useParams();
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const resp = await getMessage(messageId);
      setMessage(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeMessage = async() => {
    setDeleting(true);
    try {
      await deleteMessage(messageId);
      toast("Message was deleted", "success");
      navigate(-1);
    } catch (err) {
      console.log(err);
      toast(err.response.data.message, "error");
    }
    finally{
      setDeleting(false);
    }
  }

  const handleDelete = () => { 
    question("Are you sure to delete?", "You won't be able to undo it!").then( (result)=>{
        if(result.isConfirmed){
            removeMessage();
        }
    } )
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2>{message.subject}</h2>
          <p>{message.body}</p>
          <hr />
          <p>
            <em>{message.name} - {message.email}</em>
          </p>

          <div className="text-end">
            <ButtonGroup aria-label="Toolbox">
              <Button variant="secondary" onClick={() => navigate(-1)} >Cancel</Button>
              <Button variant="danger" onClick={handleDelete} disabled={deleting}>
                {deleting && <Spinner animation="border" size="sm"/>} Delete</Button>
            </ButtonGroup>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactMessageEdit;
