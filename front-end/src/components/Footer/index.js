import {BottomNavigation, Grid, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: "#333",
        color: "#FFF"
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <BottomNavigation>
            <Grid
                className={classes.footer}
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Typography>
                    HCMUS 2020 WNC
                </Typography>
            </Grid>
        </BottomNavigation>
    )
}