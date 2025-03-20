import React, { useCallback, useRef } from "react";
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  addEdge
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import InputTextNode from "./components/nodes/InputTextNode";

const nodeTypes = { inputTextNode: InputTextNode };
const initialNodes = [
  {
    id: "0",
    type: "inputTextNode",
    data: { label: "" },
    position: { x: 0, y: 50 },
  },
];

let id = 1;
const getId = () => `${id++}`;
const nodeOrigin = [0.5, 0];

const App = () => {
  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDoubleClick = useCallback(
    (event) => {
      // Use the screenToFlowPosition function to convert the click coordinates.
      const { clientX, clientY } = event;
      const flowPos = screenToFlowPosition({ x: clientX, y: clientY });
      const newId = getId();

      const newNode = {
        id: newId,
        type: "inputTextNode", // Change node type if needed
        position: flowPos,
        data: { label: "" },
        origin: nodeOrigin,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  return (
    <div
      className="wrapper"
      ref={reactFlowWrapper}
      style={{ width: "100vw", height: "100vh" }}
      onDoubleClickCapture={onDoubleClick}
    >
      <ReactFlow
        style={{ backgroundColor: "#F7F9FB" }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        //onPaneClick={onPaneClick}
        onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={nodeOrigin}
        nodeTypes={nodeTypes}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);
