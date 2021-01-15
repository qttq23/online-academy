import React from 'react';
import { Container, Grid, List, ListItemText, Typography, Divider } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

function CourseTile(props) {
  return (
    <Container>
      <Grid container>
        <Grid xs={2} sm={4}>
          <img
            src={props.imageUrl}
            alt={props.title}
            width={260}
            height={145}
          />
        </Grid>
        <Grid xs={4} sm={6}>
          <List disablePadding>
            <ListItemText primary={<Typography variant="h6" style={{ fontWeight: 'bold' }}>{props.title}</Typography>} />
            <ListItemText primary={<Typography variant="subtitle" style={{ fontSize: 16 }}>{props.description}</Typography>} />
            <ListItemText primary={<Typography variant="subtitle" style={{ fontSize: 14 }} >{props.lecturer}</Typography>} />
            <ListItemText primary={
              <Container style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} disableGutters>
                <Typography variant="subtitle1" style={{ color: '#e91e63', fontWeight: 'bold', textAlign: 'center' }}>{props.rating}</Typography>
                <Rating name="read-only" value={props.rating} readOnly size="small" 
                style={{
                  color: "#e91e63",
                  padding: "0 5px"
                }}/>
              </Container>} />
          </List>
        </Grid>
        <Grid xs={2}>
          <Container disableGutters style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
            <Typography variant="subtitle1" style={{ textAlign: 'right', fontWeight: 'bold' }}>$ {props.price}</Typography>
            <Typography variant="subtitle1" style={{ textAlign: 'right', color: '#ccc', textDecoration: 'line-through' }}>$ {props.actualPrice}</Typography>
          </Container>
        </Grid>
      </Grid>
      <Divider style={{ marginTop: 10 }} />
    </Container>
  );
}

export default CourseTile;