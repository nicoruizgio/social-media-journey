import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function DropdownOptions() {
  const [selectedApp, setSelectedApp] = useState("Select App");

  const apps = ["Instagram", "Facebook", "LinkedIn"];

  return (
    <DropdownButton id="dropdown-basic-button" title={selectedApp}>
      {apps.map((app) => (
        <Dropdown.Item key={app} onClick={() => setSelectedApp(app)}>
          {app}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default DropdownOptions;
