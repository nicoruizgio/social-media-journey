export function downloadData(nodes, edges, setShowAlert, setAlertMessage) {
  // Prepare nodes data
  const nodesData = nodes.map((node) => {
    const invalid = !node.data.label || node.data.label === "Select App";
    if (invalid) {
      setAlertMessage("Please select an app for all nodes before downloading");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
      return null; // Skip invalid nodes
    }
    return {
      id: node.id,
      label: node.data.label,
    };
  });

  // Filter out null values from invalid nodes
  const validNodesData = nodesData.filter((node) => node !== null);

  // If we have invalid nodes, stop the download process
  if (validNodesData.length < nodes.length) {
    return;
  }

  // Prepare edges data
  const edgesData = edges.map((edge) => {
    const connection = edge.data.innerSelectedOption
      ? `Communication with ${edge.data.innerSelectedOption}`
      : edge.data.selectedOption;

    const invalid = !connection || connection === "+";
    if (invalid) {
      setAlertMessage(
        "Please select a reason for migrating for all connections before downloading"
      );
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
      return null; // Skip invalid edges
    }

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
