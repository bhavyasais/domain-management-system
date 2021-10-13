import React from "react";
import ButtonAtom from "../../atoms/Button/ButtonAtom";
import { DialogTemplate } from "../../templates/DialogTemplate/CollabCardsDialogTemplate";

export default function CollabModal(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOnClick=()=>{
    props.onClick();
  }
  return (
    <div>
      <ButtonAtom
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        value="Enable Access"
      />
      <DialogTemplate handleClose={handleClose} open={open} onClick={handleOnClick}/>
    </div>
  );
}
