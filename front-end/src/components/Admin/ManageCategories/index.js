import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import myRequest from "../../../helpers/myRequest";
import myConfig from '../../../helpers/myConfig';
import myModel from '../../../helpers/myModel';
import store from '../../../redux/store'
import MyDialog from '../../MyDialog/index.js'

//WIP 
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'topic', headerName: 'Topic', width: 260 },
    { field: 'name', headerName: 'Name', width: 260 },
    {
        field: 'numCourse',
        headerName: 'Number of courses',
        width: 200
    },
];


export default function ManageCategories() {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const [categories, setCategories] = useState([])
    const [targetCategory, setTargetCategory] = useState({})
    const [topicList, setTopicList] = useState([])

        const [dialogType, setDialogType] = useState('close')
    const [dialogMessage, setDialogMessage] = useState('')
    function handleMyDialogClose() {
        setDialogType('close')
    }

    useEffect(() => {
        document.title = "Categories"

        myRequest({
                method: 'get',
                url: `${myConfig.apiServerAddress}/api/categories`,
                params: {
                    filter: `{"include": "courses"}`
                }
            },
            function ok(response) {

                setCategories(response.data)
            },
            function fail(error) {
                console.log('admin:users: fail to get categories')
            }
        )

    }, []);

    const [open, setOpen] = useState(false)

    function handleRowClicked(rowParams) {

        console.log(rowParams.row)

        setOpen(true)
        setTargetCategory({ ...rowParams.row })
    }

    function handleClose() {
        setOpen(false)
    }

    function handleSave() {

        // validate
        if (!targetCategory.topic || targetCategory.topic == '') {
            setDialogMessage("topic cannot be empty")
            setDialogType('error')
            return;
        }
        if (!targetCategory.name || targetCategory.name == '') {
            setDialogMessage("category name cannot be empty")
            setDialogType('error')
            return;
        }

        myRequest({
                method: 'patch',
                url: `${myConfig.apiServerAddress}/api/categories/${targetCategory.id}`,
                data: {
                    topic: targetCategory.topic,
                    name: targetCategory.name
                },
                headers: {
                    'x-access-token': localStorage.getItem('accessToken')
                }
            },
            function ok(response) {

                categories.forEach(function(cat) {
                    if (cat.id == targetCategory.id) {
                        cat.topic = targetCategory.topic
                        cat.name = targetCategory.name
                    }
                })
                setCategories([...categories])
                setOpen(false)

            },
            function fail(error) {
                console.log('admin:users: fail to update category')
            }
        )
    }

    function handleDelete(event){

        if(targetCategory.numCourse > 0){
            alert('only allow to delete category with 0 course')
            return;
        }

        myRequest({
                method: 'delete',
                url: `${myConfig.apiServerAddress}/api/categories/${targetCategory.id}`,
                headers: {
                    'x-access-token': localStorage.getItem('accessToken')
                }
            },
            function ok(response) {

                let newCategories = []
                categories.forEach(function(cat){
                    if(cat.id != targetCategory.id){
                        newCategories.push(cat)
                    }
                })
                setCategories(newCategories)
                setOpen(false)

            },
            function fail(error) {
                console.log('admin:users: fail to delete category')
            }
        )
    }


    const [openAddDialog, setOpenAddDialog] = useState(false)
    function handleAddClicked(){
        setOpenAddDialog(true)
        setTargetCategory({
            topic: '',
            name: '',
        })

        let topics = []
        categories.forEach(function(cat) {
            if (topics.length == 0 ||
                topics[topics.length - 1] != cat.topic) {
                topics.push(cat.topic)
            }
        })
        setTopicList(topics)
        console.log('topic list: ', topicList)
    }
    function handleAddDialogClose(){
        setOpenAddDialog(false)
    }
    function handleAdd(){

                // validate
        if (!targetCategory.topic || targetCategory.topic == '') {
            setDialogMessage("topic cannot be empty")
            setDialogType('error')
            return;
        }
        if (!targetCategory.name || targetCategory.name == '') {
            setDialogMessage("category name cannot be empty")
            setDialogType('error')
            return;
        }

        myRequest({
                method: 'post',
                url: `${myConfig.apiServerAddress}/api/categories`,
                data: {
                    topic: targetCategory.topic,
                    name: targetCategory.name
                },
                headers: {
                    'x-access-token': localStorage.getItem('accessToken')
                }
            },
            function ok(response) {

                categories.push(response.data)
                setCategories([...categories])
                setOpenAddDialog(false)

                setDialogMessage("Add category successfully!")
            setDialogType('success')

            },
            function fail(error) {
                console.log('admin:users: fail to add category')
                setDialogMessage("Fail to add category")
            setDialogType('error')
            }
        )
    }

    function handleSelectChanged(event){
        setTargetCategory({...targetCategory, topic: event.target.value})
    }

    function handleNameChanged(event){
        setTargetCategory({...targetCategory, name: event.target.value})
    }
    function handleTopicChanged(event){
        setTargetCategory({...targetCategory, topic: event.target.value})

    }

    let catRows = categories.map(function(cat) {


        return {
            id: cat.id,
            topic: cat.topic,
            name: cat.name,
            numCourse: cat.courses? cat.courses.length : 0
        }
    })

    return (
        <div>
        <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={catRows} columns={columns} pageSize={5} onRowClick={handleRowClicked}/>


      <Dialog open={open} onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Category Information</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="accountId"
            label="id"
            type="text"
            fullWidth
            value={targetCategory ? targetCategory.id : ''}
            onChange={() => { }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="accountEmail"
            label="topic"
            type="text"
            fullWidth
            value={targetCategory ? targetCategory.topic : ''}
            onChange={handleTopicChanged}
          />
          <TextField
            autoFocus
            margin="dense"
            id="accountName"
            label="name"
            type="text"
            fullWidth
            value={targetCategory ? targetCategory.name : ''}
            onChange={handleNameChanged}
          />
          <TextField
            autoFocus
            margin="dense"
            id="accountDescription"
            label="number of courses"
            type="text"
            fullWidth
            value={targetCategory ? targetCategory.numCourse : ''}
            onChange={() => { }}
          />

 

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openAddDialog} onClose={handleAddDialogClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New category</DialogTitle>
        <DialogContent>

                <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value=''
              onChange={handleSelectChanged}
            >    
                {
                    topicList.map(function(topic){
                        return <MenuItem value={topic}>{topic}</MenuItem>
                    })
                }

            </Select>

          <TextField
            autoFocus
            margin="dense"
            id="accountId"
            label="topic"
            type="text"
            fullWidth
            value={targetCategory ? targetCategory.topic : ''}
            onChange={handleTopicChanged}
          />
          <TextField
            autoFocus
            margin="dense"
            id="accountEmail"
            label="name"
            type="text"
            fullWidth
            value={targetCategory ? targetCategory.name : ''}
            onChange={handleNameChanged}
          />

         

          


        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>

        </DialogActions>
      </Dialog>

              <MyDialog type={dialogType} handleClose={handleMyDialogClose}
    message={dialogMessage}></MyDialog>


    </div>
          <Button variant="contained" onClick={handleAddClicked}>Add category</Button>
    </div>
    );
}