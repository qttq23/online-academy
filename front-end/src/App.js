import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Homepage from "./components/Homepage/Homepage";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        height: "100vh",
        gridTemplateAreas: `"header" 
                         "main" 
                       "footer"`,
    },
    main: {},
    footer: {},
}));

const App = ({location}) => {
    const classes = useStyles();

    return (
        <div>
            <Router>
                <CssBaseline/>
                <Grid container direction="column" className={classes.root}>
                    <Grid item xs>
                        <Navbar />
                    </Grid>
                    <Grid item className={classes.main}>
                        <Switch>
                            <Route exact path="/">
                                <Homepage />
                            </Route>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                            <Route exact path="/register">
                                <Register />
                            </Route>
                        </Switch>
                    </Grid>
                    <Grid item xs>
                        <Footer />
                    </Grid>
                </Grid>
            </Router>
        </div>
    );
};

export default App;