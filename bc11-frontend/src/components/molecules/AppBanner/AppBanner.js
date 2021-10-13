import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Image from "react-image-resizer";
import banner from "../../../assets/banner.svg";
import ButtonAtom from "../../atoms/Button/ButtonAtom";
import {DialogTemplate} from '../../templates/DialogTemplate/CollabCardsDialogTemplate';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {},
  topmargin: {
    marginTop: "30px",
    color: "grey",
  },
  buttonmargin: {
    marginTop: "10px",
  },
}));

export default function AppBanner(props) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOnClick=()=>{
    history.push("/base");
  }
  return (
    <div className={props && props.childClasses && props.childClasses.root ? props.childClasses.root : classes.root}>
      <div align="center">
        <Image
          src={banner}
          height={props && props.height ? props.height: 400}
          width={props && props.width ? props.width : 500}
          className={props && props.childClasses && props.childClasses.alignCenter ? props.childClasses.alignCenter : classes.alignCenter}
        />
      </div>
      <Typography variant="h5" align="center" className={props && props.childClasses && props.childClasses.topmargin ? props.childClasses.topmargin : classes.topmargin}>
        Your active permissions will appear here.
        <div>
          <ButtonAtom
            variant="contained"
            value="Enable Access"
            color="#1d4cd7"
            className={props && props.childClasses && props.childClasses.buttonmargin ? props.childClasses.buttonmargin : classes.buttonmargin}
            onClick={handleClickOpen}
          />
          <DialogTemplate handleClose={handleClose} open={open} onClick={handleOnClick}/>
        </div>
      </Typography>
    </div>
  );
}