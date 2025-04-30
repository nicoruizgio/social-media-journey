import { Button } from "react-bootstrap";
import { useReactFlow } from "@xyflow/react";
import { downloadData } from "../../../utils/downloadData";

const DownloadDataButton = ({ text, setShowAlert, setAlertMessage }) => {
  const { getNodes, getEdges } = useReactFlow();

  const handleDownload = () => {
    const nodes = getNodes();
    const edges = getEdges();

    downloadData(nodes, edges, setShowAlert, setAlertMessage);
  };

  return (
    <Button variant="dark" onClick={handleDownload}>
      {text}
    </Button>
  );
};

export default DownloadDataButton;