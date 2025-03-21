import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Collapse from 'react-bootstrap/Collapse';
import 'bootstrap/dist/css/bootstrap.min.css';

import './ListOptions.css'

function OptionsList() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);

  const options = [
    { type: 'list', label: "It was more popular" },
    { type: 'accordion', label: "I wanted to communicate with someone particular", body: "Who did you wanted to communicate with?" },
    { type: 'list', label: "I liked a feature" },
    { type: 'list', label: "I didn't like the content on Facebook" },
  ];

  return (
    <ListGroup>
      {options.map((option, index) => {
        if (option.type === 'list') {
          return (
            <ListGroup.Item
              action
              key={index}
              active={selectedOption === option.label}
              onClick={() => setSelectedOption(option.label)}
            >
              {option.label}
            </ListGroup.Item>
          );
        } else if (option.type === 'accordion') {
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
                  {/* Extra wrapper with no margin or padding */}
                  <div className='accordion-content'>
                    {option.body}
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

export default OptionsList;
