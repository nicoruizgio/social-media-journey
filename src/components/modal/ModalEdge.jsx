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
  onSaveSelection,
}) {
  const otherRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const onHideModal = () => {
    setShowAlert(false);
    onHide();
  };

  const onSave = () => {
    let inner = null;
    const option = "I wanted to communicate with someone particular";

    if (selectedOption === option) {
      const value = otherRef.current?.value?.trim() || innerSelectedOption;
      if (value) {
        if (value === option) {
          setAlertMessage(
            "Please enter who did you want to communicate with"
          );
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 4000);
          return;
        }

        inner = value;
      } else {
        setAlertMessage("Please enter who did you want to communicate with");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 4000);
        return;
      }
    }

    const newSelection = {
      selectedOption,
      innerSelectedOption: inner,
    };

    // Update local state
    setSaveOption(newSelection);

    // Call the parent function to update the edge data
    onSaveSelection(newSelection);

    onHideModal();
  };

  const onCancel = () => {
    // reset to last-saved choice
    setSelectedOption(saveOption.selectedOption);
    onHide();
  };

  return (
    <Modal show={show} onHide={onCancel} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Why did you move from <b>{sourceLabel}</b> to <b>{targetLabel}</b>?
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
            <Alert alertMessage={alertMessage} />
          </div>
        )}
        <Button className="save-btn" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalEdge({
  autoOpen = false,
  sourceLabel,
  targetLabel,
  initialSelection = { selectedOption: "+", innerSelectedOption: null },
  onSaveSelection = () => {}
}) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialSelection.selectedOption);
  const [innerSelectedOption, setInnerSelectedOption] = useState(initialSelection.innerSelectedOption);
  const [saveOption, setSaveOption] = useState(initialSelection);

  useEffect(() => {
    if (autoOpen) setModalShow(true);
  }, [autoOpen]);

  useEffect(() => {
    if (modalShow) {
      setSelectedOption(saveOption.selectedOption);
      setInnerSelectedOption(saveOption.innerSelectedOption);
    }
  }, [modalShow, saveOption]);

  const handleSaveSelection = (newSelection) => {
    setSaveOption(newSelection);
    onSaveSelection(newSelection);
  };

  return (
    <>
      <Button className="edge-btn" size="sm" onClick={() => setModalShow(true)}>
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
        setSaveOption={handleSaveSelection}
        onSaveSelection={onSaveSelection}
      />
    </>
  );
}

export default ModalEdge;