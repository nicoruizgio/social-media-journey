import { Connection, Edge, Node } from "@xyflow/react";

export let globalConnectionState = null;

export const CONNECTION_COMPLETED_EVENT = "connection-completed";

export type ValidationResult = {
  valid: boolean;
  message?: string;
};

export type ConnectionParams = {
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
};

export const validateConnection = (sourceNode: Node, targetNode: Node): ValidationResult => {
  const invalid = (node: Node) =>
    !node?.data?.label || node.data.label === "Select App";

  if (invalid(sourceNode) || invalid(targetNode)) {
    return {
      valid: false,
      message: "Please select an app for both nodes before connecting"
    };
  }

  if (sourceNode.data.label === targetNode.data.label) {
    return {
      valid: false,
      message: "You cannot connect nodes with the same app"
    };
  }

  return { valid: true };
};

export const createConnectionParams = (
  fromId: string,
  fromType: string,
  toId: string,
  toType: string
): ConnectionParams | null => {
  if (fromType === "source" && toType === "target") {
    return {
      source: fromId,
      target: toId,
      sourceHandle: "b",
      targetHandle: "a",
    };
  } else if (fromType === "target" && toType === "source") {
    return {
      source: toId,
      target: fromId,
      sourceHandle: "b",
      targetHandle: "a",
    };
  }
  return null;
};

export const cleanupConnection = () => {
  globalConnectionState = null;
  document.dispatchEvent(new CustomEvent(CONNECTION_COMPLETED_EVENT));
};

export const handleKeyboardConnection = (event, nodeId, handleType, setPendingConnection, createConnectionCallback) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();

  if (!globalConnectionState) {
    globalConnectionState = { nodeId, handleType };
    setPendingConnection({ nodeId, handleType });
  } else {
    const { nodeId: fromId, handleType: fromType } = globalConnectionState;

    if (fromId !== nodeId && fromType !== handleType) {
      const params = createConnectionParams(fromId, fromType, nodeId, handleType);

      if (params) {
        createConnectionCallback(params);
      }
    }

    globalConnectionState = null;
    setPendingConnection(null);
  }
};