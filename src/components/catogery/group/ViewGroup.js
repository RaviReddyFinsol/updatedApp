import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

class ViewGroup extends Component {

  render() {
    return (
      <Paper style={{height:'120px'}}>
        <Grid container>
          <Grid item xs={12} style={{height:'60px'}}>
            {this.props.imagePath !== "" ? (<img src={this.props.imagePath} alt={""} style={{maxHeight:'50px'}}/>) : (<p>image not exists</p>)}
          </Grid>
          <Grid item xs={12} style={{height:'20px'}}>
            <Typography variant="body2" color="textSecondary" component="h3">
            {"Group - "} {this.props.groupName}
            </Typography>
          </Grid>
          {this.props.isEditable === true ? (
            <Grid item xs={12} style={{height:'40px'}}>
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
              <Button size="small" color="primary" onClick={() => this.props.delete(this.props.id)}>
                <DeleteIcon />
              </Button>
            </Grid>
          ) : (
              <p> </p>
            )}
        </Grid>
      </Paper>
    );
  }
}

export default ViewGroup;
