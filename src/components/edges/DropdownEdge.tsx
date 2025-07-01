import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
  type EdgeProps,
} from "@xyflow/react";
import { IoIosCloseCircle } from "react-icons/io";
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
}: EdgeProps & { data?: { openModal?: boolean; [key: string]: any } }) {
  const { setEdges, deleteElements } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // update edge data when selection is saved
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

  // handle edge deletion
  const handleDeleteEdge = () => {
    deleteElements({ edges: [{ id }] });
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
          <div className="edge-hover-area">
            <button
              className="edge-delete-btn"
              onClick={handleDeleteEdge}
              aria-label="Delete node"
              tabIndex={-1}
              type="button"
            >
              <IoIosCloseCircle />
            </button>
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
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
