import React from "react";
import { Controls, ControlButton } from "@xyflow/react";

export const CustomControls = () => {
  return (
    <Controls
      position="top-left"
      orientation="vertical"
      showFitView={false}
      showInteractive={false}
      showZoom={false}
    >
      <ControlButton>Add new node</ControlButton>
    </Controls>
  );
};
