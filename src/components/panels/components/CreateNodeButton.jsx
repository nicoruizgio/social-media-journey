import React from "react";
import { Button } from "react-bootstrap";
import { useReactFlow } from "@xyflow/react";
import { MdOutlineLibraryAdd } from "react-icons/md";


const CreateNodeButton = ({ onCreateNode }) => {
  const { screenToFlowPosition, getNodes } = useReactFlow();

  const handleCreateNode = () => {
    // Get the center of the viewport
    const { width, height } = document.querySelector('.react-flow').getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;

    // Convert screen position to flow position
    let position = screenToFlowPosition({ x: centerX, y: centerY });

    // Check for existing nodes at this position
    const nodes = getNodes();
    let offsetX = 0;
    let offsetY = 0;

    // Check if there's already a node at the same position (with small tolerance)
    const positionTaken = (pos) => {
      const tolerance = 10; // tolerance in pixels
      return nodes.some(
        node =>
          Math.abs(node.position.x - pos.x) < tolerance &&
          Math.abs(node.position.y - pos.y) < tolerance
      );
    };

    // If the position is taken, keep offsetting until we find a free spot
    while (positionTaken({ x: position.x + offsetX, y: position.y + offsetY })) {
      offsetX += 20;
      offsetY += 20;
    }

    // Apply the offset to the position
    position = {
      x: position.x + offsetX,
      y: position.y + offsetY
    };

    // Call parent handler with the adjusted position
    onCreateNode(position);
  };

  return (
    <Button
      onClick={handleCreateNode}
      title="add node"
      variant="dark"

    >
      <b>+</b> Node
    </Button>
  );
};

export default CreateNodeButton;