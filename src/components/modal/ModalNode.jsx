import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import "./ModalNode.css";
import { Alert } from "../alert/Alert";

function ModalNode(props) {
  const [inputValue, setInputValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSave = () => {
    if (!inputValue) {
      setShowAlert(true);
      setAlertMessage("Please enter an app name");
      setTimeout(() => setShowAlert(false), 4000);
      return;
    }
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
        {showAlert && (
          <div
            style={{ width: "80%", alignContent: "center", margin: "0 auto" }}
          >
            <Alert alertMessage={alertMessage} />
          </div>
        )}
        <Button className="save-btn" onClick={handleSave} variant="dark">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalNode;
