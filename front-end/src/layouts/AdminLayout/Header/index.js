import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import { Colors } from "../../../helpers/colors";

import {
    Link,
} from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    background: Colors.primary,
  },
  logo: {
    color: Colors.white,
    background: Colors.primary,
  },
}));

const Header = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const [notifications] = useState([]);

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <NavLink to="/" style={{ textDecoration: "none", color: "#fff" }}>
            Academy Online
        </NavLink>

        {/*<Avatar className={classes.logo}>
          <NavLink to="/" style={{ textDecoration: "none", color: "#fff" }} />
          QA
        </Avatar>*/}
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

  
          <IconButton color="inherit">
            <InputIcon />
          </IconButton>


        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
Header.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};
export default Header;
