import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
  type EdgeProps,
} from "@xyflow/react";

import "./DropdownEdge.css";
import ModalEdge from "../modal/ModalEdge";

export default function DropdownEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style = {},
  markerEnd,
}: EdgeProps) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Function to update edge data when selection is saved
  const updateEdgeData = (selectionData) => {
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === id) {
          return {
            ...edge,
            data: {
              ...edge.data,
              selectedOption: selectionData.selectedOption,
              innerSelectedOption: selectionData.innerSelectedOption,
              openModal: false, // Close modal after save
            },
          };
        }
        return edge;
      })
    );
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          className="button-edge__label nodrag nopan"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <ModalEdge
            sourceLabel={data?.sourceLabel}
            targetLabel={data?.targetLabel}
            autoOpen={data?.openModal}
            initialSelection={{
              selectedOption: data?.selectedOption || "+",
              innerSelectedOption: data?.innerSelectedOption || null,
            }}
            onSaveSelection={updateEdgeData}

          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}