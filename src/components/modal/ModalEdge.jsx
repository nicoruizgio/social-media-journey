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

    const accordionLabels = [
      "I wanted to communicate with someone particular",
      `I was not feeling comfortable on ${sourceLabel} anymore`,
      "It was more popular",
      `${sourceLabel} was lacking something`,
    ];

    const isAccordion = accordionLabels.includes(selectedOption);

    if (isAccordion) {
      const value = otherRef.current?.value?.trim() || innerSelectedOption;
      if (!value || value === selectedOption) {
        setAlertMessage("Select one of the suboptions");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 4000);
        return;
      }
      inner = value;
    } else if (selectedOption === "Other") {
      // Save the input value for the "Other" option
      const value = otherRef.current?.value?.trim();
      if (!value) {
        setAlertMessage("Please specify your reason");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 4000);
        return;
      }
      inner = value;
    }

    const newSelection = {
      selectedOption,
      innerSelectedOption: inner,
    };

    setSaveOption(newSelection);
    onSaveSelection(newSelection);
    onHideModal();
  };

  const onCancel = () => {
    setSelectedOption(saveOption.selectedOption);
    onHide();
  };

  return (
    <Modal show={show} onHide={onCancel} size="lg" centered variant="dark">
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
        <div style={{ width: "100%" }}>
          <Alert alertMessage={alertMessage} showAlert={showAlert} />
        </div>
        <Button className="save-btn" onClick={onSave} variant="dark">
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
  onSaveSelection = () => {},
}) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    initialSelection.selectedOption
  );
  const [innerSelectedOption, setInnerSelectedOption] = useState(
    initialSelection.innerSelectedOption
  );
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
      <Button
        className="edge-btn"
        size="sm"
        onClick={() => setModalShow(true)}
        variant="dark"
      >
        {(() => {

          if (
            saveOption.selectedOption === "Other" &&
            saveOption.innerSelectedOption &&
            saveOption.innerSelectedOption.trim() !== ""
          ) {
            const text = saveOption.innerSelectedOption.trim();
            return text.length > 30 ? text.slice(0, 30) + "…" : text;
          }


          if (
            saveOption.selectedOption === "I wanted to communicate with someone particular" &&
            saveOption.innerSelectedOption &&
            saveOption.innerSelectedOption !== "Other"
          ) {
            return `Communication with ${saveOption.innerSelectedOption}`;
          }

          // Default
          return saveOption.selectedOption;
        })()}
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
