import { Button } from "react-bootstrap";
import { useReactFlow } from "@xyflow/react";
import { downloadData } from "../../../utils/downloadData";
import { MdOutlineFileDownload } from "react-icons/md";

const DownloadDataButton = ({ text, setShowAlert, setAlertMessage }) => {
  const { getNodes, getEdges } = useReactFlow();

  const handleDownload = () => {
    const nodes = getNodes();
    const edges = getEdges();

    downloadData(nodes, edges, setAlertMessage, setShowAlert);
  };

  return (
    <Button variant="dark" onClick={handleDownload} className="download-btn" aria-label="Download data">
      <div className="download-btn-content">
        <MdOutlineFileDownload  className="download-icon" aria-hidden="true"/>
        <h2 className="download-btn-text">{text}</h2>
      </div>
    </Button>
  );
};

export default DownloadDataButton;
