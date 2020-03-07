const Question = require("../../models/Question");

module.exports = {
  questions: () => {
    return Question.find()
      .then(events => {
        return events;
      })
      .catch(err => {
        throw err;
      });
  },
  createQuestion: args => {
    const question = new Question({
      description: args.description,
      options: args.options,
      right_answer: args.right_answer,
      hits: 0,
      misses: 0,
      avarage: 0
    });
    return question
      .save()
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  },

  updateQuestion: args => {
    return Question.updateOne(
      {
        _id: args._id
      },
      {
        $set: {
          description: args.description,
          options: args.options,
          right_answer: args.right_answer
        }
      }
    )
      .then(result => {
        console.log(args);
        return args;
      })
      .catch(err => {
        console.log(err);
      });
  },

  deleteQuestion: args => {
    return Question.deleteOne({ _id: args._id })
      .then(() => {
        return args._id;
      })
      .catch(err => {
        throw err;
      });
  }
};
