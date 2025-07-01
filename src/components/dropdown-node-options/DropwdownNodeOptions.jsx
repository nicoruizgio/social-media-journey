import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ModalNode from "../modal/ModalNode";
import "./DropdownNodeOptions.css";

export const iconsSource = "/icons/";

export const apps = [
  { type: "text", label: "Facebook", icon: `${iconsSource}facebook.png` },
  { type: "text", label: "FB Messenger", icon: `${iconsSource}messenger.png` },
  { type: "text", label: "ICQ", icon: `${iconsSource}icq.png` },
  { type: "text", label: "Instagram", icon: `${iconsSource}instagram.png` },
  { type: "text", label: "LinkedIn", icon: `${iconsSource}linkedin.png` },
  { type: "text", label: "Live", icon: `${iconsSource}live.png` },
  { type: "text", label: "MSN", icon: `${iconsSource}msn.png` },
  { type: "text", label: "MySpace", icon: `${iconsSource}myspace.png` },
  { type: "text", label: "Pinterest", icon: `${iconsSource}pinterest.png` },
  { type: "text", label: "Reddit", icon: `${iconsSource}reddit.png` },
  { type: "text", label: "Snapchat", icon: `${iconsSource}snapchat.png` },
  { type: "text", label: "Telegram", icon: `${iconsSource}telegram.png` },
  { type: "text", label: "TikTok", icon: `${iconsSource}tiktok.png` },
  { type: "text", label: "Whatsapp", icon: `${iconsSource}whatsapp.png` },
  { type: "text", label: "X / Twitter", icon: `${iconsSource}x.png` },
  { type: "text", label: "Youtube", icon: `${iconsSource}youtube.png` },
  { type: "input", label: "Other"},
];

function DropdownNodeOptions({ selectedApp, setSelectedApp }) {
  const [modalShow, setModalShow] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const selectedAppObj = apps.find(app => app.label === selectedApp);

  return (
    <>
      <DropdownButton
        id="dropdown-basic-button"
        title={
          <span>
            {selectedAppObj && selectedAppObj.icon && (
              <img
                src={selectedAppObj.icon}
                alt={selectedAppObj.label}
                style={{ width: 22, height: 22, objectFit: "contain", marginRight: 10, verticalAlign: "middle" }}
              />
            )}
            {selectedApp}
          </span>
        }
        bsPrefix="dropdown-btn"
      >
        <div
          onWheel={e => e.stopPropagation()}
          style={{ maxHeight: 250, overflowY: "auto" }}
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
              {app.icon && (
                <img
                  src={app.icon}
                  alt={app.label}
                />
              )}
              {app.label}
            </Dropdown.Item>
          ))}
        </div>
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
