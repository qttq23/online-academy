import React, { Component } from 'react';
import { Grid,  Typography,  TextField, InputAdornment, MenuItem, Select, Input, Button } from '@material-ui/core';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import ImageUpload from './ImageUpload';


class AddCourse extends Component {

    render() {
        return(
            <Grid container style={{marginTop: 20}} row>
                <Grid xs={3} />
                <Grid container xs={6} style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Typography variant="h5" color="primary" style={{textAlign: 'center', width: '100%', fontWeight: 'bold'}}>Course Overview</Typography>
                    <Grid container xs={12} style={{marginTop: 20}}>
                        <Grid container xs={12} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Grid xs={2}>
                                <Typography variant="h6" style={{color: 'grey', fontWeight: 'bold'}}>Title:</Typography>
                            </Grid>
                            
                            <Grid xs={9} >
                                <TextField
                                    id="filled-full-width"
                                    style={{marginTop:8, marginBottom:8, width: 350 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    
                                />
                            </Grid>
                        </Grid>
                        <Grid container xs={12} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 20
                        }}>
                            <Grid xs={2}>
                                <Typography variant="h6" style={{color: 'grey', fontWeight: 'bold'}}>Category:</Typography>
                            </Grid>
                            
                            <Grid xs={9} >
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={1}
                                style={{width: 200}}
                                >
                                <MenuItem value={1}>Web Development</MenuItem>
                                <MenuItem value={2}>Mobile Development</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>


                        <Grid container xs={12} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 40
                        }}>
                            <Grid xs={3}>
                                <Typography variant="h6" style={{color: 'grey', fontWeight: 'bold'}}>Price: </Typography>
                            </Grid>
                            
                            <Grid xs={9} >
                            <Input
                                id="standard-adornment-amount"
                                endAdornment={<InputAdornment position="end">$</InputAdornment>}
                            />
                            </Grid>
                        </Grid>



                        <Grid container xs={12} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 40
                        }}>
                            <Grid xs={3}>
                                <Typography variant="h6" style={{color: 'grey', fontWeight: 'bold'}}>Course's Avatar:</Typography>
                            </Grid>
                            
                            <Grid xs={9} >
                                <ImageUpload cardName="Input Image"  />
                            </Grid>
                        </Grid>

                        

                        <Grid container xs={12} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 20
                        }}>
                            <Grid xs={3}>
                                <Typography variant="h6" style={{color: 'grey', fontWeight: 'bold'}}>Short Description:</Typography>
                            </Grid>
                            
                            <Grid xs={9} >
                                <TextField
                                    id="filled-full-width"
                                    style={{marginTop:8, marginBottom:8, width: 350 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    
                                />
                            </Grid>
                        </Grid>



                        <Grid container xs={12} style={{
                            display: 'flex',
                            alignItems: 'start',
                            justifyContent: 'space-between',
                            marginTop: 40
                        }}>
                            <Grid xs={3}>
                                <Typography variant="h6" style={{color: 'grey', fontWeight: 'bold'}}>Description: </Typography>
                            </Grid>
                            
                            <Grid xs={9} maxWidth={500} maxHeigth={300}>
                                <Editor
                                    
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    editorStyle={{maxHeight: 300, height: 300, backgroundColor: '#fff'}}
                                    />
                            </Grid>
                        </Grid>
                    
                        <Grid container xs={12} style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: 40
                        }}>
                            <Button color="primary" variant="contained">
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
               <Grid xs={3} />
            </Grid>
        );
    }


}


export default AddCourse;