import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ButtonAtom from '../../atoms/Button/ButtonAtom';
import { Typography } from '@material-ui/core';

export default function AddNewTabTemplate(props) {
  const handleAddClick = () => {
    props.onAddClick(tabName);
    props.handleClose();
  };

  const [tabName, setTabName] = useState('');
  const handleTabChange = (e) => {
    setTabName(e.target.value);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <Typography variant="h6">Add New Tab</Typography>
        <DialogContent>
          <form>
            <div>
              <TextField
                id="outlined-basic"
                label="Tab Name"
                variant="outlined"
                onChange={handleTabChange}
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
