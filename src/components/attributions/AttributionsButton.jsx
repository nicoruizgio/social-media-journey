import React from "react";
import { Panel } from "@xyflow/react";
import "./AttributionsButton.css";

const AttributionsButton = () => {
  const handleClick = () => {
    window.open("/attributions", "_blank", "noopener,noreferrer");
  };

  return (
    <Panel position="bottom-right" className="attributions-panel">
      <button
        className="attributions-button"
        onClick={handleClick}
        aria-label="View icon attributions"
        type="button"
      >
        Attributions
      </button>
    </Panel>
  );
};

export default AttributionsButton;
