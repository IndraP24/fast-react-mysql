import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Box, Table, TableCell, TableContainer, TableBody, TableRow, TextField } from '@material-ui/core';
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})

  const fetchUsers = async () => {
    const response = await axios.get('http://127.0.0.1:8000/')
    return setUsers(response.data)
  }

  const fetchUser = async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/${id}`)
    return setUser(response.data)
  }
  //fetchUsers()
  const editUser = async () => {
    if (user.id) {
      await axios.put(`http://127.0.0.1:8000/${user.id}`, user)
    } else {
        await axios.post('http://127.0.0.1:8000/', user)
    }
    await fetchUsers()
    await setUser({id: 0, name: '', email: '', password: ''})
  }
  const deleteUser = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/${id}`)
    await fetchUsers()
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Box m={10}>
        <TableContainer>
        <TextField type='hidden' value={user.id} />
          <Table aria-label="simple table">
            <TableBody>
                <TableRow>
                  <TableCell>
                    <TextField id="standard-basic" label="Name" value={user.name} onChange={(e) => setUser({...user, name:e.target.value})} />
                  </TableCell>
                  <TableCell>
                    <TextField id="standard-basic" label="Email" value={user.email} onChange={(e) => setUser({...user, email:e.target.value})} />
                  </TableCell>
                  <TableCell>
                    <TextField id="standard-basic" label="Password" value={user.password} onChange={(e) => setUser({...user, password:e.target.value})} />
                  </TableCell>
                  <TableCell>
                      <Button variant="contained" color="primary" onClick={() => editUser()} >
                        Submit
                      </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
                {users.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.password}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => fetchUser(row.id)} >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={() => deleteUser(row.id)} >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default App;
