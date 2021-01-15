import React from 'react';
import { Grid, Typography, Avatar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

function CommentTile(props) {
  return (
    <Grid container style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <Grid xs={1}>
        <Avatar alt={props.userName} src={props.avatarUrl} />
      </Grid>
      <Grid item xs={10} style={{ marginLeft: 20 }}>
        <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>{props.userName}</Typography>
        <Grid style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Rating value={props.rating} readOnly />
          <Typography variant="caption" style={{ color: 'grey', marginLeft: 10 }}>{props.last_updated}</Typography>
        </Grid>
        <Typography variant="p" style={{ fontSize: 13 }}>{props.comment}</Typography>
      </Grid>
    </Grid>
  );
}

export default CommentTile;