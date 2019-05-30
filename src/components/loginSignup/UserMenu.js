import React, { Component } from "react";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Button from "@material-ui/core/Button";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";
import { Link} from "react-router-dom";
// import ViewProduct from "../catogery/product/ViewProduct";
// import ViewGroup from "../catogery/group/ViewGroup";
// import ViewSubGroup from "../catogery/subGroup/ViewSubGroup";
// import ViewChildGroup from "../catogery/childGroup/ViewChildGroup";

const mapStateToProps = state => {
  return {
    token:state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: actionTypes.USER_LOGOUT })
  };
};

class UserMenu extends Component {
  state = {
    open: false
  };

  userLogout = () => {
    this.props.cookies.remove("NR_Token",{path:'/'});
    this.props.logout();
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };
  render() {
    const { open } = this.state;
    const ViewProduct = "ViewProduct";
    const ViewGroup = "ViewGroup";
    const ViewSubGroup = "ViewSubGroup";
    const ViewChildGroup = "ViewChildGroup";
    return (
      <div>
        <Button
          buttonRef={node => {
            this.anchorEl = node;
          }}
          disableRipple={true}
          disableFocusRipple={true}
          aria-owns={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          My Account
        </Button>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList onMouseLeave={this.handleClose}>
                    <Link to={{pathname :`/userProfile/${this.props.token}`}}>
                      <MenuItem onClick={this.userProfile}>M P</MenuItem>
                    </Link>
                    <Link to={{pathname :`/catogery/${this.props.token}/${ViewProduct}`}}>
                      <MenuItem onClick={this.handleClose}>P</MenuItem>
                    </Link>
                    <Link to={{pathname :`/catogery/${this.props.token}/${ViewGroup}`}}>
                      <MenuItem onClick={this.openRemedies}>
                        G
                      </MenuItem>
                    </Link>
                    <Link to={{pathname :`/catogery/${this.props.token}/${ViewSubGroup}`}}>
                      <MenuItem onClick={this.openRemedies}>
                        SG
                      </MenuItem>
                    </Link>
                    <Link to={{pathname :`/catogery/${this.props.token}/${ViewChildGroup}`}}>
                      <MenuItem onClick={this.openRemedies}>
                        CG
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={this.userLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserMenu)
);
