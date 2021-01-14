import React, { Component, useState, useEffect } from 'react';
import { Grid, Typography, TextField, InputAdornment, MenuItem, Select, Input, Button, Checkbox } from '@material-ui/core';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import ImageUpload from './ImageUpload';
import myModel from '../../helpers/myModel.js'
import myConfig from '../../helpers/myConfig.js'
import store from '../../redux/store.js'
import {
    Redirect,
    useRouteMatch
} from 'react-router-dom';
import firebase from '../../helpers/myFirebase.js'

function AddCourse(props) {


    const [name, setName] = useState('5')
    const [categoryId, setCategoryId] = useState('')
    const [price, setPrice] = useState(0)
    const [saleOffPercent, setSaleOffPercent] = useState(0)
    const [shortDescription, setShortDescription] = useState('')
    const [longDescription, setLongDescription] = useState('hey')
    const [isCompleted, setIsCompleted] = useState(false)
    const [categoryList, setCategoryList] = useState([])
    const [isRedirect, setIsRedirect] = useState(false)
    const [newCourseId, setNewCourseId] = useState('')
    let { path, url } = useRouteMatch();
    // let myImage = {}
    const [myImage, setMyImage] = useState({})
    var storage = firebase.storage().ref('');

    function handleNameChanged(event) {
        setName(event.target.value)
    }

    function handleCategoryIdChanged(event) {
        setCategoryId(event.target.value)
    }

    function handlePriceChanged(event) {
        setPrice(event.target.value)
    }

    function handleSaleOffPercentChanged(event) {
        setSaleOffPercent(event.target.value)
    }

    function handleShortDescriptionChanged(event) {
        setShortDescription(event.target.value)
    }

    function handleIsCompletedChanged(event) {
        setIsCompleted(event.target.checked)
    }

    function handleEditorChanged(editorState) {
        const convertedData =
            draftToHtml(convertToRaw(editorState.getCurrentContent()));
        // console.log(convertedData)

        setLongDescription(convertedData)
    }

    function handleCreateClicked(event) {
        event.preventDefault()

        console.log('addcourse: ')
        let course = {
            categoryId,
            name,
            teacherId: localStorage.getItem('accountId'),
            numView: 0,
            imageUrl: '/temp',
            price,
            saleOffPercent: saleOffPercent / 100,
            shortDescription,
            longDescription,
            isCompleted
        }
        console.log(course)

        // validate data??.....

        function createCourse() {
            let accessToken = localStorage.getItem('accessToken')
            let refreshToken = localStorage.getItem('refreshToken')
            myModel.createCourse(
                accessToken,
                course,
                function ok(response) {

                    let courseId = response.data.id
                    console.log('addcourse: done upload database: ', courseId)

                    // update database ok
                    // then upload image to storage and update database
                    myModel.getStorageToken(
                        localStorage.getItem('accessToken'),
                        function ok(response) {

                            let token = response.data.readToken
                            console.log('storage token: ', token)
                            authWithFirebase(token,
                                function ok() {

                                    console.log('uploading image...: ', myImage)
                                    uploadImage(
                                        courseId,
                                        myImage,
                                        function ok(downloadUrl) {

                                            console.log('updating database....')
                                            myModel.updateCourse(
                                                accessToken,
                                                courseId, 
                                                {
                                                    'imageUrl': downloadUrl
                                                },
                                                function ok(response) {
                                                    setNewCourseId(courseId)
                                                },
                                                function fail(error) {

                                                }
                                            )

                                        },
                                        function fail() {
                                            console.log('fail to upload image')

                                        }
                                    )
                                },
                                function fail(error) {

                                    console.log('fail to authen with firebase')
                                })
                        },
                        function fail(error) {
                            console.log('fail to get storage token')
                        }
                    )


                },
                function fail(error) {

                    let err = error.response.data.error
                    if (err.name == myConfig.error.name.JWT_EXPIRED) {

                        console.log('refreshing token...')
                        myModel.refreshAccessToken({
                                accessToken,
                                refreshToken
                            },
                            function ok(response) {

                                // store
                                localStorage.setItem('accessToken', response.data.accessToken)

                                console.log('re-update')
                                createCourse()
                            },
                            function fail(error2) {
                                if (error2.response.status == myConfig.error.status.REFRESH_TOKEN_EXPIRED) {

                                    handleReLogin()

                                }
                            }
                        )

                    } else if (err.name == myConfig.error.name.JWT_ERROR) {
                        handleReLogin()
                    }

                }

            )
        }

        function authWithFirebase(token, okCallback, failCallback) {
            firebase.auth().signInWithCustomToken(token)
                .then((user) => {
                    okCallback()
                })
                .catch((error) => {
                    console.log(error)
                    failCallback(error)
                })
        }

        function uploadImage(courseId, imageFile, okCallback, failCallback) {

            var uploadTask = storage.child(
                `course/${courseId}/image/` + imageFile.name
            ).put(imageFile);

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                function(snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                },
                function(error) {

                    window.alert(error)
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                function() {
                    console.log('done uploading')
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        console.log('File available at: ' + downloadURL);
                        okCallback(downloadURL)
                    });

                });

        }


        createCourse()

    }

    function handleReLogin() {
        alert('login again to get access token')
        setIsRedirect(true)
    }

    function handleFile(file) {
        console.log('event file: ', file)
        // myImage = file
        setMyImage(file)
    }

    useEffect(function() {
        myModel.getCategoryList(
            function ok(response) {

                setCategoryList(response.data)
            },
            function fail(error) {

            }
        )
    }, [])

    let account = store.getState().account
    if (account && account.type != 1) {
        return <Redirect to={{
          pathname: "/home",
        }} />
    }

    if (isRedirect) {

        return <Redirect to={{
          pathname: "/login",
          state: { returnUrl: url }
        }} />
    }

    if (newCourseId) {
        return <Redirect to={{
          pathname: "/courses/" + newCourseId,
        }} />
    }


    return (
        <Grid container style={{ marginTop: 20 }} row>
            <Grid xs={3} />
            <Grid container xs={6} style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Typography variant="h5" color="primary"
                    style={{ textAlign: 'center', width: '100%', fontWeight: 'bold' }}>
                    Create Course
                        </Typography>
                <Grid container xs={12} style={{ marginTop: 20 }}>
                    <Grid container xs={12} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Grid xs={2}>
                            <Typography variant="h6"
                                style={{ color: 'grey', fontWeight: 'bold' }}>
                                Name:
                                    </Typography>
                        </Grid>

                        <Grid xs={9} >
                            <TextField
                                id="filled-full-width"
                                style={{ marginTop: 8, marginBottom: 8, width: 350 }}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={name}
                                onChange={handleNameChanged}

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
                            <Typography variant="h6"
                                style={{ color: 'grey', fontWeight: 'bold' }}>
                                Category:
                                    </Typography>
                        </Grid>

                        <Grid xs={9} >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                style={{ width: 200 }}
                                value={categoryId}
                                onChange={handleCategoryIdChanged}
                            >
                                {/*<MenuItem value={1}>Web Development</MenuItem>
                                <MenuItem value={2}>Mobile Development</MenuItem>*/}
                                {
                                    categoryList.map(function(cat){
                                        return <MenuItem value={cat.id} key={cat.id}>{cat.name}</MenuItem>
                                    })
                                }
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
                            <Typography variant="h6"
                                style={{ color: 'grey', fontWeight: 'bold' }}>
                                Price:
                                    </Typography>
                        </Grid>

                        <Grid xs={9} >
                            <Input
                                id="standard-adornment-amount"
                                endAdornment={<InputAdornment position="end">$</InputAdornment>}
                                value={price}
                                onChange={handlePriceChanged}
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
                            <Typography variant="h6"
                                style={{ color: 'grey', fontWeight: 'bold' }}>
                                Sale off:
                                    </Typography>
                        </Grid>

                        <Grid xs={9} >
                            <Input
                                id="standard-adornment-amount"
                                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                value={saleOffPercent}
                                onChange={handleSaleOffPercentChanged}
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
                            <Typography variant="h6"
                                style={{ color: 'grey', fontWeight: 'bold' }}>
                                Course's Avatar:
                                    </Typography>
                        </Grid>

                        <Grid xs={9} >
                            <ImageUpload cardName="Input Image" onFile={handleFile} />
                        </Grid>
                    </Grid>



                    <Grid container xs={12} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 20
                    }}>
                        <Grid xs={3}>
                            <Typography variant="h6"
                                style={{ color: 'grey', fontWeight: 'bold' }}>
                                Short Description:
                                    </Typography>
                        </Grid>

                        <Grid xs={9} >
                            <TextField
                                id="filled-full-width"
                                style={{ marginTop: 8, marginBottom: 8, width: 350 }}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={shortDescription}
                                onChange={handleShortDescriptionChanged}

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
                            <Typography variant="h6"
                                style={{ color: 'grey', fontWeight: 'bold' }}>
                                Description:
                                    </Typography>
                        </Grid>

                        <Grid xs={9} maxWidth={500} maxHeigth={300}>
                            <Editor

                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                editorStyle={{ maxHeight: 300, height: 300, backgroundColor: '#fff' }}
                                // editorState={longDescription}
                                onEditorStateChange={handleEditorChanged}
                            />
                        </Grid>
                    </Grid>

                    <Grid container xs={12} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 20
                    }}>
                        <Grid xs={3}>
                            <Typography variant="h6"
                                style={{ color: 'grey', fontWeight: 'bold' }}>
                                Is Completed:
                                    </Typography>
                        </Grid>

                        <Grid xs={9} >
                            <Checkbox
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                value={isCompleted}
                                onChange={handleIsCompletedChanged}
                            />
                        </Grid>
                    </Grid>

                    <Grid container xs={12} style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 40
                    }}>
                        <Button color="primary" variant="contained"
                        onClick={handleCreateClicked}>
                            Create
                            </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={3} />
        </Grid>
    );



}


export default AddCourse;