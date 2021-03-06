import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import AddProduct from "./product/AddProduct";
import ViewAllProducts from "./product/ViewAllProducts";
import AddGroup from "./group/AddGroup";
import ViewAllGroups from "./group/ViewAllGroups";
import AddSubGroup from "./subGroup/AddSubGroup";
import ViewAllSubGroups from "./subGroup/ViewAllSubGroups";
import AddChildGroup from "./childGroup/AddChildGroup";
import ViewAllChildGroups from "./childGroup/ViewAllChildGroups";
import ProtectedRoute from "../routes/ProtectedRoute";
import EditGroup from "./group/EditGroup";
import EditSubGroup from "./subGroup/EditSubGroup";
import EditChildGroup from "./childGroup/EditChildGroup";
import EditProduct from "./product/EditProduct";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

class Catogery extends Component {
  render() {
    let routeComponent = ViewAllProducts;
    let viewLinkName = "View Product";
    let addLinkName = "Add Product";
    if (this.props.location.pathname.includes("/edit")) {
      switch (this.props.match.params.page) {
        case "ViewProduct": {
          routeComponent = EditProduct;
          viewLinkName = "View Product";
          addLinkName = "Add Product";
          break;
        }
        case "ViewGroup": {
          routeComponent = EditGroup;
          viewLinkName = "View Groups";
          addLinkName = "Add Group";
          break;
        }
        case "ViewSubGroup": {
          routeComponent = EditSubGroup;
          viewLinkName = "View Sub-Group";
          addLinkName = "Add Sub-Group";
          break;
        }
        case "ViewChildGroup": {
          routeComponent = EditChildGroup;
          viewLinkName = "Edit Child Group";
          viewLinkName = "View Child Group";
          addLinkName = "Add Child Group";
          break;
        }
        default: {
          routeComponent = ViewAllProducts;
          viewLinkName = "View Product";
        }
      }
    } else if (this.props.location.pathname.includes("/add")) {
      switch (this.props.match.params.page) {
        case "ViewProduct": {
          routeComponent = AddProduct;
          viewLinkName = "View Product";
          addLinkName = "Add Product";
          break;
        }
        case "ViewGroup": {
          routeComponent = AddGroup;
          addLinkName = "Add Group";
          viewLinkName = "View Groups";
          break;
        }
        case "ViewSubGroup": {
          routeComponent = AddSubGroup;
          addLinkName = "Add Sub-Group";
          viewLinkName = "View Sub-Group";
          break;
        }
        case "ViewChildGroup": {
          routeComponent = AddChildGroup;
          addLinkName = "Add Child Group";
          viewLinkName = "View Child Group";
          break;
        }
        default: {
          routeComponent = AddProduct;
          addLinkName = "Add Product";
          viewLinkName = "View Product";
        }
      }
    } else {
      switch (this.props.match.params.page) {
        case "ViewProduct": {
          routeComponent = ViewAllProducts;
          viewLinkName = "View Product";
          addLinkName = "Add Product";
          break;
        }
        case "ViewGroup": {
          routeComponent = ViewAllGroups;
          viewLinkName = "View Groups";
          addLinkName = "Add Group";
          break;
        }
        case "ViewSubGroup": {
          routeComponent = ViewAllSubGroups;
          viewLinkName = "View Sub-Group";
          addLinkName = "Add Sub-Group";
          break;
        }
        case "ViewChildGroup": {
          routeComponent = ViewAllChildGroups;
          viewLinkName = "View Child Group";
          addLinkName = "Add Child Group";
          break;
        }
        default: {
          routeComponent = ViewAllProducts;
          viewLinkName = "View Product";
          addLinkName = "Add Product";
        }
      }
    }

    return (
      <div className="row">
        {this.props.token !== undefined ? (
          <React.Fragment>
            <Link style={{ textDecoration: 'none', color: 'Blue' }}
              to={{
                pathname: `/catogery/${this.props.match.params.token}/${
                  this.props.match.params.page
                  }`
              }}
            >
              <Button color="primary" disableFocusRipple={true} disableRipple={true} >
                {viewLinkName}
              </Button>
            </Link>
            {" "}
            <Link style={{ textDecoration: 'none', color: 'Blue' }}
              to={{
                pathname: `/catogery/${this.props.match.params.token}/${
                  this.props.match.params.page
                  }/add`
              }}
            >
              <Button color="primary" disableFocusRipple={true} disableRipple={true} >
                {addLinkName}
              </Button>
            </Link>
          </React.Fragment>
        ) : (
            ""
          )}
        <div className="colum" >
          <Switch>
            <Route
              exact
              path="/catogery/:token/:page"
              component={routeComponent}
            />
            <ProtectedRoute
              path="/catogery/:token/:page/edit/:id"
              component={routeComponent}
              token={1}
            />
            <ProtectedRoute
              path="/catogery/:token/:page/add"
              component={routeComponent}
              token={1}
            />
            <Route path="*" component={ViewAllProducts} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Catogery);
