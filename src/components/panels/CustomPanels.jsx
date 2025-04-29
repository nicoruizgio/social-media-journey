import { Panel, useReactFlow} from "@xyflow/react";
import "./CustomPanels.css";
import Accordion from "react-bootstrap/Accordion";
import { Alert } from "../alert/Alert";
import { Button } from "react-bootstrap";

function Instructions() {
  return (
    <Accordion  flush>
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

function DownloadDataButton( {text}) {
  const { getNodes, getEdges } = useReactFlow();
  const handleDownload = () => {
    const nodes = getNodes();
    const edges = getEdges();

    const nodesData = nodes.map(node => ({
      id: node.id,
      label: node.data.label,

    }));
    const edgesData = edges.map(edge => ({
      id: edge.id,
      sourceId: edge.source,
      targetId: edge.target,
      sourceLabel: edge.data.sourceLabel,
      targetLabel: edge.data.targetLabel,
      reason: edge.data.selectedOption,
      reason2: edge.data.innerSelectedOption
    }));
    console.log("Nodes:", nodesData);
    console.log("Edges:", edgesData);
  };

  return (
    <Button variant="dark" onClick={handleDownload}>
      {text}
    </Button>
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
      <Panel position="top-right">
        <DownloadDataButton text="Download Data"/>
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
