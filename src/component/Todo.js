import '../App.css';
import React, { useState, useEffect } from "react";
import {
  Card,
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

let newArr = JSON.parse(localStorage.getItem("data"));
let arr = [];

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [obj, setObj] = useState({
    id: newArr.length,
    activity: todo,
    lineThrough: false,
  });
  const [update, setUpdate] = useState(false);
  const [editFlag, setEditFlag] = useState();
  const [deleteFlag, setDeleteFlag] = useState();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].lineThrough === true) {
        document.getElementById(newArr[i].id).style.textDecoration =
          "line-through";
      }
    }
  }, []);
  
  const handleAdd = () => {
    if (update === false && todo !== "") {
      arr = newArr;
      arr.push(obj);
      localStorage.setItem("data", JSON.stringify(arr));
      newArr = arr;
      setObj({ ...obj, id: obj.id + 1 });
      setTodo("");
    } else if(todo !== "") {
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i].id === editFlag ) {
          newArr[i].activity = todo;
          localStorage.setItem("data", JSON.stringify(newArr));
          setTodo("");
        }
      }

      setUpdate(false);
    }
  };
  const handleDelete = (act) => {
    setOpen(true);
    setDeleteFlag(act);
  };
  const handleEdit = (act) => {
    setTodo(act.activity);
    setEditFlag(act.id);
    setUpdate(true);
  };
  const handleDeleteYes = () => {
    document.getElementById(deleteFlag.id).innerHTML = "";
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].id === deleteFlag.id) {
        newArr.splice(i, 1);
        localStorage.setItem("data", JSON.stringify(newArr));
      }
    }
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAcitivity = (act) => {
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].id === act.id) {
        if (newArr[i].lineThrough === true) {
          document.getElementById(act.id).style.textDecoration = "none";
          newArr[i].lineThrough = false;
          localStorage.setItem("data", JSON.stringify(newArr));
        } else {
          newArr[i].lineThrough = true;
          document.getElementById(act.id).style.textDecoration = "line-through";
          localStorage.setItem("data", JSON.stringify(newArr));
        }
      }
    }
  };
  const clearAll = () => {
    localStorage.setItem("data", JSON.stringify([]));
    window.location.reload();
  }
  return (
    <Box ml={20} mr={20} mt={5}>
      <Card>
        <Typography sx={{ backgroundColor: "black", color: "white" }} p={5}>
          Todo App
        </Typography>
        <Box mx={5} my={3}>
          <Card sx={{ display: "flex", padding: "24px" }}>
            <Box id="todo_textfield" mr={2}>
              <TextField
                id="activities"
                label="Todo"
                variant="outlined"
                size="small"
                value={todo}
                onChange={(e) => {
                  setTodo(e.target.value);
                  setObj({ ...obj, activity: e.target.value });
                }}
                fullWidth
              />
            </Box>
            <Button variant="contained" onClick={handleAdd} style={{marginRight: "16px"}}>
              {update === false ? "+" : "Update"}
            </Button>
            <Button variant="contained" onClick={clearAll}>
              Clear All
            </Button>
          </Card>
        </Box>
        {(JSON.parse(localStorage.getItem("data")).length !== 0) ?
        <Box mx={5} my={3}>
          <Card>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell id="table_header" width="60%">Acivities</TableCell>
                  <TableCell id="table_header">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newArr.map((act) => {
                  return (
                    <TableRow key={act.id} id={act.id}>
                      <TableCell
                        width="50%"
                        onClick={() => handleAcitivity(act)}
                      >
                        {act.activity}
                      </TableCell>
                      <TableCell sx={{ display: "flex" }}>
                        <Box>
                          <Button
                            variant="contained"
                            color="info"
                            startIcon={<EditIcon />}
                            onClick={() => handleEdit(act)}
                            sx={{ marginRight: "10px" }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="warning"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(act)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </Box> : <Box mb={2} sx = {{opacity: 0.5, color: "red", fontWeight: 600}}>No Data Found!</Box>} 

      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Alert</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id="update" onClick={handleDeleteYes} autoFocus>
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Todo;
