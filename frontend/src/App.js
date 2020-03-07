import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import QuestionsPage from "./pages/QuestionsPage";
import StatisticsPages from "./pages/StatisticsPage";
import MainNavigation from "./components/Navigation/MainNavigation";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <MainNavigation />
        <main className="main-content">
          <Switch>
            <Redirect exact from="/" to="/questions" />
            <Route path="/questions" component={QuestionsPage} />
            <Route path="/create" component={StatisticsPages} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
