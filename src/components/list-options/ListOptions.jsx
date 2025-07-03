import React, { useState, useEffect, useRef } from "react";
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
  const [mainOtherValue, setMainOtherValue] = useState("");
  const [accordionOtherValues, setAccordionOtherValues] = useState({});

  useEffect(() => {
    if (innerSelectedOption) {
      setHasInnerSelection(true);
    }
  }, [innerSelectedOption]);

  const groupedOptions = [
    {
      group: "Interest & Content",
      options: [
        { type: "list", label: "I enjoyed the content" },
        { type: "list", label: `lost interest in ${sourceLabel}` },
        {
          type: "accordion",
          label: `${sourceLabel} was lacking something`,
          body: {
            title: "What was the platform lacking?",
            options: [
              { type: "text", label: "Users" },
              { type: "text", label: "Content" },
              { type: "text", label: "Policies" },
              { type: "input", label: "Other" },
            ],
          },
        },
      ],
    },
    {
      group: "Security & Accessibility",
      options: [
        {
          type: "list",
          label: `The platform seemed more secure than ${sourceLabel}`,
        },
        { type: "list", label: `The service of ${sourceLabel} was terminated` },
        { type: "list", label: `${sourceLabel} was blocked by my government` },
        {
          type: "accordion",
          label: `I was not feeling comfortable on ${sourceLabel} anymore`,
          body: {
            title: "What made you feel uncomfortable?",
            options: [
              { type: "text", label: "Too much information" },
              { type: "text", label: "Community" },
              { type: "text", label: "Content" },
              { type: "text", label: "Leadership" },
              { type: "text", label: "Privacy" },
              { type: "input", label: "Other" },
            ],
          },
        },
      ],
    },
    {
      group: "Social Reasons",
      options: [
        {
          type: "accordion",
          label: "I wanted to communicate with someone particular",
          body: {
            title: "Who did you want to communicate with?",
            options: [
              { type: "text", label: "Friends" },
              { type: "text", label: "Family" },
              { type: "text", label: "Colleagues" },
              { type: "text", label: "International contacts" },
              { type: "text", label: "Communities" },
              { type: "input", label: "Other" },
            ],
          },
        },
        {
          type: "accordion",
          label: "It was more popular",
          body: {
            title: "Among what group of people was it more popular?",
            options: [
              { type: "text", label: "General Public" },
              { type: "text", label: "Friends" },
              { type: "text", label: "Family" },
              { type: "text", label: "Colleagues" },
              { type: "text", label: "Privacy" },
              { type: "input", label: "Other" },
            ],
          },
        },
      ],
    },
    {
      group: "Other",
      options: [
        {
          type: "list",
          label: "Other",
          isOther: true,
        },
      ],
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
      {groupedOptions.map((groupObj, groupIdx) => (
        <React.Fragment key={groupIdx}>
          {groupObj.group && (
            <ListGroup.Item as="div" className="option-group-header">
              {groupObj.group}
            </ListGroup.Item>
          )}
          {groupObj.options.map((opt, i) => {
            if (opt.type === "list") {
              if (opt.isOther) {
                return (
                  <ListGroup.Item
                    key={i}
                    className="d-flex align-items-center"
                    action
                    onClick={() => {
                      setSelectedOption(opt.label);
                      setOpenAccordion(null);
                      if (otherRef.current) otherRef.current.focus();
                    }}
                  >
                    <Form.Check
                      type="checkbox"
                      checked={selectedOption === opt.label}
                      readOnly
                      className="me-2"
                      tabIndex={-1}
                    />
                    <Form.Control
                      type="text"
                      placeholder="Other"
                      ref={otherRef}
                      value={selectedOption === opt.label ? mainOtherValue : ""}
                      onChange={(e) => {
                        setMainOtherValue(e.target.value);
                        setHasInnerSelection(!!e.target.value);
                        if (e.target.value && selectedOption !== opt.label) {
                          setSelectedOption(opt.label);
                        }
                      }}
                      style={{ width: "100%" }}
                    />
                  </ListGroup.Item>
                );
              }
              return (
                <ListGroup.Item
                  key={i}
                  className="d-flex align-items-center"
                  action
                  onClick={() => {
                    setSelectedOption(opt.label);
                    setOpenAccordion(null);
                    if (otherRef.current) otherRef.current.value = "";
                  }}
                >
                  <Form.Check
                    type="checkbox"
                    checked={selectedOption === opt.label}
                    readOnly
                    className="me-2"
                    tabIndex={-1}
                  />
                  {opt.label}
                </ListGroup.Item>
              );
            }

            const isOpen = openAccordion === opt.label;
            return (
              <div key={i}>
                <ListGroup.Item
                  className="d-flex align-items-center accordion-header-item"
                  action
                  active={selectedOption === opt.label || isOpen}
                  onClick={() => {
                    setSelectedOption(opt.label);
                    setOpenAccordion(isOpen ? null : opt.label);
                    if (!isOpen && otherRef.current)
                      otherRef.current.value = "";
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
                  <Form.Check
                    type="checkbox"
                    checked={selectedOption === opt.label}
                    readOnly
                    className="me-2"
                    tabIndex={-1}
                  />
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
                              className="d-flex align-items-center"
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
                              <Form.Check
                                type="checkbox"
                                checked={innerSelectedOption === innerOpt.label}
                                readOnly
                                className="me-2"
                                tabIndex={-1}
                              />
                              {innerOpt.label}
                            </ListGroup.Item>
                          );
                        }

                        // For "Other" input
                        const localOtherRef = useRef(null);
                        const isOtherSelected =
                          typeof innerSelectedOption === "string" &&
                          !opt.body.options.some(
                            (o) => o.label === innerSelectedOption
                          ) &&
                          (accordionOtherValues[opt.label] || "") !== "";

                        return (
                          <ListGroup.Item
                            key={j}
                            className="d-flex align-items-center"
                            action
                            active={isOtherSelected}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (localOtherRef.current)
                                localOtherRef.current.focus();
                              setInnerSelectedOption(
                                accordionOtherValues[opt.label] || ""
                              );
                              setHasInnerSelection(true);
                            }}
                          >
                            <Form.Check
                              type="checkbox"
                              checked={isOtherSelected}
                              readOnly
                              className="me-2"
                              tabIndex={-1}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!isOtherSelected) {
                                  setInnerSelectedOption(
                                    accordionOtherValues[opt.label] || ""
                                  );
                                  setHasInnerSelection(true);
                                  if (localOtherRef.current)
                                    localOtherRef.current.focus();
                                } else {
                                  setInnerSelectedOption("");
                                  setHasInnerSelection(false);
                                }
                              }}
                            />
                            <Form.Control
                              type="text"
                              placeholder="Other"
                              ref={localOtherRef}
                              value={accordionOtherValues[opt.label] || ""}
                              onFocus={() => {
                                setInnerSelectedOption(
                                  accordionOtherValues[opt.label] || ""
                                );
                                setHasInnerSelection(true);
                              }}
                              onChange={(e) => {
                                setAccordionOtherValues((prev) => ({
                                  ...prev,
                                  [opt.label]: e.target.value,
                                }));
                                setInnerSelectedOption(e.target.value);
                                setHasInnerSelection(!!e.target.value);
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
        </React.Fragment>
      ))}
    </ListGroup>
  );
}

export default ListOptions;
