import React from 'react';
import BannerExample from "./Carousel/Carousel";
import HotCourse from "./HotCourse/HotCourse";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#108690",
    justifyContent: "center"
  },
  carousel: {
    backgroundColor: "white",
    width: "fit-content",
    padding: "10px",
    borderRadius: "5px",
    alignSelf: "center",
    margin: "10px"
  }
}))

const Homepage = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <BannerExample></BannerExample>
      <div className={classes.carousel}>
        <h4 style={{ marginLeft: "130px", fontWeight: "Bold", fontSize: "30" }}>MOST VIEWED COURSE</h4>
        <HotCourse></HotCourse>
      </div>
      <div className={classes.carousel}>
        <h4 style={{ marginLeft: "130px", marginTop: "50px", fontWeight: "Bold", fontSize: "30" }}>HOT COURSE</h4>
        <HotCourse></HotCourse>
      </div>
    </div >
  )
}

export default Homepage