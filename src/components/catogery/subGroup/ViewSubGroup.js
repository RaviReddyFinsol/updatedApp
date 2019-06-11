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

class ViewSubGroup extends Component {
  deleteSubGroup = event => {
    axios
      .delete("http://localhost:9003/api/subGroups/subGroup", {
        params: { userID: this.props.token, subGroupID: this.props.id }
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
              {"SubGroup - "}
              {this.props.subGroupName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {"Group - "}
              {this.props.groupName}
            </Typography>
          </CardContent>
        </CardActionArea>
        {this.props.isEditable === true ? (
          <CardActions>
            <Button size="small" color="primary">
              <Link
                to={{
                  pathname: `/catogery/${this.props.token}/ViewSubGroup/edit/${
                    this.props.id
                  }`
                }}
              >
                <EditIcon />
              </Link>
            </Button>
            <Button size="small" color="primary" onClick={this.deleteSubGroup}>
              <DeleteIcon />
            </Button>
          </CardActions>
        ) : (
          <p>" "</p>
        )}
      </Card>
    );
  }
}

export default ViewSubGroup;
