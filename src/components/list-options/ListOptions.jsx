import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Collapse from "react-bootstrap/Collapse";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroupItem } from "react-bootstrap";
import "./ListOptions.css";
import Form from "react-bootstrap/Form";

function ListOptions({
  sourceLabel,
  selectedOption,
  setSelectedOption,
  innerSelectedOption,
  setInnerSelectedOption,
}) {
  const [openAccordion, setOpenAccordion] = useState(null);

  const options = [
    { type: "list", label: "It was more popular" },
    {
      type: "accordion",
      label: "I wanted to communicate with someone particular",
      body: {
        title: "Who did you want to communicate with?",
        options: [
          { type: "text", label: "Friends" },
          { type: "text", label: "Family" },
          { type: "text", label: "Colleagues" },
          { type: "input", label: "Other" },
        ],
      },
    },
    { type: "list", label: "I liked a feature" },
    { type: "list", label: `I didn't like the content on ${sourceLabel}` },
  ];

  return (
    <ListGroup>
      {options.map((option, index) => {
        if (option.type === "list") {
          return (
            <ListGroup.Item
              action
              key={index}
              active={selectedOption === option.label}
              onClick={() => {
                setSelectedOption(option.label);
                setOpenAccordion(null);
                setInnerSelectedOption(null);
              }}
            >
              {option.label}
            </ListGroup.Item>
          );
        } else if (option.type === "accordion") {
          const isOpen = openAccordion === option.label;
          return (
            <div key={index}>
              <ListGroup.Item
                action
                onClick={() => {
                  setSelectedOption(option.label);
                  setOpenAccordion(isOpen ? null : option.label);
                }}
                active={selectedOption === option.label}
              >
                {option.label}
              </ListGroup.Item>
              <Collapse in={isOpen}>
                <div id={`accordion-body-${index}`}>
                  <div className="accordion-content">
                    <p className="accordion-title">{option.body.title}</p>
                    <ListGroup>
                      {option.body.options.map((innerOption, innerIndex) => (
                        <ListGroupItem
                          action
                          key={innerIndex}
                          active={innerSelectedOption === innerOption.label}
                          onClick={(e) => {
                            e.stopPropagation();
                            setInnerSelectedOption(innerOption.label);
                          }}
                        >
                          {innerOption.type == "text" ? (
                            innerOption.label
                          ) : (
                            <Form.Control
                              type="text"
                              id="iput"
                              placeholder="Other"
                            />
                          )}
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Collapse>
            </div>
          );
        }
        return null;
      })}
    </ListGroup>
  );
}

export default ListOptions;
