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
  // New state to track if we've made a selection in the accordion
  const [hasInnerSelection, setHasInnerSelection] = useState(false);

  // Update hasInnerSelection whenever innerSelectedOption changes
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

  // Modify this function to better handle accordion state
  const handleAccordionKeyDown = (e, optLabel) => {
    if (e.key === 'Tab') {
      // Don't stop propagation - let tab navigation work normally

      // Keep accordion open if we have an inner selection
      if (openAccordion === optLabel && hasInnerSelection) {
        // Keep the parent selected
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
              active={selectedOption === opt.label || isOpen}
              onClick={() => {
                setSelectedOption(opt.label);
                setOpenAccordion(isOpen ? null : opt.label);
                if (!isOpen && otherRef.current) otherRef.current.value = "";
              }}
              onBlur={(e) => {
                // Only reset if focus is moving completely outside the component
                // AND we don't have an inner selection
                if (!e.currentTarget.contains(e.relatedTarget) && !hasInnerSelection) {
                  // Don't close the accordion if we have a selection
                } else if (hasInnerSelection) {
                  // Keep the accordion open
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
                            setHasInnerSelection(true); // Mark that we have a selection
                          }}
                          onKeyDown={(e) => {
                            // Only activate on Enter or Space key
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              e.stopPropagation();
                              setInnerSelectedOption(innerOpt.label);
                              setHasInnerSelection(true); // Mark that we have a selection
                            }
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
                        action
                        active={innerSelectedOption === "Other"} // Add active state for "Other"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Other"
                          ref={otherRef}
                          onFocus={() => {
                            // Don't overwrite existing selection when tabbing to "Other"
                            // Only set if we don't already have a selection
                            if (!innerSelectedOption || innerSelectedOption === opt.label) {
                              setInnerSelectedOption("Other");
                              setHasInnerSelection(true);
                            }
                          }}
                          onChange={() => {
                            // Set inner selection to "Other" when user types
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
