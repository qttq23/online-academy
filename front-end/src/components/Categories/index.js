import React, { useState } from 'react'
import { Grid, Typography, Hidden, Card, CardHeader, List, ListItem, Collapse, FormGroup, ListItemText, Divider, Container, Checkbox, FormControl, Radio, RadioGroup, FormControlLabel } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { Rating } from '@material-ui/lab'

import CourseTile from './CourseTile'

const Categories = (props) => {
  const [state, setState] = useState({
    openRating: false,
    openPrice: false,
    paid: false,
    free: false
  })
  const [value, setValue] = useState(5)

  const handleChange = (event) => {
    if (event.target.name === "rating")
      setValue(+event.target.value)
    else {
      setState({ ...state, [event.target.name]: event.target.checked })
    }
  }
  const handleRating = () => {
    setState({ ...state, openRating: !state.openRating })
  }
  const handlePrice = () => {
    setState({ ...state, openPrice: !state.openPrice })
  }

  return (
    <Grid style={{ margin: "20px 50px", padding: "10px", backgroundColor: "white", borderRadius: "5px" }} >
      <Grid item container>
        <Grid item />
        <Grid item xs={4} style={{ marginLeft: 30, marginTop: 50 }}>
          <Typography variant="h4" style={{ fontWeight: '700' }}>Categories</Typography>
        </Grid>
        <Grid />
      </Grid>
      <Grid item container>
        <Grid item xs={4} style={{ marginLeft: 30, marginTop: 50 }}>
          <Typography variant="h5" style={{ fontWeight: '700' }}>All topics</Typography>
        </Grid>
        <Grid item container spacing={2} direction="row" style={{ marginTop: 5, marginLeft: 20, justifyContent: "center" }}>
          <Grid item xs={5} sm={4} md={2}>
            <Card variant="outlined" >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card >
          </Grid>
          <Grid item xs={5} sm={4} md={2}>
            <Card variant="outlined" >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card >
          </Grid>
          <Grid item xs={5} sm={4} md={2}>
            <Card variant="outlined" >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card >
          </Grid>
          <Grid item xs={5} sm={4} md={2}>
            <Card variant="outlined" >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card >
          </Grid>
          <Grid item xs={5} sm={4} md={2}>
            <Card variant="outlined" >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card >
          </Grid>
        </Grid>
        <Grid item container spacing={2} direction="row" style={{ marginTop: 5, marginLeft: 20, justifyContent: "center" }}>
          <Grid item xs={5} sm={4} md={2}>
            <Card variant="outlined" >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card >
          </Grid>
          <Grid item xs={5} sm={4} md={2}>
            <Card variant="outlined" >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card >
          </Grid>
          <Grid item xs={5} sm={4} md={2}>
            <Card variant="outlined" >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card >
          </Grid>
          <Grid item xs={5} sm={4} md={2}>
            <Card variant="outlined" >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card >
          </Grid>
          <Grid item xs={5} sm={4} md={2}>
            <Card variant="outlined" >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card >
          </Grid>
        </Grid>
      </Grid>
      <Grid item container style={{ marginTop: 50, marginLeft: 20 }}>
        <Grid item xs={4} style={{ marginBottom: 20 }}>
          <Typography variant="h5" style={{ fontWeight: '700' }}>All development courses</Typography>
        </Grid>
        <Grid container>
          <Hidden only={['xs', 'sm']}>
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <Divider />
              <ListItem button onClick={handleRating}>
                <ListItemText primary={<Typography variant="h6" style={{ fontWeight: 'bold' }}>Ratings</Typography>} style={{ marginRight: 150 }} />
                {state.openRating ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={state.openRating} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="rating" name="rating" value={value} onChange={handleChange}>
                      <FormControlLabel label={
                        <Container disableGutters style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignItems: 'center'
                        }}>
                          <Rating name="read-only" value={5} readOnly size="small" />
                        </Container>
                      } control={<Radio />} value={5} />
                      <FormControlLabel label={
                        <Container disableGutters style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignItems: 'center'
                        }}>
                          <Rating name="read-only" value={4} readOnly size="small" />
                        </Container>
                      } control={<Radio />} value={4} />
                      <FormControlLabel label={
                        <Container disableGutters style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignItems: 'center'
                        }}>
                          <Rating name="read-only" value={3} readOnly size="small" />
                        </Container>
                      } control={<Radio />} value={3} />
                      <FormControlLabel label={
                        <Container disableGutters style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignItems: 'center'
                        }}>
                          <Rating name="read-only" value={2} readOnly size="small" />
                        </Container>
                      } control={<Radio />} value={2} />
                      <FormControlLabel label={
                        <Container disableGutters style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignItems: 'center'
                        }}>
                          <Rating name="read-only" value={1} readOnly size="small" />
                        </Container>
                      } control={<Radio />} value={1} />
                    </RadioGroup>
                  </FormControl>
                </List>
              </Collapse>
              <Divider />
              <ListItem button onClick={handlePrice}>
                <ListItemText primary={<Typography variant="h6" style={{ fontWeight: 'bold' }}>Price</Typography>} style={{ marginRight: 150 }} />
                {state.openPrice ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={state.openPrice} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <FormGroup column>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.paid}
                          onChange={handleChange}
                          name="paid"
                          color="primary"
                        />
                      }
                      label="Paid"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.free}
                          onChange={handleChange}
                          name="free"
                          color="primary"
                        />
                      }
                      label="Free"
                    />
                  </FormGroup>
                </List>
              </Collapse>
              <Divider />
            </List>
          </Hidden>
          <Grid xs={12} sm={8} style={{ marginLeft: 20 }}>
            <List>
              <CourseTile
                imageUrl={"https://img-a.udemycdn.com/course/240x135/1708340_7108_4.jpg?6SU20jCZLkR4SlfMFGkKgB0yNTrq1fx3QYAzjOeROmHgiku19tGzpZqEZ85CfaB3X2Q-g1KgUIFBMBUFxD7FKzCEh7VqBQ-kvMk4tpRAqTWtyDt8GvGqs82XplyZI59i"}
                title="2020 Complete Python Bootcamp From Zero to Hero in Python"
                description="Learn python as a professional ...."
                lecturer="Jose Rosalie"
                rating={4.6}
                price={12.99}
                actualPrice={139.99}
              />
              <CourseTile
                imageUrl={"https://img-a.udemycdn.com/course/240x135/1708340_7108_4.jpg?6SU20jCZLkR4SlfMFGkKgB0yNTrq1fx3QYAzjOeROmHgiku19tGzpZqEZ85CfaB3X2Q-g1KgUIFBMBUFxD7FKzCEh7VqBQ-kvMk4tpRAqTWtyDt8GvGqs82XplyZI59i"}
                title="2020 Complete Python Bootcamp From Zero to Hero in Python"
                description="Learn python as a professional ...."
                lecturer="Jose Rosalie"
                rating={4.6}
                price={12.99}
                actualPrice={139.99}
              />
              <CourseTile
                imageUrl={"https://img-a.udemycdn.com/course/240x135/1708340_7108_4.jpg?6SU20jCZLkR4SlfMFGkKgB0yNTrq1fx3QYAzjOeROmHgiku19tGzpZqEZ85CfaB3X2Q-g1KgUIFBMBUFxD7FKzCEh7VqBQ-kvMk4tpRAqTWtyDt8GvGqs82XplyZI59i"}
                title="2020 Complete Python Bootcamp From Zero to Hero in Python"
                description="Learn python as a professional ...."
                lecturer="Jose Rosalie"
                rating={4.6}
                price={12.99}
                actualPrice={139.99}
              />
              <CourseTile
                imageUrl={"https://img-a.udemycdn.com/course/240x135/1708340_7108_4.jpg?6SU20jCZLkR4SlfMFGkKgB0yNTrq1fx3QYAzjOeROmHgiku19tGzpZqEZ85CfaB3X2Q-g1KgUIFBMBUFxD7FKzCEh7VqBQ-kvMk4tpRAqTWtyDt8GvGqs82XplyZI59i"}
                title="2020 Complete Python Bootcamp From Zero to Hero in Python"
                description="Learn python as a professional ...."
                lecturer="Jose Rosalie"
                rating={4.6}
                price={12.99}
                actualPrice={139.99}
              />
              <CourseTile
                imageUrl={"https://img-a.udemycdn.com/course/240x135/1708340_7108_4.jpg?6SU20jCZLkR4SlfMFGkKgB0yNTrq1fx3QYAzjOeROmHgiku19tGzpZqEZ85CfaB3X2Q-g1KgUIFBMBUFxD7FKzCEh7VqBQ-kvMk4tpRAqTWtyDt8GvGqs82XplyZI59i"}
                title="2020 Complete Python Bootcamp From Zero to Hero in Python"
                description="Learn python as a professional ...."
                lecturer="Jose Rosalie"
                rating={4.6}
                price={12.99}
                actualPrice={139.99}
              />
              <CourseTile
                imageUrl={"https://img-a.udemycdn.com/course/240x135/1708340_7108_4.jpg?6SU20jCZLkR4SlfMFGkKgB0yNTrq1fx3QYAzjOeROmHgiku19tGzpZqEZ85CfaB3X2Q-g1KgUIFBMBUFxD7FKzCEh7VqBQ-kvMk4tpRAqTWtyDt8GvGqs82XplyZI59i"}
                title="2020 Complete Python Bootcamp From Zero to Hero in Python"
                description="Learn python as a professional ...."
                lecturer="Jose Rosalie"
                rating={4.6}
                price={12.99}
                actualPrice={139.99}
              />
              <CourseTile
                imageUrl={"https://img-a.udemycdn.com/course/240x135/1708340_7108_4.jpg?6SU20jCZLkR4SlfMFGkKgB0yNTrq1fx3QYAzjOeROmHgiku19tGzpZqEZ85CfaB3X2Q-g1KgUIFBMBUFxD7FKzCEh7VqBQ-kvMk4tpRAqTWtyDt8GvGqs82XplyZI59i"}
                title="2020 Complete Python Bootcamp From Zero to Hero in Python"
                description="Learn python as a professional ...."
                lecturer="Jose Rosalie"
                rating={4.6}
                price={12.99}
                actualPrice={139.99}
              />
              <CourseTile
                imageUrl={"https://img-a.udemycdn.com/course/240x135/1708340_7108_4.jpg?6SU20jCZLkR4SlfMFGkKgB0yNTrq1fx3QYAzjOeROmHgiku19tGzpZqEZ85CfaB3X2Q-g1KgUIFBMBUFxD7FKzCEh7VqBQ-kvMk4tpRAqTWtyDt8GvGqs82XplyZI59i"}
                title="2020 Complete Python Bootcamp From Zero to Hero in Python"
                description="Learn python as a professional ...."
                lecturer="Jose Rosalie"
                rating={4.6}
                price={12.99}
                actualPrice={139.99}
              />
              <CourseTile
                imageUrl={"https://img-a.udemycdn.com/course/240x135/1708340_7108_4.jpg?6SU20jCZLkR4SlfMFGkKgB0yNTrq1fx3QYAzjOeROmHgiku19tGzpZqEZ85CfaB3X2Q-g1KgUIFBMBUFxD7FKzCEh7VqBQ-kvMk4tpRAqTWtyDt8GvGqs82XplyZI59i"}
                title="2020 Complete Python Bootcamp From Zero to Hero in Python"
                description="Learn python as a professional ...."
                lecturer="Jose Rosalie"
                rating={4.6}
                price={12.99}
                actualPrice={139.99}
              />
              <CourseTile
                imageUrl={"https://img-a.udemycdn.com/course/240x135/1708340_7108_4.jpg?6SU20jCZLkR4SlfMFGkKgB0yNTrq1fx3QYAzjOeROmHgiku19tGzpZqEZ85CfaB3X2Q-g1KgUIFBMBUFxD7FKzCEh7VqBQ-kvMk4tpRAqTWtyDt8GvGqs82XplyZI59i"}
                title="2020 Complete Python Bootcamp From Zero to Hero in Python"
                description="Learn python as a professional ...."
                lecturer="Jose Rosalie"
                rating={4.6}
                price={12.99}
                actualPrice={139.99}
              />
              <CourseTile
                imageUrl={"https://img-a.udemycdn.com/course/240x135/1708340_7108_4.jpg?6SU20jCZLkR4SlfMFGkKgB0yNTrq1fx3QYAzjOeROmHgiku19tGzpZqEZ85CfaB3X2Q-g1KgUIFBMBUFxD7FKzCEh7VqBQ-kvMk4tpRAqTWtyDt8GvGqs82XplyZI59i"}
                title="2020 Complete Python Bootcamp From Zero to Hero in Python"
                description="Learn python as a professional ...."
                lecturer="Jose Rosalie"
                rating={4.6}
                price={12.99}
                actualPrice={139.99}
              />
              <CourseTile
                imageUrl={"https://img-a.udemycdn.com/course/240x135/1708340_7108_4.jpg?6SU20jCZLkR4SlfMFGkKgB0yNTrq1fx3QYAzjOeROmHgiku19tGzpZqEZ85CfaB3X2Q-g1KgUIFBMBUFxD7FKzCEh7VqBQ-kvMk4tpRAqTWtyDt8GvGqs82XplyZI59i"}
                title="2020 Complete Python Bootcamp From Zero to Hero in Python"
                description="Learn python as a professional ...."
                lecturer="Jose Rosalie"
                rating={4.6}
                price={12.99}
                actualPrice={139.99}
              />
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Categories