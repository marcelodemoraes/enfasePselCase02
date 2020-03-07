import React from "react";

import "./QuestionItem.css";

const QuestionItem = props => (
  <li key={props.questionId} className="question__list-item">
    <div>
      <h1>{props.description}</h1>
      <p>{props.options[0]}</p>
      <p>{props.options[1]}</p>
      <p>{props.options[2]}</p>
      <p>{props.options[3]}</p>
    </div>
    <div>
      <button>Edit</button>
      <button
        onClick={() => {
          props.deleteQuestion(props.questionId);
        }}
      >
        Delete
      </button>
    </div>
  </li>
);

export default QuestionItem;
