import React, { useCallback, useEffect, useRef } from "react";
import {
  Background,
  ReactFlow,
  Panel,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  useEdges,
  ReactFlowProvider,
  addEdge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomPanels from "./components/panels/CustomPanels.jsx";

import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";

import DropdownNode from "./components/nodes/DropdownNode.jsx";
import DropdownEdge from "./components/edges/DropdownEdge.tsx";

const nodeTypes = { dropdownNode: DropdownNode };
const edgeTypes = { dropdownEdge: DropdownEdge };

const defaultEdgeOptions = {
  type: "dropdownEdge",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "#b1b1b7",
  },
};

const initialNodes = [
  {
    id: "0",
    type: "dropdownNode",
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
    (params) => {
      // Assume you have access to your nodes array to find the labels
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "dropdownEdge",
            data: {
              openModal: true,
              sourceLabel: sourceNode?.data?.label,
              targetLabel: targetNode?.data?.label,
            },
          },
          eds
        )
      );
    },
    [nodes, setEdges]
  );

  useEffect(() => {
    console.log("Updated edges:", edges);
  }, [edges]);

  const onDoubleClick = useCallback(
    (event) => {
      // Use the screenToFlowPosition function to convert the click coordinates.
      const { clientX, clientY } = event;
      const flowPos = screenToFlowPosition({ x: clientX, y: clientY });
      const newId = getId();

      const newNode = {
        id: newId,
        type: "dropdownNode", // Change node type if needed
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
        onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={nodeOrigin}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Background />
        <CustomPanels />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);
