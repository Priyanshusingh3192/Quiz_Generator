import React from 'react';

function QuestionComponent({ question, selected, onSelect }) {
  return (
    <div>
      <h3>{question.text}</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {question.options.map((opt, idx) => (
          <li key={idx} style={{ margin: '8px 0' }}>
            <label style={{ cursor: 'pointer' }}>
              <input
                type="radio"
                name="option"
                checked={selected === idx}
                onChange={() => onSelect(idx)}
                style={{ marginRight: 8 }}
              />
              {opt}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionComponent;
