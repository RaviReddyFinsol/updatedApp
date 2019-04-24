import React from "react";
import { Switch, Route } from "react-router-dom";
import Profile from "./user/Profile";
import Favourites from "./user/Favourites";
import Remedies from "./user/Remedies";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <ProtectedRoute path="/userProfile" component={Profile} token={1} />
      <ProtectedRoute path="/userRemedies" component={Remedies} token={1} />
      <ProtectedRoute path="/userFavourites" component={Favourites} token={1} />
      <Route path="*" component={Home} />
    </Switch>
  );
}
