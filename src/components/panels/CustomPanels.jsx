import { Panel } from "@xyflow/react";
import "./CustomPanels.css";
import { Alert } from "../alert/Alert";
import DownloadDataButton from "./components/DownloadDataButton";
import Instructions from "./components/Instructions";

export default function CustomPanels({ showAlert, alertMessage, setShowAlert, setAlertMessage }) {
  return (
    <>
      <Panel position="top-center">
        <div className="title-panel">
          <h1>My Social Media Journey</h1>
        </div>
      </Panel>
      <Panel>
        <div className="instructions-panel">
          <Instructions />
        </div>
      </Panel>
      <Panel position="top-right">
        <DownloadDataButton text="Download Data" setAlertMessage={setAlertMessage} setShowAlert={setShowAlert}/>
      </Panel>
      {showAlert && (
        <Panel position="bottom-center">
          <div className="alert-panel">
            <Alert alertMessage={alertMessage} />
          </div>
        </Panel>
      )}
    </>
  );
}
