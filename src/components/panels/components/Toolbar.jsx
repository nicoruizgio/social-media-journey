import { useReactFlow } from '@xyflow/react'
import { findNodePosition } from '../../../utils/findNodePosition'
import  {Button}  from 'react-bootstrap'
import {ButtonGroup} from 'react-bootstrap'
import { MdAddCircle } from "react-icons/md";
import { FiZoomIn } from "react-icons/fi";
import { FiZoomOut } from "react-icons/fi";
import { MdOutlineZoomInMap } from "react-icons/md";
import { useCallback } from 'react';


const Toolbar = ({onCreateNode}) => {
  const { fitView, zoomIn, zoomOut, screenToFlowPosition, getNodes } = useReactFlow()

  const handleFitView = useCallback(() => {
    fitView({ duration: 800 });
  }, [fitView]);

  const handleCreateNode = () => {
    const position = findNodePosition(screenToFlowPosition, getNodes);
    onCreateNode(position);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const buttons = [
    {
      label: <MdAddCircle />,
      onClick: handleCreateNode,
      ariaLabel: 'Create node',
      title: 'Create node'
    },
    {
      label: <FiZoomIn />,
      onClick: zoomIn,
      ariaLabel: 'Zoom in',
      title: 'Zoom in'
    },
    {
      label: <FiZoomOut />,
      onClick: zoomOut,
      ariaLabel: 'Zoom out',
      title: 'Zoom out'
    },
    {
      label: <MdOutlineZoomInMap />,
      onClick: handleFitView,
      ariaLabel: 'Fit view',
      title: 'Fit view'
    }
  ]
  return (
    <div className="toolbar" onDoubleClickCapture={stopPropagation}>
      <ButtonGroup className="toolbar-btn-group" vertical onDoubleClickCapture={stopPropagation}>
      {buttons.map((button, index) => (
        <Button
          className="toolbar-btn"
          variant="secondary"
          key={index}
          onClick={button.onClick}
          onDoubleClickCapture={stopPropagation}
          aria-label={button.ariaLabel}
          title={button.title}
        >
          {button.label}
        </Button>
      ))}
      </ButtonGroup>
    </div>
  )
}

export default Toolbar