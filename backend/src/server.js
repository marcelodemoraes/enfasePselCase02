const express = require("express");
const app = express();
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const graphQLSchema = require("./graphql/schema/index");
const graphQLResolvers = require("./graphql/resolvers/index");

dotenv.config();
app.use(cors());

app.use(
  "/graphql",
  expressGraphQL({
    schema: graphQLSchema,
    //bundle of all the resolvers
    rootValue: graphQLResolvers,
    graphiql: true //api tester
  })
);

mongoose
  .connect(
    process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    () => console.log("Connected to db.")
  )
  .then(() => {
    app.listen(3333, () => console.log("Server running at port 3333!"));
  })
  .catch(err => {
    console.log(err);
  });
