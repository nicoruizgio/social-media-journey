import React from "react";
import { Panel } from "@xyflow/react";
import "./AttributionsButton.css";

const AttributionsButton = () => {
  const handleClick = () => {
    window.open("/attributions", "_blank", "noopener,noreferrer");
  };

  return (
    <Panel position="bottom-right" className="attributions-panel">
      <div className="attributions-button" onClick={handleClick}>
        Attributions
      </div>
    </Panel>
  );
};

export default AttributionsButton;
