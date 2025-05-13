import React, { useState, useEffect } from "react";
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
  const [hasInnerSelection, setHasInnerSelection] = useState(false);

  useEffect(() => {
    if (innerSelectedOption) {
      setHasInnerSelection(true);
    }
  }, [innerSelectedOption]);

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
    {
      type: "list",
      label: `I didn't like the content on ${sourceLabel}`,
    },
  ];

  const handleAccordionKeyDown = (e, optLabel) => {
    if (e.key === "Tab") {
      if (openAccordion === optLabel && hasInnerSelection) {
        setSelectedOption(optLabel);
      }
    }
  };

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

                if (otherRef.current) otherRef.current.value = "";
              }}
            >
              {opt.label}
            </ListGroup.Item>
          );
        }

        const isOpen = openAccordion === opt.label;
        return (
          <div key={i}>
            <ListGroup.Item
              action
              active={selectedOption === opt.label || isOpen}
              onClick={() => {
                setSelectedOption(opt.label);
                setOpenAccordion(isOpen ? null : opt.label);
                if (!isOpen && otherRef.current) otherRef.current.value = "";
              }}
              onBlur={(e) => {
                if (
                  !e.currentTarget.contains(e.relatedTarget) &&
                  !hasInnerSelection
                ) {
                } else if (hasInnerSelection) {
                  setOpenAccordion(opt.label);
                }
              }}
              onKeyDown={(e) => handleAccordionKeyDown(e, opt.label)}
              tabIndex={0}
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
                          active={innerSelectedOption === innerOpt.label}
                          onClick={(e) => {
                            e.stopPropagation();
                            setInnerSelectedOption(innerOpt.label);
                            setHasInnerSelection(true);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              e.stopPropagation();
                              setInnerSelectedOption(innerOpt.label);
                              setHasInnerSelection(true);
                            }
                          }}
                        >
                          {innerOpt.label}
                        </ListGroup.Item>
                      );
                    }

                    return (
                      <ListGroup.Item
                        key={j}
                        className="d-flex"
                        action
                        active={innerSelectedOption === "Other"}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Other"
                          ref={otherRef}
                          onFocus={() => {
                            if (
                              !innerSelectedOption ||
                              innerSelectedOption === opt.label
                            ) {
                              setInnerSelectedOption("Other");
                              setHasInnerSelection(true);
                            }
                          }}
                          onChange={() => {
                            setInnerSelectedOption("Other");
                            setHasInnerSelection(true);
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
