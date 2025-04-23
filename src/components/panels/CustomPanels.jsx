import { Panel } from "@xyflow/react";
import "./CustomPanels.css";
import Accordion from "react-bootstrap/Accordion";
import { Alert } from "../alert/Alert";

function Instructions() {
  return (
    <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Instructions</Accordion.Header>
        <Accordion.Body>
          <li>
            <b>Double click </b>on the workspace to create a <b>new node</b>
          </li>
          <li>
            To <b>connect</b> a node to another, click and drag from the {" "}
             <b>source handle</b>
             {" "}(the dot below a node) to the <b>target handle </b> (the dot above a
            node).
          </li>
          <li>
            To <b>delete a connection</b>, click on the connection line and
            press the delete key
          </li>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default function CustomPanels({ showAlert, alertMessage }) {
  return (
    <>
      <Panel position="top-center">
        <div className="title-panel">
          <h2>My Social Media Journey</h2>
        </div>
      </Panel>
      <Panel>
        <div className="instructions-panel">
          <Instructions />
        </div>
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
