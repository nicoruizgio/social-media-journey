import Accordion from "react-bootstrap/Accordion";

const Instructions = () => {
  return (
    <Accordion flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Instructions</Accordion.Header>
        <Accordion.Body>
          <li>
            <b>Double click </b>on the workspace to create a <b>new node</b>
          </li>
          <li>
            To <b>connect</b> a node to another, click and drag from the{" "}
            <b>source handle</b> (the dot below a node) to the{" "}
            <b>target handle </b> (the dot above a node).
          </li>
          <li>
            To <b>delete a connection</b>, click on the connection line and
            press the delete key
          </li>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Instructions;
