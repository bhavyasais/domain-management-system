import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ButtonAtom from "../../atoms/Button/ButtonAtom";
import { Typography } from "@material-ui/core";

export default function AddNewDeptTemplate(props) {

    const handleAddClick = () => {
        props.onAddClick(department);
        props.handleClose();
    }

    const [department,setDepartment]= useState('');
    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
    }


  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"><Typography variant="h6">Add New Department</Typography></DialogTitle>
        <DialogContent>
          <form>
            <div>
              <TextField
                id="outlined-basic"
                label="Department"
                variant="outlined"
                onChange={handleDepartmentChange}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
        <ButtonAtom
          
          variant="outlined"
          value="Close"
          textVariant="caption"
          onClick={props.handleClose}
        />
        <ButtonAtom
            variant="contained"
            value="Add"
            textVariant="caption"
            onClick={handleAddClick}
          />
        
           
        </DialogActions>
      </Dialog>
    </div>
  );
}
