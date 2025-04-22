import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import ListOptions from "../list-options/ListOptions";
import "./ModalEdge.css";

function MyModal({
  sourceLabel,
  targetLabel,
  selectedOption,
  setSelectedOption,
  innerSelectedOption,
  setInnerSelectedOption,
  ...props
}) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Why did you choose to move from <b>{sourceLabel}</b> to{" "}
          <b>{targetLabel}</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListOptions
          sourceLabel={sourceLabel}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          innerSelectedOption={innerSelectedOption}
          setInnerSelectedOption={setInnerSelectedOption}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalEdge({ autoOpen = false, sourceLabel, targetLabel }) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("+");
  const [innerSelectedOption, setInnerSelectedOption] = useState(null);

  useEffect(() => {
    if (autoOpen) {
      setModalShow(true);
    }
  }, [autoOpen]);

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setModalShow(true)}

      >
        {innerSelectedOption
          ? `${selectedOption}: ${innerSelectedOption}`
          : selectedOption}
      </Button>

      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        sourceLabel={sourceLabel}
        targetLabel={targetLabel}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        innerSelectedOption={innerSelectedOption}
        setInnerSelectedOption={setInnerSelectedOption}
      />
    </>
  );
}

export default ModalEdge;
