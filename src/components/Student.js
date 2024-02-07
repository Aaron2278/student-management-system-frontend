import { Box, TextField } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { Container, Paper } from '@mui/material';
import Button from '@mui/material/Button';

export default function Student() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const handleAddClick = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("New student added");
      // Fetch the updated student list after addition
      fetch("http://localhost:8080/student/getAll")
        .then(res => res.json())
        .then((result) => {
          setStudents(result);
          setName('');
          setAddress('');
        });
    });
  };

  const handleUpdateClick = () => {
    const updatedStudent = { name, address };
    fetch(`http://localhost:8080/student/update/${selectedStudentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudent),
    }).then(() => {
      console.log("Student updated");
      // Fetch the updated student list after update
      fetch("http://localhost:8080/student/getAll")
        .then(res => res.json())
        .then((result) => {
          setStudents(result);
          setName('');
          setAddress('');
          setSelectedStudentId(null);
        });
    });
  };

  const handleUpdate = (id) => {
    setSelectedStudentId(id);
    // Fetch the existing student details and populate the form
    fetch(`http://localhost:8080/student/${id}`)
      .then(res => res.json())
      .then(result => {
        setName(result.name);
        setAddress(result.address);
      });
  };

  const handleDelete = (id) => {
    // Delete the student
    fetch(`http://localhost:8080/student/delete/${id}`, {
      method: "DELETE",
    }).then(() => {
      console.log("Student deleted");
      // Fetch the updated student list after deletion
      fetch("http://localhost:8080/student/getAll")
        .then(res => res.json())
        .then((result) => {
          setStudents(result);
        });
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleUpdateClick}>
              Update Student
            </Button>
          </Box> 
        </Paper>
      )}

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
