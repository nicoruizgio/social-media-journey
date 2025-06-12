import React from "react";
import { Panel, useReactFlow } from "@xyflow/react";
import Help from "./components/Help";
import DownloadDataButton from "./components/DownloadDataButton";

import "./Header.css";

const Header = ({setAlertMessage, setShowAlert, participantId}) => {
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
          role="complementary"
          aria-label="Help"
        >
          <Help/>
        </div>
      </Panel>
      <Panel position="top-right" onDoubleClickCapture={stopPropagation}>
          <DownloadDataButton
            text="Download Data"
            setAlertMessage={setAlertMessage}
            setShowAlert={setShowAlert}
            participantId={participantId}
            onDoubleClickCapture={stopPropagation}
          />
        </Panel>
    </>
  );
};

export default Header;
