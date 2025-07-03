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
              <strong>Double click </strong>on the workspace to add a{" "}
              <em>new node</em> or click on the "Add node" button in the
              toolbar.
            </li>
            <li>
              To connect nodes, drag from the <strong>source handle</strong>—the
              blue connection point at the bottom of the source node—and drop it
              onto the <strong>target handle</strong>—the white connection point
              at the top of the destination node.
            </li>
            <li>
              When you’re finished, click <strong>Save Data</strong>. You can
              save your response as many times as you like, so feel free to make
              edits and save again.
            </li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Help;
