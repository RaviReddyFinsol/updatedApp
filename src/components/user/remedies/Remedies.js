import React, { Component } from "react";
import "./Remedies.css";
import { Switch, Route, Link } from "react-router-dom";
import ViewRemedies from './ViewRemedies';
import AddRemedies from './AddRemedies';
import FavouriteRemedies from './FavouriteRemedies';

export default class Remedies extends Component {
  render() {
    return (
      <div>
        <h1>R</h1>
        <div className="row">
          <div className="colum">
            <Link to={{ pathname: `/userRemedies/${this.props.match.params.token}` }}>M R</Link>
            <Link to={{ pathname: `/userRemedies/${this.props.match.params.token}/addRemedies` }}>N R</Link>
            <Link to={{ pathname: `/userRemedies/${this.props.match.params.token}/favourites` }}>Fav</Link>
          </div>
          <div className="colum">
            <Switch>
              <Route exact path='/userRemedies/:token' component={ViewRemedies} />
              <Route path='/userRemedies/:token/addRemedies' component={AddRemedies} />
              <Route path='/userRemedies/:token/favourites' component={FavouriteRemedies} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
