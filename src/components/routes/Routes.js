import React from "react";
import { Switch, Route } from "react-router-dom";
import Profile from "../user/Profile";
import Favourites from "../user/Favourites";
import Remedies from "../user/remedies/Remedies";
import Home from "../mainPage/Home";
import ProtectedRoute from "./ProtectedRoute";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <ProtectedRoute path="/userProfile/:token" component={Profile} token={1} />
      <ProtectedRoute path="/userRemedies/:token" component={Remedies} token={1} />
      <ProtectedRoute path="/userFavourites/:token" component={Favourites} token={1} />
      <Route path="*" component={Home} />
    </Switch>
  );
}
