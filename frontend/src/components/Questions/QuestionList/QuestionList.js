import React from "react";

import "./QuestionList.css";
import QuestionItem from "./QuestionItem/QuestionItem";

class QuestionList extends React.Component {
  render() {
    const questions = this.props.questions.map(question => {
      return (
        <QuestionItem
          key={question._id}
          deleteQuestion={this.props.deleteQuestion}
          questionId={question._id}
          description={question.description}
          options={question.options}
          right_answer={question.right_answer}
          avarage={question.avarage}
        />
      );
    });

    return <ul className="question__list">{questions}</ul>;
  }
}

export default QuestionList;
