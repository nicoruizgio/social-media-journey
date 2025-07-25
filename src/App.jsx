import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
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
import Header from "./components/header/Header.jsx";
import { Alert } from "./components/alert/Alert.jsx";
import Toolbar from "./components/toolbar/Toolbar.jsx";
import { ConnectionProvider } from './context/ConnectionContext';
import AttributionsButton from "./components/attributions/AttributionsButton.jsx";
import AttributionsPage from "./components/attributions/AttributionsPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import DropdownNode from "./components/nodes/DropdownNode.tsx";
import DropdownEdge from "./components/edges/DropdownEdge.tsx";

const nodeTypes = { dropdownNode: DropdownNode };
const edgeTypes = { dropdownEdge: DropdownEdge };

const proOptions = { hideAttribution: true };

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

function MainApp() {
  const reactFlowWrapper = useRef(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("danger"); // NEW
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


  const participantId = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (!id) {
      id = crypto.randomUUID();
    }
    return id;
  }, []);


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

  const handleCreateNode = useCallback(
    (position) => {
      const newId = getId();
      const newNode = {
        id: newId,
        type: "dropdownNode",
        position,
        data: {
          label: "",
          setShowAlert,
          setAlertMessage,
        },
        origin: nodeOrigin,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, setShowAlert, setAlertMessage]
  );

  const onDoubleClick = useCallback(
    (event) => {
      const isPanelClick = event.target.closest(
        ".title-panel, .instructions-panel, .toolbar, .toolbar-btn-group, .toolbar-btn, .alert-panel"
      );

      if (isPanelClick) {
        return;
      }

      const { clientX, clientY } = event;
      const flowPos = screenToFlowPosition({ x: clientX, y: clientY });
      handleCreateNode(flowPos);
    },
    [screenToFlowPosition, handleCreateNode]
  );

  return (
    <div className="app-container">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header >
        <Header
          setAlertMessage={setAlertMessage}
          setShowAlert={setShowAlert}
          setAlertType={setAlertType}
          participantId={participantId}
        />
      </header>

      <div
        id="main-content"
        role="main"
        className="wrapper"
        ref={reactFlowWrapper}
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
          proOptions={proOptions}
        >
          <Toolbar onCreateNode={handleCreateNode} />
          <AttributionsButton />
          <Alert alertMessage={alertMessage} showAlert={showAlert} alertType={alertType} />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}

export default () => (
  <ConnectionProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/attributions" element={<AttributionsPage />} />
        <Route path="*" element={
          <ReactFlowProvider>
            <MainApp />
          </ReactFlowProvider>
        } />
      </Routes>
    </BrowserRouter>
  </ConnectionProvider>
);