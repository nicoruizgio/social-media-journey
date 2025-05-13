import React from 'react'
import { CAlert } from '@coreui/react'
import { Panel } from "@xyflow/react";
import '@coreui/coreui/dist/css/coreui.min.css';


export const Alert = ({alertMessage, showAlert}) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    showAlert && (
      <Panel position="bottom-center" onDoubleClickCapture={stopPropagation}>
        <div className="alert-panel" role="alert">
          <CAlert color="danger" visible={showAlert}>
            <strong>{alertMessage}</strong>
          </CAlert>
        </div>
      </Panel>
    )
  );
}