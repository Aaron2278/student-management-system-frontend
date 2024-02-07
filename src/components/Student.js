import { Box, TextField } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { Container, Paper } from '@mui/material';
import Button from '@mui/material/Button';

export default function Student() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [addName, setAddName] = useState('');
  const [addAddress, setAddAddress] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateAddress, setUpdateAddress] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleAddClick = (e) => {
    e.preventDefault();
    const student = { name: addName, address: addAddress };
    console.log(student);
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("New student added");
      fetch("http://localhost:8080/student/getAll")
        .then(res => res.json())
        .then((result) => {
          setStudents(result);
          setAddName('');
          setAddAddress('');
        });
    });
  };

  const handleUpdateClick = () => {
    const updatedStudent = { name: updateName, address: updateAddress };
    fetch(`http://localhost:8080/student/update/${selectedStudentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudent),
    }).then(() => {
      console.log("Student updated");
      fetch("http://localhost:8080/student/getAll")
        .then(res => res.json())
        .then((result) => {
          setStudents(result);
          setUpdateName('');
          setUpdateAddress('');
          setSelectedStudentId(null);
        });
    });
  };

  const handleUpdate = (id) => {
    setSelectedStudentId(id);
    fetch(`http://localhost:8080/student/${id}`)
      .then(res => res.json())
      .then(result => {
        setUpdateName(result.name);
        setUpdateAddress(result.address);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/student/delete/${id}`, {
      method: "DELETE",
    }).then(() => {
      console.log("Student deleted");
      fetch("http://localhost:8080/student/getAll")
        .then(res => res.json())
        .then((result) => {
          setStudents(result);
        });
    });
  };

  const handleSearchClick = () => {
    // Fetch the search result from the backend
    fetch(`http://localhost:8080/student/search?name=${searchName}`)
      .then(res => res.json())
      .then(result => {
        setSearchResult(result.message);
        if (result.student) {
          
          console.log("Student found:", result.student);
        } else {
          console.log("Student not found");
        }
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then(res => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}><u>Add Student</u></h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
            value={addName}
            onChange={(e) => setAddName(e.target.value)}
          />
          <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
            value={addAddress}
            onChange={(e) => setAddAddress(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={handleAddClick}>
            Add Student
          </Button>
        </Box> 
      </Paper>

      {selectedStudentId && (
        <Paper elevation={3} style={paperStyle}>
          <h1 style={{ color: "blue" }}><u>Update Student</u></h1>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
            />
            <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
              value={updateAddress}
              onChange={(e) => setUpdateAddress(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleUpdateClick}>
              Update Student
            </Button>
          </Box> 
        </Paper>
      )}

      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}><u>Search Student</u></h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Student Name for Search"
            variant="outlined"
            fullWidth
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearchClick}>
            Search Student
          </Button>
          <p>{searchResult}</p>
        </Box>
      </Paper>

      <h1>Students</h1>
      <Paper elevation={3} style={paperStyle}>
        {students.map(student => (
          <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "" }} key={student.id}>
            Id:{student.id}<br/>
            Name:{student.name}<br/>
            Address:{student.address}<br/>
            <Button variant="contained" color="primary" onClick={() => handleUpdate(student.id)}>
              Update
            </Button>
            <Button variant="contained" color="error" onClick={() => handleDelete(student.id)}>
              Delete
            </Button>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
