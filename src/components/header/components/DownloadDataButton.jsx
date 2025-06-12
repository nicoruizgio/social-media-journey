import { Button } from "react-bootstrap";
import { useReactFlow } from "@xyflow/react";
import { saveJourneyToSupabase } from "../../../utils/saveToSupabase";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaSave } from "react-icons/fa";

const DownloadDataButton = ({ text, setShowAlert, setAlertMessage, setAlertType, participantId }) => {
  const { getNodes, getEdges } = useReactFlow();

  const handleSave = async () => {
    const nodes = getNodes();
    const edges = getEdges();

    // Validation (same as before)
    const invalidNode = nodes.find(
      (node) => !node.data.label || node.data.label === "Select App"
    );
    if (invalidNode) {
      setAlertMessage("Please select an app for all nodes before saving");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 4000);
      return;
    }

    const invalidEdge = edges.find((edge) => {
      const connection = edge.data.innerSelectedOption || edge.data.selectedOption;
      return !connection || connection === "+";
    });

    if (invalidEdge) {
      setAlertMessage(
        "Please select a reason for migrating for all connections before saving"
      );
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 4000);
      return;
    }

    // Save to Supabase
    const error = await saveJourneyToSupabase(participantId, nodes, edges);
    if (error) {
      setAlertType("danger");
      setAlertMessage("Error saving data: " + error.message);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 4000);
    } else {
      setAlertType("success");
      setAlertMessage("Data saved successfully!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 4000);
    }
  };

  return (
    <Button variant="dark" onClick={handleSave} className="download-btn" aria-label="Save data">
      <div className="download-btn-content">
        <FaSave className="download-icon" aria-hidden="true"/>
        <span className="download-btn-text">{text}</span>
      </div>
    </Button>
  );
};

export default DownloadDataButton;
