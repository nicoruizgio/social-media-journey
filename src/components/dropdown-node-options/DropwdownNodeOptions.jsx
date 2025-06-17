import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ModalNode from "../modal/ModalNode";
import "./DropdownNodeOptions.css";

function DropdownNodeOptions({ selectedApp, setSelectedApp }) {
  const [modalShow, setModalShow] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const apps = [{ type: "text", label: "Facebook" },
    { type: "text", label: "FB Messenger" },
    { type: "text", label: "ICQ" },
    { type: "text", label: "Instagram" },
    { type: "text", label: "LinkedIn" },
    { type: "text", label: "Live" },
    { type: "text", label: "MSN" },
    { type: "text", label: "MySpace" },
    { type: "text", label: "Pinterest" },
    { type: "text", label: "Reddit" },
    { type: "text", label: "Snapchat" },
    { type: "text", label: "Telegram" },
    { type: "text", label: "TikTok" },
    { type: "text", label: "Whatsapp" },
    { type: "text", label: "X / Twitter" },
    { type: "text", label: "Youtube" },
    { type: "input", label: "Other" },
  ];

  return (
    <>
      <DropdownButton
        id="dropdown-basic-button"
        title={selectedApp}
        bsPrefix="dropdown-btn"
      >
        {apps.map((app, index) => (
          <Dropdown.Item
            className={activeItem === index ? "active-item" : "node-options"}
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
