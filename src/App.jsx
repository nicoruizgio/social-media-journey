import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Background,
  ReactFlow,
  Panel,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
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

let id = 1;
const getId = () => `${id++}`;
const nodeOrigin = [0.5, 0];

const App = () => {
  const reactFlowWrapper = useRef(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { screenToFlowPosition } = useReactFlow();
  const initialNodes = [
    {
      id: "0",
      type: "dropdownNode",
      position: { x: 0, y: 50 },
      data: {
        label: "",
        setShowAlert,
        setAlertMessage,
      },
    },
  ];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((n) => n.id === params.source);
      const targetNode = nodes.find((n) => n.id === params.target);

      const invalid = (node) =>
        !node?.data?.label || node.data.label === "Select App";

      if (invalid(sourceNode) || invalid(targetNode)) {
        setShowAlert(true);
        setAlertMessage(
          "Please select an app for both nodes before connecting"
        );
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
        return;
      } else if (sourceNode.data.label === targetNode.data.label) {
        setShowAlert(true);
        setAlertMessage("You cannot connect nodes with the same app");
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
        return;
      }

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "dropdownEdge",
            data: {
              openModal: true,
              sourceLabel: sourceNode.data.label,
              targetLabel: targetNode.data.label,
              selectedOption: "+",
              innerSelectedOption: null,
            },
          },
          eds
        )
      );
    },
    [nodes, setEdges]
  );

  const onDoubleClick = useCallback(
    (event) => {
      const { clientX, clientY } = event;
      const flowPos = screenToFlowPosition({ x: clientX, y: clientY });
      const newId = getId();

      const newNode = {
        id: newId,
        type: "dropdownNode",
        position: flowPos,
        data: {
          label: "",
          setShowAlert,
          setAlertMessage,
        },
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
        <CustomPanels
          showAlert={showAlert}
          alertMessage={alertMessage}
          setAlertMessage={setAlertMessage}
          setShowAlert={setShowAlert}
        />
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
