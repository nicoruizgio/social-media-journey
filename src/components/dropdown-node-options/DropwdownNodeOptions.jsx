import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ModalNode from "../modal/ModalNode";
import "./DropdownNodeOptions.css";

function DropdownNodeOptions({selectedApp, setSelectedApp}) {

  const [modalShow, setModalShow] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const apps = [
    { type: "text", label: "Instagram" },
    { type: "text", label: "Facebook" },
    { type: "text", label: "LinkedIn" },
    { type: "text", label: "Twitter" },
    { type: "input", label: "Other" },
  ];

  return (
    <>
      <DropdownButton id="dropdown-basic-button" title={selectedApp} bsPrefix="dropdown-btn">
        {apps.map((app, index) => (
          <Dropdown.Item
          className={activeItem === index ? "active-item" : ""}
            key={index}
            onClick={() => {
              app.type === "text"
                ? setSelectedApp(app.label)
                : setModalShow(true);
            }}
          >
            {app.label}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <ModalNode
        show={modalShow}
        onHide={() => setModalShow(false)}
        setSelectedApp={setSelectedApp}
      />
    </>
  );
}

export default DropdownNodeOptions;
