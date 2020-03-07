const { buildSchema } = require("graphql");

module.exports = buildSchema(`
        type Question{
          _id: ID!
          description: String!
          options: [String!]!
          right_answer: Int!
          hits: Int!
          misses: Int!
          avarage: Float!
        }

        type RootQuery{
            questions: [Question!]!
        }
      
        type RootMutation{
            createQuestion(description: String!, options: [String!]!, right_answer: Int!): Question
            updateQuestion(_id: ID!, description: String!, options: [String!]!, right_answer: Int!): Question
            deleteQuestion(_id: ID!): ID
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
        `);
