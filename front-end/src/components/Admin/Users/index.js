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

import myRequest from "../../../helpers/myRequest";
import myConfig from '../../../helpers/myConfig';
import myModel from '../../../helpers/myModel';
import store from '../../../redux/store'
import {
  Redirect,
  useRouteMatch,
  useParams,
  Link
} from 'react-router-dom';

//WIP 
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'fullname', headerName: 'Fullname', width: 130 },
    {
        field: 'role',
        headerName: 'Role',
        width: 160,
        valueFormatter: (params) => {
            if (params.value == 0) {
                return 'ADMIN';
            } else if (params.value == 1) {
                return 'TEACHER'
            } else {
                return 'STUDENT'
            }
        },
    },
    {
        field: 'banned',
        headerName: 'Status',
        width: 100
    },
];

// const rows = [
//     { id: 1, email: "123@gmail.com", fullname: "abc", role: "STUDENT", banned: 'true' },
//     { id: 2, email: "123@gmail.com", fullname: "abc", role: "STUDENT", banned: 'true' },
// ];

export default function DataTable(props) {

      let { type } = useParams();
      let inputTypeValue = 2 // student
      if(type == 'teacher'){
          inputTypeValue = 1
      }

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const [accounts, setAccounts] = useState([])
    const [targetUser, setTargetUser] = useState({})

    useEffect(() => {
        document.title = "Users"

        myRequest({
                method: 'get',
                url: `${myConfig.apiServerAddress}/api/accounts`,
                params: {
                    filter: `{"where": {"type": ${inputTypeValue}}}`
                }
            },
            function ok(response) {

                setAccounts(response.data)
            },
            function fail(error) {
                console.log('admin:users: fail to get users')
            }
        )

    }, [type]);

    const [open, setOpen] = useState(false)
    const [roleValue, setRoleValue] = useState(2)
    const banValue = 'banned'

    function handleRowClicked(rowParams) {
        
        console.log(rowParams.row)
        
        // not allow to edit admin
        if(rowParams.row.type == 0) return; 

        setOpen(true)
        setTargetUser({ ...rowParams.row })
        setRoleValue(rowParams.row.type)
    }

    function handleClose() {
        setOpen(false)
    }

    function handleSave() {

        console.log(' role value: ', roleValue)
        myRequest({
                method: 'patch',
                url: `${myConfig.apiServerAddress}/api/accounts/${targetUser.id}`,
                data: {
                    type: roleValue
                },
                headers: {
                    'x-access-token': localStorage.getItem('accessToken')
                }
            },
            function ok(response) {

                accounts.forEach(function(acc){
                  if(acc.id == targetUser.id){
                    acc.type = roleValue
                  }
                })
                setAccounts([...accounts])
                setOpen(false)

            },
            function fail(error) {
                console.log('admin:users: fail to set role')
            }
        )
    }

    function handleRoleChanged(event) {
        setRoleValue(event.target.value)
    }

    function handleBan(event){

        let myVal = banValue
        if(targetUser.activeCode == banValue){
          myVal = ''
        }


        myRequest({
                method: 'patch',
                url: `${myConfig.apiServerAddress}/api/accounts/${targetUser.id}`,
                data: {
                    activeCode: myVal
                },
                headers: {
                    'x-access-token': localStorage.getItem('accessToken')
                }
            },
            function ok(response) {

                accounts.forEach(function(acc){
                  if(acc.id == targetUser.id){
                    acc.activeCode = myVal
                  }
                })
                setAccounts([...accounts])
                setOpen(false)

            },
            function fail(error) {
                console.log('admin:users: fail to ban user')
            }
        )
    }

    function handleAddTeacherClicked(){

    }

    // render
    let accountRows = accounts.map(function(account) {

        let status = 'inactive'
        if (account.activeCode == '') {
            status = 'activated'
        } else if (account.activeCode == 'banned') {
            status = 'banned'
        }


        return {
            id: account.id,
            email: account.email,
            fullname: account.name,
            role: account.type,
            banned: status,
            description: account.description,
            type: account.type,
            activeCode: account.activeCode

        }
    })

    return (
        <div>
        <div style={{ height: 400, width: '100%' }}>
      {/*<DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />*/}
      <DataGrid rows={accountRows} columns={columns} pageSize={5} onRowClick={handleRowClicked}/>

      <Dialog open={open} onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Account Information</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="accountId"
            label="id"
            type="text"
            fullWidth
            value={targetUser ? targetUser.id : ''}
            onChange={() => { }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="accountEmail"
            label="email"
            type="text"
            fullWidth
            value={targetUser ? targetUser.email : ''}
            onChange={() => { }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="accountName"
            label="name"
            type="text"
            fullWidth
            value={targetUser ? targetUser.fullname : ''}
            onChange={() => { }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="accountDescription"
            label="description"
            type="text"
            fullWidth
            value={targetUser ? targetUser.description : ''}
            onChange={() => { }}
          />

          {/*<RadioGroup aria-label="gender" name="gender1" value={`${roleValue}`} onChange={handleRoleChanged}>
            <FormControlLabel value="0" control={<Radio />} label="admin" />
            <FormControlLabel value="1" control={<Radio />} label="teacher" />
            <FormControlLabel value="2" control={<Radio />} label="student" />
          </RadioGroup>*/}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
          <Button onClick={handleBan} color="secondary">
            {targetUser.activeCode == banValue ? 'Unban': 'Ban'}
          </Button>
        </DialogActions>
      </Dialog>



    </div>
          {
          type == 'teacher'?
          (
             <Link to="/signup">
               <Button variant="contained" onClick={handleAddTeacherClicked}>Add teacher</Button>
               </Link>
          ): ''
      }
    </div>
    );
}