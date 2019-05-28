import React,{Component} from "react";
import { Switch, Route,Redirect,Link } from "react-router-dom";
import AddProduct from './product/AddProduct';
import ViewAllProducts from './product/ViewAllProducts';
import AddGroup from './group/AddGroup';
import ViewAllGroups from './group/ViewAllGroups';
import AddSubGroup from './subGroup/AddSubGroup';
import ViewAllSubGroups from './subGroup/ViewAllSubGroups';
import AddChildGroup from './childGroup/AddChildGroup';
import ViewAllChildGroups from './childGroup/ViewAllChildGroups';

var istokenValid = false;

class Catogery extends Component {
    render(){
      let routeComponent = ViewAllProducts;
      let viewLinkName = "View Product";
      let addLinkName = "Add Product";
      if(this.props.location.pathname.includes("/add"))
      {
         switch(this.props.match.params.page){
           case "ViewProduct":{
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
           default : {
             routeComponent = AddProduct;
             addLinkName = "Add Product";
             viewLinkName = "View Product";
           }
         }
      }
      else
      {
        switch(this.props.match.params.page){
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
          default : {
            routeComponent = ViewAllProducts;
            viewLinkName = "View Product";
            addLinkName = "Add Product";
          }
        }
      }
        return(
            istokenValid === true ? <Redirect to={{pathname:"/"}}/> : (
                  <div className="row">
                    <div className="colum">
                      <Link to={{ pathname: `/catogery/${this.props.match.params.token}/${this.props.match.params.page}` }}>{viewLinkName}</Link>   {" "}                   
                      <Link to={{ pathname: `/catogery/${this.props.match.params.token}/${this.props.match.params.page}/add` }}>{addLinkName}</Link>
                    </div>
                    <div className="colum">
                      <Switch>
                        <Route exact path='/catogery/:token/:page' component={routeComponent} />
                        <Route path='/catogery/:token/:page/add' component={routeComponent} />
                        <Route path="*" component={ViewAllProducts} />
                      </Switch>
                    </div>
                </div>)
        );        
    }
}

export default Catogery;