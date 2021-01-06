import React, { useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Header from "./Header";
import styled from "styled-components";
import SideNavBar from "./SideNavBar";
import { Colors } from "../../helpers/colors"

const Container = styled.div`
  backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
`;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    background: Colors.white,
    marginLeft: 5,
    marginRight: 5
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
  container: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = ({ children }) => {
  const classes = useStyles();
  //const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <Container>
      <Header />
      <SideNavBar />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
