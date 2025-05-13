export const findNodePosition = (screenToFlowPosition, getNodes) => {
  const { width, height } = document
    .querySelector(".react-flow")
    .getBoundingClientRect();
  const centerX = width / 2;
  const centerY = height / 2;

  let position = screenToFlowPosition({ x: centerX, y: centerY });

  const nodes = getNodes();
  let offsetX = 0;
  let offsetY = 0;

  const positionTaken = (pos) => {
    const tolerance = 10;
    return nodes.some(
      (node) =>
        Math.abs(node.position.x - pos.x) < tolerance &&
        Math.abs(node.position.y - pos.y) < tolerance
    );
  };

  while (positionTaken({ x: position.x + offsetX, y: position.y + offsetY })) {
    offsetX += 20;
    offsetY += 20;
  }

  return {
    x: position.x + offsetX,
    y: position.y + offsetY,
  };
};
