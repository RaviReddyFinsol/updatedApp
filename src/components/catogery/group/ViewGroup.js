import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
//import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import axios from "axios";

class ViewGroup extends Component {
  deleteGroup = event => {
    axios
      .delete("http://localhost:9003/api/catogery/group", {
        params: { token: this.props.token, groupID: this.props.id }
      })
      .then(response => console.log(response));
  };

  render() {
    return (
      <Card>
        <CardActionArea>
          <img src={this.props.imagePath} alt={""} />
          {/* <CardMedia
            style={{ height: 0, paddingTop: "46.25%" }}
            image={this.props.imagePath}
          /> */}
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.groupName}
            </Typography>
          </CardContent>
        </CardActionArea>
        {this.props.isEditable === true ? (
          <CardActions>
            <Button size="small" color="primary">
              <Link
                to={{
                  pathname: `/catogery/${this.props.token}/ViewGroup/edit/${
                    this.props.id
                  }`
                }}
              >
                <EditIcon />
              </Link>
            </Button>
            <Button size="small" color="primary" onClick={this.deleteGroup}>
              <DeleteIcon />
            </Button>
          </CardActions>
        ) : (
          <p>Added by other User</p>
        )}
      </Card>
    );
  }
}

export default ViewGroup;
