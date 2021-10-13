import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ButtonAtom from "../../atoms/Button/ButtonAtom";
import { Typography } from "@material-ui/core";

export default function AddNewRowTemplateTG(props) {

    const handleAddClick = () => {
        props.onAddClick({name,trust_score,relationship});
        props.handleClose();
    }

   
    const [name,setDomain]= useState('');
    const [trust_score,setTrustScore]= useState('');
    const [relationship,setRelationship]= useState('');

    
    const handleDomainChange = (e) => {
        setDomain(e.target.value);
    }

    const handleTrustScoreChange = (e) => {
        setTrustScore(e.target.value);
    }

    const handleRelationshipChange = (e) => {
      setRelationship(e.target.value);
    }


  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"><Typography variant="h6">Add New Row</Typography></DialogTitle>
        <DialogContent>
          <form>
          
            <div>
              {" "}
              <TextField
                id="outlined-basic"
                label="Domain"
                variant="outlined"
                onChange={handleDomainChange}
              />
            </div>
            <div>
              {" "}
              <TextField
                id="outlined-basic"
                label="Trust Score"
                variant="outlined"
                onChange={handleTrustScoreChange}
              />
            </div>
            <div>
              {" "}
              <TextField
                id="outlined-basic"
                label="Relationship"
                variant="outlined"
                onChange={handleRelationshipChange}
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