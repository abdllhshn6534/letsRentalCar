import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";

const PasswordInput = (props) => {
    const [type, setType] = useState("password");

    const handleType = () => { 
        const newType = type === "password" ? "text" : "password";
        setType(newType);
     }

  return (
    <InputGroup className="mb-3">
      <Form.Control type={type} {...props}/>
      <InputGroup.Text onClick={handleType}>
        {type === "password" ? <AiFillEye/> : <AiFillEyeInvisible/>}
      </InputGroup.Text>
      <Form.Control.Feedback type="invalid">
        {props.error}
      </Form.Control.Feedback>
    </InputGroup>
  );
};

export default PasswordInput;
