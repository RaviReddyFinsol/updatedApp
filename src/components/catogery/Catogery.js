import React,{Component} from "react";
import { Switch, Route,Redirect,Link } from "react-router-dom";
import AddProduct from './product/AddProduct';
import ViewProduct from './product/ViewProduct';
import AddGroup from './group/AddGroup';
import ViewGroup from './group/ViewGroup';
import AddSubGroup from './subGroup/AddSubGroup';
import ViewSubGroup from './subGroup/ViewSubGroup';
import AddChildGroup from './childGroup/AddChildGroup';
import ViewChildGroup from './childGroup/ViewChildGroup';

var istokenValid = false;

class Catogery extends Component {
    render(){
      let routeComponent = ViewProduct;
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
             viewLinkName = "View Group";
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
            routeComponent = ViewProduct;
            viewLinkName = "View Product";
            addLinkName = "Add Product";
            break;
          }
          case "ViewGroup": {
            routeComponent = ViewGroup;
            viewLinkName = "View Group";
            addLinkName = "Add Group";
            break; 
          }
          case "ViewSubGroup": {
            routeComponent = ViewSubGroup;
            viewLinkName = "View Sub-Group";
            addLinkName = "Add Sub-Group";
            break;
          }
          case "ViewChildGroup": {
            routeComponent = ViewChildGroup;
            viewLinkName = "View Child Group"; 
            addLinkName = "Add Child Group";
            break;
          }
          default : {
            routeComponent = ViewProduct;
            viewLinkName = "View Product";
            addLinkName = "Add Product";
          }
        }
      }
        return(
            istokenValid === true ? <Redirect to={{pathname:"/"}}/> : (
                <div>                
                  <div className="row">
                    <div className="colum">
                      <Link to={{ pathname: `/catogery/${this.props.match.params.token}/${this.props.match.params.page}` }}>{viewLinkName}</Link>   {" "}                   
                      <Link to={{ pathname: `/catogery/${this.props.match.params.token}/${this.props.match.params.page}/add` }}>{addLinkName}</Link>
                    </div>
                    <div className="colum">
                      <Switch>
                        <Route exact path='/catogery/:token/:page' component={routeComponent} />
                        <Route path='/catogery/:token/:page/add' component={routeComponent} />
                        <Route path="*" component={ViewProduct} />
                      </Switch>
                    </div>
                  </div>
                </div>)
        );        
    }
}

export default Catogery;