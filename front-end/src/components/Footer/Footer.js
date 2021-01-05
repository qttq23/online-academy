import {Grid, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: "1rem",
        padding: "1rem",
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        backgroundColor: "#333",
        color: "#FFF"
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
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
    )
}