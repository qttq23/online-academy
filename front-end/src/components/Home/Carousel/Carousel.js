import React from 'react';
import Carousel from "react-material-ui-carousel"
import autoBind from "auto-bind"
import '../style/Example.scss';
import { NavLink } from "react-router-dom";
import {Button, Card, CardContent, CardMedia, Grid, Typography} from '@material-ui/core';

function Banner(props) {
    if (props.newProp) console.log(props.newProp)
    const contentPosition = props.contentPosition ? props.contentPosition : "left"
    const totalItems = props.length ? props.length : 3;
    const mediaLength = totalItems - 1;

    let items = [];
    const content = (
        <Grid item xs={12 / totalItems} key="content">
            <CardContent className="Content">
                <Typography className="Title">
                    {props.item.Name}
                </Typography>

                <Typography className="Caption">
                    {props.item.Caption}
                </Typography>

                <NavLink to={`/courseList?fields=categoryId&keyword=${props.item.id}&name=${props.item.Name}`}
            style={{ textDecoration: "none", color: "#e91e63" }}>
                <Button variant="outlined" className="ViewButton">
                    View Now
                </Button>
                </NavLink>
            </CardContent>
        </Grid>
    )


    for (let i = 0; i < mediaLength; i++) {
        const item = props.item.Items[i];

        const media = (
            <Grid item xs={12 / totalItems} key={item.Name}>
                <CardMedia
                    className="Media"
                    image={item.Image}
                    title={item.Name}
                >
                    <Typography className="MediaCaption">
                        {item.Name}
                    </Typography>
                </CardMedia>

            </Grid>
        )

        items.push(media);
    }

    if (contentPosition === "left") {
        items.unshift(content);
    } else if (contentPosition === "right") {
        items.push(content);
    } else if (contentPosition === "middle") {
        items.splice(items.length / 2, 0, content);
    }

    return (
        <Card raised className="Banner">
            <Grid container spacing={0} className="BannerGrid">
                {items}
            </Grid>
        </Card>
    )
}

const items = [
    {
        Name: "Web Development",
        Caption: "Learn Web Development!",
        contentPosition: "left",
        Items: [
            {
                Image: "https://media3.giphy.com/media/L8K62iTDkzGX6/giphy.gif"
            },
            {
                Image: "https://i.pinimg.com/originals/1e/dd/47/1edd4798851736ee98ac2ae083e9ee82.gif"
            }
        ],
        id: '5fd4e5b74ec3a2471437e2bc'
    },
    {
        Name: "Mobile Development",
        Caption: "Learn Mobile Development!",
        contentPosition: "middle",
        Items: [
            {
                Image: "https://www.flinto.com/assets/mac/live-view_2x-51791f840c64ce9ccf1db0c349d8ac96059f6a53a71266a15608e05e87c1bf98.gif"
            },
            {
                Image: "https://miro.medium.com/max/1600/1*7mlNL7WE7lHnSAjUmX9AJg.gif"
            }
        ],
        id: '5fd4e5b74ec3a2471437e2bd'
    },
    {
        Name: "Maths",
        Caption: "Learn Mathemetics",
        contentPosition: "right",
        Items: [
            {
                Image: "https://source.unsplash.com/featured/?lamp"
            },
            {
                Image: "https://source.unsplash.com/featured/?vase"
            }
        ],
        id: '5ffdb038482d9f8238313668'
    }
]

class BannerExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autoPlay: true,
            timer: 500,
            animation: "fade",
            indicators: true,
            timeout: 500,
            navButtonsAlwaysVisible: false,
            navButtonsAlwaysInvisible: false
        }

        autoBind(this);
    }

    toggleAutoPlay() {
        this.setState({
            autoPlay: !this.state.autoPlay
        })
    }

    toggleIndicators() {
        this.setState({
            indicators: !this.state.indicators
        })
    }

    toggleNavButtonsAlwaysVisible() {
        this.setState({
            navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible
        })
    }

    toggleNavButtonsAlwaysInvisible() {
        this.setState({
            navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible
        })
    }

    changeAnimation(event) {
        this.setState({
            animation: event.target.value
        })
    }

    changeTimeout(event, value) {
        this.setState({
            timeout: value
        })
    }

    render() {
        return (
            <div style={{ color: "#494949", height: "500px" }}>
                <Carousel
                    className="Example"
                    autoPlay={this.state.autoPlay}
                    timer={this.state.timer}
                    animation={this.state.animation}
                    indicators={this.state.indicators}
                    timeout={this.state.timeout}
                    navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
                    navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
                    next={(now, previous) => console.log(`Next User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                    prev={(now, previous) => console.log(`Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                    onChange={(now, previous) => console.log(`OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                >
                    {
                        items.map((item, index) => {
                            return <Banner item={item} key={index} contentPosition={item.contentPosition} />
                        })
                    }
                </Carousel>
            </div>
        )
    }
}

export default BannerExample;