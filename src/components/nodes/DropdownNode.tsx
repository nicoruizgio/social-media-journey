import { useState, useEffect } from "react";
import { Handle, Position, useReactFlow, NodeProps, addEdge } from "@xyflow/react";
import "./DropdownNode.css";
import DropdownNodeOptions from "../dropdown-node-options/DropwdownNodeOptions";

// Global connection state (outside component for persistence across all nodes)
let globalConnectionState = null;

// Custom event name
const CONNECTION_COMPLETED_EVENT = 'connection-completed';

function DropdownNode({ id, data, isConnectable }: NodeProps) {
  const { setShowAlert, setAlertMessage } = data;
  const reactFlowInstance = useReactFlow();
  const { getEdges, getNodes, setNodes, setEdges } = reactFlowInstance;
  const [selectedApp, _setSelectedApp] = useState(data.label || "Select App");
  const [pendingConnection, setPendingConnection] = useState(null);

  // Listen for connection completed events
  useEffect(() => {
    const handleConnectionCompleted = () => {
      // Reset connection state when any connection is completed
      setPendingConnection(null);

      // Force a reset by clearing connecting-handle class
      const handles = document.querySelectorAll('.react-flow__handle');
      handles.forEach(handle => {
        if (handle.classList.contains('connecting-handle')) {
          handle.classList.remove('connecting-handle');
          handle.style.display = 'none';
          void handle.offsetHeight; // Triggers a reflow
          handle.style.display = '';
        }
      });
    };

    document.addEventListener(CONNECTION_COMPLETED_EVENT, handleConnectionCompleted);
    return () => document.removeEventListener(CONNECTION_COMPLETED_EVENT, handleConnectionCompleted);
  }, []);

  // Handle keyboard interactions for creating connections
  function onHandleKeyDown(event, nodeId, handleType) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();

    // Toggle connection state
    if (!globalConnectionState) {
      globalConnectionState = { nodeId, handleType };
      setPendingConnection({ nodeId, handleType });
    } else {
      const { nodeId: fromId, handleType: fromType } = globalConnectionState;

      // Valid: different nodes and different handle types
      if (fromId !== nodeId && fromType !== handleType) {
        const params = fromType === 'source' && handleType === 'target'
          ? { source: fromId, target: nodeId, sourceHandle: 'b', targetHandle: 'a' }
          : fromType === 'target' && handleType === 'source'
            ? { source: nodeId, target: fromId, sourceHandle: 'b', targetHandle: 'a' }
            : null;

        if (params) {
          createConnection(params);
        }
      }

      globalConnectionState = null;
      setPendingConnection(null);
    }
  }

  // Create a new connection
  const createConnection = (params) => {
    const sourceNode = getNodes().find((n) => n.id === params.source);
    const targetNode = getNodes().find((n) => n.id === params.target);

    // Validation logic
    const invalid = (node) => !node?.data?.label || node.data.label === "Select App";
    if (invalid(sourceNode) || invalid(targetNode)) {
      showAlert("Please select an app for both nodes before connecting");
      return false;
    }
    if (sourceNode.data.label === targetNode.data.label) {
      showAlert("You cannot connect nodes with the same app");
      return false;
    }

    // Create the edge
    setEdges(eds => addEdge({
      ...params,
      type: "dropdownEdge",
      data: {
        openModal: true,
        sourceLabel: sourceNode.data.label,
        targetLabel: targetNode.data.label,
        selectedOption: "+",
        innerSelectedOption: null,
      },
    }, eds));

    // Reset connection states
    globalConnectionState = null;
    setPendingConnection(null);

    // Notify all nodes
    document.dispatchEvent(new CustomEvent(CONNECTION_COMPLETED_EVENT));
    return true;
  };

  // Helper functions and state management
  const showAlert = (message) => {
    setShowAlert(true);
    setAlertMessage(message);
    setTimeout(() => setShowAlert(false), 4000);
  };

  const setSelectedApp = (newApp) => {
    const connected = getEdges().filter(e => e.source === id || e.target === id);
    const conflict = connected.some(edge => {
      const otherLabel = edge.source === id ? edge.data.targetLabel : edge.data.sourceLabel;
      return otherLabel === newApp;
    });

    if (conflict) {
      showAlert("You cannot connect nodes with the same app");
      return;
    }
    _setSelectedApp(newApp);
  };

  useEffect(() => {
    setNodes(nds => nds.map(n =>
      n.id === id ? { ...n, data: { ...n.data, label: selectedApp } } : n
    ));
    setEdges(eds => eds.map(e => {
      if (e.source === id) return { ...e, data: { ...e.data, sourceLabel: selectedApp } };
      if (e.target === id) return { ...e, data: { ...e.data, targetLabel: selectedApp } };
      return e;
    }));
  }, [selectedApp, id, setNodes, setEdges]);

  const isPendingSource = pendingConnection?.nodeId === id && pendingConnection?.handleType === 'source';
  const isPendingTarget = pendingConnection?.nodeId === id && pendingConnection?.handleType === 'target';

  return (
    <div className="input-text-node">
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
        tabIndex={0}
        onKeyDown={(e) => onHandleKeyDown(e, id, 'source')}
        className={isPendingSource ? 'connecting-handle' : ''}
      />

      <div>
        <DropdownNodeOptions
          selectedApp={selectedApp}
          setSelectedApp={setSelectedApp}
        />
      </div>

      <Handle
        type="target"
        position={Position.Top}
        id="a"
        isConnectable={isConnectable}
        tabIndex={0}
        onKeyDown={(e) => onHandleKeyDown(e, id, 'target')}
        className={isPendingTarget ? 'connecting-handle' : ''}
      />
    </div>
  );
}

export default DropdownNode;