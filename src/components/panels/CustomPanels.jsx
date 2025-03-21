import { Panel } from "@xyflow/react";
import "./CustomPanels.css";

import Accordion from 'react-bootstrap/Accordion';

function Instructions() {
  return (
    <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Instructions</Accordion.Header>
        <Accordion.Body>
            <li>Double click on the workspace to create a new node</li>
            <li>
              To connect a node to another, click and drag from the source
              handle (the dot below a node) to the target handle (the dot above
              a node).
            </li>

        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default function CustomPanels() {
  return (
    <>
      <Panel position="top-center">
        <div className="title-panel">
          <h2>My Social Media Journey</h2>
        </div>
      </Panel>
      <Panel>
        <div className="instructions-panel">
          <Instructions/>

        </div>
      </Panel>
    </>
  );
}
