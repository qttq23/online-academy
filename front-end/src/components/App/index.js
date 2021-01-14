
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Grid} from "@material-ui/core";
import Header from "../Header";
import Login from "../Login";
import SignUp from "../Signup";
import Footer from "../Footer";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AdminLayout from "../../layouts/AdminLayout";
import Categories from "../Categories";
import CourseDetail from "../CourseDetail";
import MyCourseList from "../MyCourseList";
import MyFavoriteList from "../MyFavoriteList";
import MyTeachList from "../MyTeachList";
import CourseList from "../CoursesList";
import Profile from "../Profile";
import UpdateProfile from "../UpdateProfile";
import AddCourse from "../AddCourse";
import VideoPlayer from "../VideoPlayer";
import Homepage from "../Home/Homepage";
import Users from "../Admin/Users";
import ManageCategories from "../Admin/ManageCategories";
import ManageCourses from "../Admin/ManageCourses";


import ActivateAccount from "../ActivateAccount";
import store from '../../redux/store'
import myModel from '../../helpers/myModel'
import '../../helpers/myFirebase'
import {
  Redirect, useRouteMatch
} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    //display: "flex",
    //flexDirection: "column",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    height: "100vh",
    gridTemplateAreas: `"header" 
                         "main" 
                       "footer"`,
    backgroundColor: "#fbfbfb"
  },
  main: {
    //minHeight: "100vh",
    //marginBottom: "-8vh",
    //paddingBottom: "8vh",
  },
  footer: {
    //alignSelf: "flex-end",
    //marginTop: "auto",
  },
}))

const App = ({ location }) => {
  const classes = useStyles()


  let accessToken = localStorage.getItem('accessToken')
  if (accessToken) {

    // already Login
    // if not account info, get it
    if (!store.getState().account) {

      let accountId = localStorage.getItem('accountId')
      myModel.getAccountInfo(
        accountId,
        function ok(response) {

          // store info
          console.log('app: before dispatch')
          store.dispatch({
            type: 'set_account',
            payload: {
              data: response.data
            }
          })
        },
        function fail(error) {
          // ??.......
        }
      )
    }
  }

  return (
    <div>
      <Router>
        <Grid container direction="column" className={classes.root}>
          <Grid item xs>
            <Header />
          </Grid>
          <Grid item className={classes.main}>
            <Switch>
              <Route path="/admin/:path?" exact>
                <AdminLayout>
                  <Switch>
                    <Route exact path="/admin/dashboard">

                    </Route>
                    
                    <Route exact path="/admin/users">
                      <Users />
                    </Route>

                    <Route exact path="/admin/categories">
                      <ManageCategories />
                    </Route>

                    <Route exact path="/admin/courses">
                      <ManageCourses />
                    </Route>

                  </Switch>
                </AdminLayout>
              </Route>
              <Route exact path="/signin">
                {/* <SignIn /> */}
                <Login />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/logout">
                <Logout />
              </Route>
              <Route exact path="/activate" component={ActivateAccount}>
              </Route>
              <Route exact path="/categories" >
                <Categories />
              </Route>
              <Route path="/courseList" component={CourseList}>
                {/*<CourseList />*/}
              </Route>

               <Route exact path="/courses/registered" >
                <MyCourseList />
              </Route>
               <Route exact path="/courses/watchlist" >
                <MyFavoriteList />
              </Route>
               <Route exact path="/courses/teachlist" >
                <MyTeachList />
              </Route>

              <Route exact path="/videos/:videoId" >
                <VideoPlayer />
              </Route>
              <Route exact path="/courses/:id" >
                <CourseDetail />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              {/* <Route exact path="/profile/update">
                <UpdateProfile />
  </Route>*/}
              <Route exact path="/add-course">
                <AddCourse />
              </Route>
              <Route path="/">
                <Homepage />
              </Route>
            </Switch>
          </Grid>
          {window.location.pathname.includes("/admin") !== -1 ? (
            <Grid item xs>
              <Footer item className={classes.footer} />
            </Grid>
          ) : null}
        </Grid>
      </Router>
    </div>
  )
}


function Logout(){

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    store.dispatch({
      type: 'set_account',
      payload: {
        data: null
      }
    })

    return <Redirect to="/login" />
}

export default App;
