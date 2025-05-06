import { useState, useEffect } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import "./DropdownNode.css";
import DropdownNodeOptions from "../dropdown-node-options/DropwdownNodeOptions";

function DropdownNode({ id, data, isConnectable }) {
  const { setShowAlert, setAlertMessage } = data;
  const { getEdges, setNodes, setEdges } = useReactFlow();
  const [selectedApp, _setSelectedApp] = useState(data.label || "Select App");

  const setSelectedApp = (newApp) => {
    const connected = getEdges().filter(
      (e) => e.source === id || e.target === id
    );

    const conflict = connected.some((edge) => {
      const otherLabel =
        edge.source === id ? edge.data.targetLabel : edge.data.sourceLabel;
      return otherLabel === newApp;
    });

    if (conflict) {
      setShowAlert(true);
      setAlertMessage("You cannot connect nodes with the same app");
      setTimeout(() => setShowAlert(false), 4000);
      return;
    }

    _setSelectedApp(newApp);
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, label: selectedApp } } : n
      )
    );

    setEdges((eds) =>
      eds.map((e) => {
        if (e.source === id) {
          return { ...e, data: { ...e.data, sourceLabel: selectedApp } };
        }
        if (e.target === id) {
          return { ...e, data: { ...e.data, targetLabel: selectedApp } };
        }
        return e;
      })
    );
  }, [selectedApp, id, setNodes, setEdges]);

  return (
    <div className="input-text-node" >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        tabIndex={0}
        role="button"
      />
      <div>
        <DropdownNodeOptions
          selectedApp={selectedApp}
          setSelectedApp={setSelectedApp}
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
        tabIndex={0}
        role="button"
      />
    </div>
  );
}

export default DropdownNode;
