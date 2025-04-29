import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import "./ListOptions.css";

function ListOptions({
  sourceLabel,
  selectedOption,
  setSelectedOption,
  otherRef,
  innerSelectedOption,
  setInnerSelectedOption,
}) {
  const [openAccordion, setOpenAccordion] = useState(null);

  const options = [
    { type: "list",      label: "It was more popular" },
    {
      type: "accordion",
      label: "I wanted to communicate with someone particular",
      body: {
        title: "Who did you want to communicate with?",
        options: [
          { type: "text", label: "Friends"    },
          { type: "text", label: "Family"     },
          { type: "text", label: "Colleagues" },
          { type: "input", label: "Other"     },
        ],
      },
    },
    { type: "list",      label: "I liked a feature" },
    {
      type: "list",
      label: `I didn't like the content on ${sourceLabel}`,
    },
  ];

  return (
    <ListGroup>
      {options.map((opt, i) => {
        if (opt.type === "list") {
          return (
            <ListGroup.Item
              key={i}
              action
              active={selectedOption === opt.label}
              onClick={() => {
                setSelectedOption(opt.label);
                setOpenAccordion(null);
                // clear the uncontrolled input DOM node:
                if (otherRef.current) otherRef.current.value = "";
              }}
            >
              {opt.label}
            </ListGroup.Item>
          );
        }

        // accordion header
        const isOpen = openAccordion === opt.label;
        return (
          <div key={i}>
            <ListGroup.Item
              action
              active={ selectedOption === opt.label || isOpen }
              onClick={() => {
                setSelectedOption(opt.label);
                setOpenAccordion(isOpen ? null : opt.label);
                if (!isOpen && otherRef.current) otherRef.current.value = "";
              }}
            >
              {opt.label}
            </ListGroup.Item>

            <Collapse in={isOpen}>
              <div className="accordion-content p-3">
                <p className="accordion-title">{opt.body.title}</p>
                <ListGroup>
                  {opt.body.options.map((innerOpt, j) => {
                    if (innerOpt.type === "text") {
                      return (
                        <ListGroup.Item
                          key={j}
                          action
                          active={false}
                          onClick={(e) => {
                            e.stopPropagation();
                            setInnerSelectedOption(innerOpt.label);
                          }}
                        >
                          {innerOpt.label}
                        </ListGroup.Item>
                      );
                    }
                    // the “Other” uncontrolled input:
                    return (
                      <ListGroup.Item
                        key={j}
                        className="d-flex"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Other"
                          ref={otherRef}
                          onFocus={() => {
                            setInnerSelectedOption(opt.label);
                          }}
                        />
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </div>
            </Collapse>
          </div>
        );
      })}
    </ListGroup>
  );
}

export default ListOptions;
