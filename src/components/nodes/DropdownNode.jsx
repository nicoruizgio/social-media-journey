import { useState, useEffect } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import "./DropdownNode.css";
import DropdownNodeOptions from "../dropdown-node-options/DropwdownNodeOptions";

function DropdownNode({ id, data, isConnectable }) {
  const { setNodes, setEdges } = useReactFlow(); // Get setNodes function that will update the nodes label
  const [selectedApp, setSelectedApp] = useState(data.label || "Select App"); // local state to control the node label change

  useEffect(() => {
    // update the node label
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                label: selectedApp,
              },
            }
          : node
      )
    );

    // update only the edges connected to this node
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.source === id) {
          return {
            ...edge,
            data: {
              ...edge.data,
              sourceLabel: selectedApp,
            },
          };
        }
        if (edge.target === id) {
          return {
            ...edge,
            data: {
              ...edge.data,
              targetLabel: selectedApp,
            },
          };
        }
        return edge;
      })
    );
  }, [selectedApp, id, setNodes, setEdges]);

  return (
    <div className="input-text-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
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
      />
    </div>
  );
}

export default DropdownNode;
