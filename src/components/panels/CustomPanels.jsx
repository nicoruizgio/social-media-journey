import { Panel, useReactFlow } from "@xyflow/react";
import "./CustomPanels.css";
import { Alert } from "../alert/Alert";
import DownloadDataButton from "./components/DownloadDataButton";
import Instructions from "./components/Instructions";
import Toolbar from "./components/Toolbar";

export default function CustomPanels({
  showAlert,
  alertMessage,
  setShowAlert,
  setAlertMessage,
  onCreateNode,
}) {
  const stopPropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <>
      <Panel position="top-center" onDoubleClickCapture={stopPropagation}>
        <div className="title-panel" onDoubleClickCapture={stopPropagation}>
          <h1>My Social Media Journey</h1>
        </div>
      </Panel>
      <Panel onDoubleClickCapture={stopPropagation}>
        <div className="instructions-panel" onDoubleClickCapture={stopPropagation}>
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
      <Panel position="bottom-left" onDoubleClickCapture={stopPropagation}>
        <Toolbar onCreateNode={onCreateNode} />
      </Panel>
      {showAlert && (
        <Panel position="bottom-center" onDoubleClickCapture={stopPropagation}>
          <div className="alert-panel">
            <Alert alertMessage={alertMessage} />
          </div>
        </Panel>
      )}
    </>
  );
}
