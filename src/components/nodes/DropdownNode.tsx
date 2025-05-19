import { useState, useEffect } from "react";
import {
  Handle,
  Position,
  useReactFlow,
  NodeProps,
  addEdge,
} from "@xyflow/react";
import "./DropdownNode.css";
import DropdownNodeOptions from "../dropdown-node-options/DropwdownNodeOptions";
import { validateConnection, createConnectionParams } from "../../utils/connectionUtils";
import { showTemporaryAlert } from "../../utils/alertUtils";
import { useConnection } from "../../context/ConnectionContext";

function DropdownNode({ id, data, isConnectable }: NodeProps) {
  const { setShowAlert, setAlertMessage } = data;
  const { getEdges, getNodes, setNodes, setEdges } = useReactFlow();
  const [selectedApp, _setSelectedApp] = useState(data.label || "Select App");
  const { pendingConnection, startConnection, resetConnection } = useConnection();

  function handleKeyDown(event: React.KeyboardEvent, handleType: string) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();

    if (!pendingConnection) {
      // Start new connection
      startConnection(id, handleType);
    } else {
      // Try to complete connection
      const { nodeId: fromId, handleType: fromType } = pendingConnection;

      if (fromId !== id && fromType !== handleType) {
        const params = createConnectionParams(fromId, fromType, id, handleType);

        if (params) {
          const sourceNode = getNodes().find(n => n.id === params.source);
          const targetNode = getNodes().find(n => n.id === params.target);

          const validation = validateConnection(sourceNode!, targetNode!);

          if (!validation.valid) {
            showTemporaryAlert(validation.message!, setShowAlert, setAlertMessage);
          } else {
            createConnection(params);
          }
        }
      }

      resetConnection();
    }
  }

  const createConnection = (params: any) => {
    const sourceNode = getNodes().find((n) => n.id === params.source);

    setEdges((eds) =>
      addEdge(
        {
          ...params,
          type: "dropdownEdge",
          data: {
            openModal: true,
            sourceLabel: sourceNode!.data.label,
            targetLabel: getNodes().find(n => n.id === params.target)!.data.label,
            selectedOption: "+",
            innerSelectedOption: null,
          },
        },
        eds
      )
    );

    return true;
  };

  const setSelectedApp = (newApp: string) => {
    const connected = getEdges().filter(
      (e) => e.source === id || e.target === id
    );

    const conflict = connected.some((edge) => {
      const otherLabel =
        edge.source === id ? edge.data.targetLabel : edge.data.sourceLabel;
      return otherLabel === newApp;
    });

    if (conflict) {
      showTemporaryAlert("You cannot connect nodes with the same app", setShowAlert, setAlertMessage);
      return;
    }

    _setSelectedApp(newApp);
  };

  useEffect(() => {
    // Update nodes and edges when selected app changes
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, label: selectedApp } } : n
      )
    );

    setEdges((eds) =>
      eds.map((e) => {
        if (e.source === id)
          return { ...e, data: { ...e.data, sourceLabel: selectedApp } };
        if (e.target === id)
          return { ...e, data: { ...e.data, targetLabel: selectedApp } };
        return e;
      })
    );
  }, [selectedApp, id, setNodes, setEdges]);

  const isPendingSource = pendingConnection?.nodeId === id && pendingConnection?.handleType === "source";
  const isPendingTarget = pendingConnection?.nodeId === id && pendingConnection?.handleType === "target";

  return (
    <div className="input-text-node">
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, "source")}
        className={isPendingSource ? "connecting-handle" : ""}
        aria-label="source handle"
        title="source handle"
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
        onKeyDown={(e) => handleKeyDown(e, "target")}
        className={isPendingTarget ? "connecting-handle" : ""}
        aria-label="target handle"
        title="target handle"
      />
    </div>
  );
}

export default DropdownNode;
