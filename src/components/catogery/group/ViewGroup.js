import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

class ViewGroup extends Component {

  render() {
    return (
      <Paper >
        <Grid container>
          <Grid item xs={12} >
            {this.props.imagePath !== "" ? (<img src={this.props.imagePath} alt={""} style={{ maxHeight: '50px' }} />) : (<p>image not exists</p>)}
          </Grid>
          <Typography variant="body2" color="textSecondary" component="h3" noWrap>
            {" Group - "} {this.props.groupName}
          </Typography>
          {this.props.isEditable === true ? (
            <Grid item xs={12} container>
              <Grid item xs={6}>
                <Link
                  to={{
                    pathname: `/catogery/${this.props.token}/ViewGroup/edit/${
                      this.props.id
                      }`
                  }}
                >
                  <EditIcon color="primary" />
                </Link>
              </Grid>
              <Grid item xs={6}>
                <DeleteIcon style={{ alignContent: "right", alignItems: "right" }} onClick={() => this.props.delete(this.props.id)} color="secondary" />
              </Grid>
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
