import React from 'react';
import BannerExample from "./Carousel/Carousel";
import HotCourse from "./HotCourse/HotCourse";

class Homepage extends React.Component {
    render() {
        return (
            <div>
                <BannerExample></BannerExample>
                <h4 style={{marginLeft: "130px", fontWeight: "Bold", fontSize: "30"}}>MOST VIEWED COURSE</h4>
                <HotCourse></HotCourse>
                <h4 style={{marginLeft: "130px", marginTop: "50px", fontWeight: "Bold", fontSize: "30"}}>HOT COURSE</h4>
                <HotCourse></HotCourse>
            </div>
        )
    }
}

export default Homepage;