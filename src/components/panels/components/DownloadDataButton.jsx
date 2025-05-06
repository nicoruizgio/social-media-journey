import { Button } from "react-bootstrap";
import { useReactFlow } from "@xyflow/react";
import { downloadData } from "../../../utils/downloadData";


const DownloadDataButton = ({ text, setShowAlert, setAlertMessage }) => {
  const { getNodes, getEdges } = useReactFlow();

  const handleDownload = () => {
    const nodes = getNodes();
    const edges = getEdges();

    downloadData(nodes, edges, setAlertMessage, setShowAlert);
  };

  return (
    <Button variant="dark" onClick={handleDownload}>
      <h2 className="download-btn">{text}</h2>
    </Button>
  );
};

export default DownloadDataButton;
