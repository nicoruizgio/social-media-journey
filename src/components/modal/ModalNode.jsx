import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import "./ModalNode.css";

function ModalNode(props) {
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    props.setSelectedApp(inputValue);
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter app name
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          id="input"
          placeholder="Other"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalNode;
