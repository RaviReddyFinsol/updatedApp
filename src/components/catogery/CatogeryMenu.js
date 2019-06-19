import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

class CatogeryMenu extends Component {
    render() {
        return (
            <Grid container spacing={8}>
                <Grid item xs={6} sm={3}>
                    <Link to={{ pathname: `/catogery/${this.props.token}/ViewProduct` }} style={{ textDecoration: 'none', color: 'Black' }}><Paper>Product</Paper></Link>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Link to={{ pathname: `/catogery/${this.props.token}/ViewGroup` }} style={{ textDecoration: 'none', color: 'Black' }}><Paper>Group</Paper></Link>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Link to={{ pathname: `/catogery/${this.props.token}/ViewSubGroup` }} style={{ textDecoration: 'none', color: 'Black' }}><Paper>Sub Group</Paper></Link>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Link to={{ pathname: `/catogery/${this.props.token}/ViewChildGroup` }} style={{ textDecoration: 'none', color: 'Black' }}><Paper>Child Group</Paper></Link>
                </Grid>
            </Grid>
        )
    }
}

export default connect(mapStateToProps)(CatogeryMenu);