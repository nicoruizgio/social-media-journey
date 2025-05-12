export function downloadData(nodes, edges, setAlertMessage, setShowAlert) {
  // Check for invalid nodes first
  const invalidNode = nodes.find(node => !node.data.label || node.data.label === "Select App");
  if (invalidNode) {
    setAlertMessage("Please select an app for all nodes before downloading");
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
    return; // Stop here if any node is invalid
  }

  // Prepare nodes data (now we know all are valid)
  const validNodesData = nodes.map((node) => ({
    id: node.id,
    label: node.data.label,
  }));

  // Check for invalid edges
  const invalidEdge = edges.find(edge => {
    const connection = edge.data.innerSelectedOption
      ? `Communication with ${edge.data.innerSelectedOption}`
      : edge.data.selectedOption;
    return !connection || connection === "+";
  });

  if (invalidEdge) {
    setAlertMessage("Please select a reason for migrating for all connections before downloading");
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
    return; // Stop here if any edge is invalid
  }

  // Prepare edges data (now we know all are valid)
  const edgesData = edges.map((edge) => {
    const connection = edge.data.innerSelectedOption
      ? `Communication with ${edge.data.innerSelectedOption}`
      : edge.data.selectedOption;
    return {
      id: `${edge.source}-${edge.target}`,
      sourceId: edge.source,
      targetId: edge.target,
      sourceLabel: edge.data.sourceLabel,
      targetLabel: edge.data.targetLabel,
      connection: connection,
    };
  });

  // Create CSV content for nodes
  let nodesCSV = "id,label\n";
  validNodesData.forEach((node) => {
    nodesCSV += `${node.id},"${node.label}"\n`;
  });

  // Create CSV content for edges
  let edgesCSV = "id,sourceId,targetId,sourceLabel,targetLabel,connection\n";
  edgesData.forEach((edge) => {
    edgesCSV += `${edge.id},${edge.sourceId},${edge.targetId},"${
      edge.sourceLabel || ""
    }","${edge.targetLabel || ""}","${edge.connection || ""}"\n`;
  });

  // Create combined CSV with markers to separate the sections
  const combinedCSV = "NODES\n" + nodesCSV + "\nEDGES\n" + edgesCSV;

  // Create and trigger download
  const blob = new Blob([combinedCSV], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "social_media_journey.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}