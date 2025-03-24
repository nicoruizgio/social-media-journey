import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ModalNode from "../modal/ModalNode";

function DropdownNodeOptions({selectedApp, setSelectedApp}) {

  const [modalShow, setModalShow] = useState(false);

  const apps = [
    { type: "text", label: "Instagram" },
    { type: "text", label: "Facebook" },
    { type: "text", label: "LinkedIn" },
    { type: "input", label: "Other" },
  ];

  return (
    <>
      <DropdownButton id="dropdown-basic-button" title={selectedApp}>
        {apps.map((app, index) => (
          <Dropdown.Item
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
