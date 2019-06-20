import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

class ViewChildGroup extends Component {
  render() {
    return (
      <Paper>
        <Grid container>
          <Grid item xs={12}>
            {this.props.imagePath !== "" ? (<img src={this.props.imagePath} alt={""} style={{ maxHeight: '50px' }} />) : (<p>image not exists</p>)}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" component="p" noWrap>
              {"ChildGroup - "}
              {this.props.childGroupName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" noWrap>
              {"SubGroup - "}
              {this.props.subGroupName}
            </Typography>
          </Grid>
          {this.props.isEditable === true ? (
            <Grid item xs={12} container>
              <Grid item xs={6}>
                <Link
                  to={{
                    pathname: `/catogery/${
                      this.props.token
                      }/ViewChildGroup/edit/${this.props.id}`
                  }}
                >
                  <EditIcon color="primary" />
                </Link>
              </Grid>
              <Grid item xs={6}>
                <DeleteIcon color="secondary" onClick={() => this.props.delete(this.props.id)} />
              </Grid>
            </Grid>
          ) : (
              <p />
            )}
        </Grid>
      </Paper >
    );
  }
}

export default ViewChildGroup;
