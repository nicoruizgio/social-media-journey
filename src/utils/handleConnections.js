

let id = 1;
const getId = () => `${id++}`;


export const hanldeInvalidConnection = (event, connectionState, setNodes, setEdges, screenToFlowPosition, nodeOrigin) => {
  // when a connection is dropped on the pane it's not valid
  if (!connectionState.isValid) {
    // we need to remove the wrapper bounds, in order to get the correct position
    const id = getId();
    const { clientX, clientY } =
      "changedTouches" in event ? event.changedTouches[0] : event;
    const newNode = {
      id,
      type: "inputTextNode",
      position: screenToFlowPosition({
        x: clientX,
        y: clientY,
      }),
      data: { label: '' },
      origin: nodeOrigin,
    };

    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) =>
      eds.concat({ id, source: connectionState.fromNode.id, target: id })
    );
  }
}