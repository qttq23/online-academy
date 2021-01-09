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
import {
    Link,
} from 'react-router-dom';

//WIP 
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'categoryId', headerName: 'Category ID', width: 260 },
    { field: 'name', headerName: 'Name', width: 260 },
    {
        field: 'numStudent',
        headerName: 'Number of students',
        width: 200
    },
];


export default function ManageCourses() {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const [courses, setCourses] = useState([])
    const [targetCourse, setTargetCourse] = useState({})

    useEffect(() => {
        document.title = "Courses"

        myRequest({
                method: 'get',
                url: `${myConfig.apiServerAddress}/api/courses`,
                params: {
                    filter: `{"include": "registrations"}`
                }
            },
            function ok(response) {

                setCourses(response.data)
            },
            function fail(error) {
                console.log('admin:users: fail to get courses')
            }
        )

    }, []);

    const [open, setOpen] = useState(false)

    function handleRowClicked(rowParams) {

        console.log(rowParams.row)

        setOpen(true)
        setTargetCourse({ ...rowParams.row })
    }

    function handleClose() {
        setOpen(false)
    }



    function handleDelete(event){



        myRequest({
                method: 'delete',
                url: `${myConfig.apiServerAddress}/api/courses/${targetCourse.id}`,
                headers: {
                    'x-access-token': localStorage.getItem('accessToken')
                }
            },
            function ok(response) {

                let newCourses = []
                courses.forEach(function(course){
                    if(course.id != targetCourse.id){
                        newCourses.push(course)
                    }
                })
                setCourses(newCourses)
                setOpen(false)

            },
            function fail(error) {
                console.log('admin:users: fail to delete course')
            }
        )
    }


    let courseRows = courses.map(function(course) {


        return {
            id: course.id,
            categoryId: course.categoryId,
            name: course.name,
            numStudent: course.registrations? course.registrations.length : 0
        }
    })

    return (
   
        <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={courseRows} columns={columns} pageSize={5} onRowClick={handleRowClicked}/>


      <Dialog open={open} onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Course Information</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="accountId"
            label="id"
            type="text"
            fullWidth
            value={targetCourse ? targetCourse.id : ''}
            onChange={() => { }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="accountEmail"
            label="topic"
            type="text"
            fullWidth
            value={targetCourse ? targetCourse.categoryId : ''}
            onChange={()=>{}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="accountName"
            label="name"
            type="text"
            fullWidth
            value={targetCourse ? targetCourse.name : ''}
            onChange={()=>{}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="accountDescription"
            label="number of courses"
            type="text"
            fullWidth
            value={targetCourse ? targetCourse.numStudent : ''}
            onChange={() => { }}
          />

 

        </DialogContent>
        <DialogActions>

        <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

            <Link to={`/courses/${targetCourse.id}`}>
          <Button color="primary">
            View details
          </Button>
          </Link>

          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>


    


    </div>

    );
}