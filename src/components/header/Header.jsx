import React from "react";
import { Panel, useReactFlow } from "@xyflow/react";
import Instructions from "./components/Instructions";
import DownloadDataButton from "./components/DownloadDataButton";

import "./Header.css";

const Header = ({setAlertMessage, setShowAlert}) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <>
      <Panel position="top-center" onDoubleClickCapture={stopPropagation}>
        <div className="title-panel" onDoubleClickCapture={stopPropagation} role="banner">
          <h1>My Social Media Journey</h1>
        </div>
      </Panel>
      <Panel onDoubleClickCapture={stopPropagation}>
        <div
          className="instructions-panel"
          onDoubleClickCapture={stopPropagation}
        >
          <Instructions />
        </div>
      </Panel>
      <Panel position="top-right" onDoubleClickCapture={stopPropagation}>
          <DownloadDataButton
            text="Download Data"
            setAlertMessage={setAlertMessage}
            setShowAlert={setShowAlert}
            onDoubleClickCapture={stopPropagation}
          />
        </Panel>
    </>
  );
};

export default Header;
