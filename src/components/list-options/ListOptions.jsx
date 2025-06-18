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
    { type: "list", label: "I enjoyed the content" },
    { type: "list", label: "I lost interest in ${sourceLabel}" },
    { type: "list", label: "The platform seemed more secure than ${sourceLabel}" },
    { type: "list", label: "The service of ${sourceLabel} was terminated"},
    { type: "list", label: "${sourceLabel} was blocked by my government" },
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
      label: `I was not feeling comfortable on ${sourceLabel} anymore`,
      body: {
        title: "What made you feel uncomfortable?",
        options: [
          { type: "text", label: "Too much information" },
          { type: "text", label: "Community" },
          { type: "text", label: "Content" },
          { type: "text", label: "Leadership" },
          { type: "text", label: "Privacy" },
          { type: "input", label: "Other" }
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
          { type: "input", label: "Other" }
        ],
      },
    },
    {
      type: "accordion",
      label: "I liked a certain feature",
      body: {
        title: "What kind of feature did you like?",
        options: [
          { type: "text", label: "Chat" },
          { type: "text", label: "Feeds" },
          { type: "text", label: "Recommendations" },
          { type: "text", label: "Groups" },
          { type: "text", label: "Posting" },
          { type: "input", label: "Other" }
        ],
      },
    },
    {
      type: "accordion",
      label: `${sourceLabel} was lacking something`,
      body: {
        title: "What was the platform lacking?",
        options: [
          { type: "text", label: "Users" },
          { type: "text", label: "Content" },
          { type: "text", label: "Policies" },
          { type: "input", label: "Other" }
        ],
      },
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
                          value={innerSelectedOption && innerSelectedOption !== opt.label ? innerSelectedOption : ""}
                          onFocus={() => {
                            if (
                              !innerSelectedOption ||
                              innerSelectedOption === opt.label
                            ) {
                              setInnerSelectedOption("");
                              setHasInnerSelection(false);
                            }
                          }}
                          onChange={e => {
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
    </ListGroup>
  );
}

export default ListOptions;
