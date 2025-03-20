import React, { useCallback, useRef } from "react";
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Controls,
} from "@xyflow/react";
import { hanldeInvalidConnection } from "./utils/handleConnections";
import { CustomControls } from "./components/controls/CustomControls";
import InputTextNode from "./components/nodes/InputTextNode";

import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "0",
    type: "inputTextNode",
    position: { x: 0, y: 50 },
    data: { label: "" },
  },
];

const nodeTypes = { inputTextNode: InputTextNode };

const App = () => {
  const reactFlowWrapper = useRef(null);
  const nodeOrigin = [0.5, 0];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();

  // Adds new edge (connection between nodes) where params is the connection details and eds the existing edges. Returns a new edges array.
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Evaluates when a connection attempt does not connect to an existing node and creates a new one instead and connects it to the starting node.
  const onConnectEnd = useCallback(
    (event, connectionState) => {
      hanldeInvalidConnection(
        event,
        connectionState,
        setNodes,
        setEdges,
        screenToFlowPosition,
        nodeOrigin
      );
    },
    [screenToFlowPosition]
  );

  console.log(nodes);

  return (
    <div
      className="wrapper"
      ref={reactFlowWrapper}
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    >
      <ReactFlow
        style={{ backgroundColor: "#F7F9FB" }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={nodeOrigin}
      >
        <Background />
      </ReactFlow>
      <Controls />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);
