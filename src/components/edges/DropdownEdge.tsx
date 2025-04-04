import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
  useEdges,
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
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
