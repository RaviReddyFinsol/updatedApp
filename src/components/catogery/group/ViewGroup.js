import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EditGroup from '../group/EditGroup';
import {Route,Switch,Link} from "react-router-dom";

class ViewGroup extends Component {

  render() {
    return (
      <div>      
      <Card>
        <CardActionArea>
          <CardMedia
            image={this.props.imagePath} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.groupName}
            </Typography>
          </CardContent>
        </CardActionArea>
        {
          this.props.isEditable ?
            (
              <CardActions>
                <Button size="small" color="primary">
                  <Link to={{pathname:`/catogery/`}}>
                   <EditIcon />
                  </Link>
                </Button>
                <Button size="small" color="primary">
                  <DeleteIcon />
                </Button>
              </CardActions>
            ) : ""}

      </Card>
      <div className="colum">
                      <Switch>
                        <Route path='/catogery/:token/:page/edit/:id' component={EditGroup} />                        
                      </Switch>
                    </div>
      </div>
    )
  }
}

export default ViewGroup;