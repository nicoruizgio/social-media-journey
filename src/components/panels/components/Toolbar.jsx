import { useReactFlow } from '@xyflow/react'
import { findNodePosition } from '../../../utils/findNodePosition'
import  {Button}  from 'react-bootstrap'
import {ButtonGroup} from 'react-bootstrap'
import { IoAddCircleOutline } from "react-icons/io5";
import { FiZoomIn } from "react-icons/fi";
import { FiZoomOut } from "react-icons/fi";
import { MdOutlineZoomInMap } from "react-icons/md";


const Toolbar = ({onCreateNode}) => {
  const { setViewPort, zoomIn, zoomOut, screenToFlowPosition, getNodes } = useReactFlow()

  const handleCreateNode = () => {
    const position = findNodePosition(screenToFlowPosition, getNodes);
    onCreateNode(position);
  };

  const buttons = [
    {
      label: <IoAddCircleOutline />,
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
      onClick: () => setViewPort({ x: 0, y: 0, zoom: 1 }),
      ariaLabel: 'Fit view',
      title: 'Fit view'
    }
  ]
  return (
    <div className="too">
      <ButtonGroup className="toolbar-btn-group" vertical>
      {buttons.map((button, index) => (
        <Button
          className="toolbar-btn"
          variant="secondary"
          key={index}
          onClick={button.onClick}
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