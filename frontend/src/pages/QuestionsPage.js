import React from "react";
import api from "../services/api";

import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import QuestionList from "../components/Questions/QuestionList/QuestionList";
import Spinner from "../components/Spinner/Spinner";

class QuestionsPage extends React.Component {
  state = {
    creatingQuestion: false,
    right_answer: "0",
    questions: [],
    isLoading: false
  };

  constructor(props) {
    super(props);
    this.descriptionRef = React.createRef();
    this.question1Ref = React.createRef();
    this.question2Ref = React.createRef();
    this.question3Ref = React.createRef();
    this.question4Ref = React.createRef();
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
      query {
        questions{
          _id
          description
          options
          right_answer
          avarage
        }
      }
    `
    };

    api
      .post("/graphql", requestBody)
      .then(res => {
        const { data } = res;
        this.setState({ questions: data.data.questions, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  deleteQuestion = id => {
    const requestBody = {
      query: `
        mutation DeleteQuestion($id: ID!){
          deleteQuestion(_id: $id)
        }
      `,
      variables: {
        id: id
      }
    };

    api
      .post("/graphql", requestBody)
      .then(res => {
        const { data } = res;
        const deletedId = data.data.deleteQuestion;
        const updatedQuestions = this.state.questions.filter(question => {
          return question._id !== deletedId;
        });
        this.setState({ questions: updatedQuestions });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // updateQuestion = id => {
  //   const requestBody = {
  //     query: `
  //     mutation{
  //       updateQuestion(_id: "5e61ace65fea686288f19d62", description:"oai", options:["a", "b", "c", "d"], right_answer: 0){
  //         _id
  //         description
  //         options
  //         right_answer
  //       }
  //     }
  //     `
  //   };
  //   api.post("/graphql", requestBody).then(res => {
  //     const { data } = res;

  //     const updatedQuestions = this.state.questions.filter(question => {
  //       return question._id !== id;
  //     });
  //     this.setState({ questions: updatedQuestions });
  //     console.log(data);
  //   });
  // };

  startCreateQuestionHandler = () => {
    this.setState({ creatingQuestion: true });
  };

  cancelQuestionCreationHandler = () => {
    this.setState({ creatingQuestion: false });
  };

  confirmQuestionCreationHandler = () => {
    this.setState({ creatingQuestion: false });
    const description = this.descriptionRef.current.value;
    const question1 = this.question1Ref.current.value;
    const question2 = this.question2Ref.current.value;
    const question3 = this.question3Ref.current.value;
    const question4 = this.question4Ref.current.value;
    const right_answer = +this.state.right_answer;

    const question = {
      description,
      options: [question1, question2, question3, question4],
      right_answer
    };

    const requestBody = {
      query: `mutation CreateQuestion($desc: String!, $opt: [String!]!, $right: Int!){
      createQuestion(description: $desc, options: $opt, right_answer: $right){
        _id
        avarage
        description
        options
        right_answer
      }
    }
    `,
      variables: {
        desc: question.description,
        opt: [
          question.options[0],
          question.options[1],
          question.options[2],
          question.options[3]
        ],
        right: question.right_answer
      }
    };

    api
      .post("/graphql", requestBody)
      .then(res => {
        const { data } = res;
        console.log(data.data.createQuestion);
        // console.log(this.state.questions);
        this.setState(prevState => ({
          questions: [...prevState.questions, data.data.createQuestion]
        }));
      })
      .catch(err => {
        console.log(err);
      });

    // this.fetchQuestions();
  };

  optionChangeHandler = event => {
    this.setState({
      right_answer: event.target.value
    });
  };

  render() {
    return (
      <>
        {this.state.creatingQuestion && <Backdrop />}
        {this.state.creatingQuestion && (
          <Modal
            title="Create Question"
            onCancel={this.cancelQuestionCreationHandler}
            onConfirm={this.confirmQuestionCreationHandler}
          >
            <form>
              <div className="form-control">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  id="description"
                  ref={this.descriptionRef}
                ></textarea>
              </div>

              <div className="form-control">
                <label htmlFor="q1">Option 1</label>
                <textarea
                  type="text"
                  id="q1"
                  ref={this.question1Ref}
                ></textarea>

                <input
                  type="radio"
                  name="right_answer"
                  value="0"
                  checked={this.state.right_answer === "0"}
                  onChange={this.optionChangeHandler}
                ></input>
              </div>

              <div className="form-control">
                <label htmlFor="q2">Option 2</label>
                <textarea
                  type="text"
                  id="q2"
                  ref={this.question2Ref}
                ></textarea>

                <input
                  type="radio"
                  name="right_answer"
                  value="1"
                  checked={this.state.right_answer === "1"}
                  onChange={this.optionChangeHandler}
                ></input>
              </div>

              <div className="form-control">
                <label htmlFor="q3">Option 3</label>
                <textarea
                  type="text"
                  id="q3"
                  ref={this.question3Ref}
                ></textarea>

                <input
                  type="radio"
                  name="right_answer"
                  value="2"
                  checked={this.state.right_answer === "2"}
                  onChange={this.optionChangeHandler}
                ></input>
              </div>

              <div className="form-control">
                <label htmlFor="q4">Option 4</label>
                <textarea
                  type="text"
                  id="q4"
                  ref={this.question4Ref}
                ></textarea>

                <input
                  type="radio"
                  name="right_answer"
                  value="3"
                  checked={this.state.right_answer === "3"}
                  onChange={this.optionChangeHandler}
                ></input>
              </div>
            </form>
          </Modal>
        )}
        <div className="questions-control">
          {this.state.isLoading && <Spinner />}
          <button className="btn" onClick={this.startCreateQuestionHandler}>
            Create Question
          </button>
          <QuestionList
            questions={this.state.questions}
            deleteQuestion={this.deleteQuestion}
          />
        </div>
      </>
    );
  }
}

export default QuestionsPage;
