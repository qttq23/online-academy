import React, { Component, useEffect, useState } from 'react';
import {
    Grid,
    Typography,
    List,
    Button,
    Paper,
    ListItem,
    Avatar,
    LinearProgress,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl
} from '@material-ui/core';
import { Rating, Pagination } from '@material-ui/lab';
import Image from 'material-ui-image';

import UpdateIcon from '@material-ui/icons/Update';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import StarIcon from '@material-ui/icons/Star';
import CommentIcon from '@material-ui/icons/Comment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';



import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function MyDialog({ type, handleClose, progressNumber, message }) {


    const classes = useStyles();


    if (type == 'close') {
        return ''
    }

    // render
    if (type == 'success') {
        return (

            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={true}>
		      <DialogTitle id="simple-dialog-title">Success</DialogTitle>
		      <Alert severity="success">
		          {message}
		        </Alert>
		    </Dialog>

        )
    }

    if (type == 'error') {
        return (

            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={true}>
		      {<DialogTitle id="simple-dialog-title">Error</DialogTitle>}
		      <Alert severity="error">
		          {message}
		        </Alert>
		      
		    </Dialog>

        )
    }

    if (type == 'progress') {
        return (
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgressWithLabel value={progressNumber} />
            </Backdrop>
        )
    }

    // default
    return (
        <Backdrop className={classes.backdrop} open={true}>
    			 loading...
                <CircularProgress color="inherit" />
            </Backdrop>
    )

}

export default MyDialog

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};