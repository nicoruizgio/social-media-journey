import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect } from "react";
import ListOptions from "../list-options/ListOptions";


function MyModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Why did you choose to move from Facebook to Instagram?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListOptions />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalEdge({autoOpen = false}) {
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(()=>{
    if (autoOpen) {
      setModalShow(true);
    }
  }, [autoOpen]);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add reason
      </Button>

      <MyModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default ModalEdge;
