import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import History from "./feedback/History";
import CreateFeedback from "./feedback/CreateFeedback";

import Menu from "./core/Menu";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/myfeedbacks/" component={History} />
        <Route path="/feedbacks/new/" component={CreateFeedback} />
      </Switch>
    </div>
  );
};

export default MainRouter;
