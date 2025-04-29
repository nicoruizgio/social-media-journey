import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState, useRef } from "react";
import ListOptions from "../list-options/ListOptions";
import "./ModalEdge.css";
import { Alert } from "../alert/Alert";

function MyModal({
  show,
  onHide,
  sourceLabel,
  targetLabel,
  selectedOption,
  setSelectedOption,
  saveOption,
  setSaveOption,
  innerSelectedOption,
  setInnerSelectedOption,
}) {
  const otherRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);

  const onHideModal = () => {
    setShowAlert(false);
    onHide();
  };

  const onSave = () => {
    let inner = null;

    if (selectedOption === "I wanted to communicate with someone particular") {
      const value = otherRef.current?.value?.trim() || innerSelectedOption;
      console.log("value", value);
      console.log("selectedOption", selectedOption);
      if (value) {
        inner = value;
      } else {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 4000);
        return;
      }
    }

    setSaveOption({
      selectedOption,
      innerSelectedOption: inner,
    });

    onHideModal();
  };

  const onCancel = () => {
    // reset to last‐saved choice
    setSelectedOption(saveOption.selectedOption);
    onHide();
  };

  return (
    <Modal show={show} onHide={onCancel} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Why move from <b>{sourceLabel}</b> to <b>{targetLabel}</b>?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListOptions
          sourceLabel={sourceLabel}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          otherRef={otherRef}
          innerSelectedOption={innerSelectedOption}
          setInnerSelectedOption={setInnerSelectedOption}
        />
      </Modal.Body>
      <Modal.Footer>
        {showAlert && (
          <div style={{ width: "100%" }}>
            <Alert
              alertMessage={
                "Please select who did you want to communicate with"
              }
            />
          </div>
        )}
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalEdge({ autoOpen = false, sourceLabel, targetLabel }) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("+");
  const [innerSelectedOption, setInnerSelectedOption] = useState(null);
  const [saveOption, setSaveOption] = useState({
    selectedOption: "+",
    innerSelectedOption: null,
  });

  useEffect(() => {
    if (autoOpen) setModalShow(true);
  }, [autoOpen]);

  useEffect(() => {
    if (modalShow) {
      setSelectedOption(saveOption.selectedOption);
      setInnerSelectedOption(saveOption.innerSelectedOption);
    }
  }, [modalShow, saveOption]);

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setModalShow(true)}>
        {saveOption.innerSelectedOption !== null
          ? `Communication with ${saveOption.innerSelectedOption}`
          : saveOption.selectedOption}
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
        saveOption={saveOption}
        setSaveOption={setSaveOption}
      />
    </>
  );
}
export default ModalEdge;
