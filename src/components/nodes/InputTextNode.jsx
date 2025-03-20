import { useCallback } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import "./InputTextNode.css";
import DropdownOptions from "../dropdown/Dropwdown";

function InputTextNode({ id, data, isConnectable }) {
  const { setNodes } = useReactFlow(); // Get setNodes function

  const onChange = useCallback(
    (evt) => {
      const newLabel = evt.target.value;

      // Update the node's label
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, label: newLabel } }
            : node
        )
      );
    },
    [id, setNodes]
  );

  return (
    <div className="input-text-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <DropdownOptions/>
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

export default InputTextNode;
