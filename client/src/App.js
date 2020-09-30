import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { Dashboard, Four04, Footer, Header, Home, Login } from "./components";

import { ClientChartEntry } from "components/base";

import "./App.scss";

export const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/login">
        <Header />
        <Login />
      </Route>

      <Route exact path="/create-account">
        <Redirect
          to={{ pathname: "/login", state: { status: "Create Account" } }}
        />
      </Route>

      {/* clients/:uid is for the ADMINS clients; this is the ADMINS uid*/}
      <Route exact path="/clients/:uid">
        <Header />
        <Dashboard />
      </Route>
      {/* client/uid is for the CLIENTs actual uid*/}
      <Route exact path="/client/:id">
        <Header />
        <ClientChartEntry />
      </Route>

      <Route>
        <Four04 />
      </Route>
    </Switch>
    <Footer />
  </Router>
);
