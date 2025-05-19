import Accordion from "react-bootstrap/Accordion";

import "./Help.css";

const Help = () => {
  return (
    <Accordion flush className="instructions-accordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {" "}
          <span className="instructions-title">Help</span>{" "}
        </Accordion.Header>
        <Accordion.Body>
          <ul>
            <li>
              <strong>Double click </strong>on the workspace to add a <em>new node</em> or click on the "Add node" button in the toolbar.
            </li>
            <li>
              To connect one node to another, start by dragging from the{" "}
              <strong>source handle</strong> — the small circular connector{" "}
              <em>below the node</em> — and drop it onto the{" "}
              <strong>target handle</strong>, which is the circular connector{" "}
              <em>above the destination node</em>.
            </li>
            <li>
              To <b>delete a connection</b>, click on the connection line and
              press the delete key
            </li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Help;
