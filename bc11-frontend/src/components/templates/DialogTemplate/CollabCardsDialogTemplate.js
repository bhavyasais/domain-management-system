/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButtonAtom from '../../atoms/Icon/IconAtom';
import IconAtom from '../../atoms/Icon/IconAtom';
import options from '../../atoms/shared/ListIcons';
import CollaboratorService from '../../../services/CollaboratorService';
import CollabCard from '../../molecules/CollabCard/CollabCard';
import GoogleSuiteService from '../../../services/GoogleSuiteService';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    minWidth: '926px',
    width: '926px',
    height: '544px',
  },
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButtonAtom aria-label="close" className={classes.closeButton} onClick={onClose}>
          <IconAtom children={options.close} />
        </IconButtonAtom>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export const DialogTemplate = ({ handleClose, open, onClick }) => {
  const [collaborations, setCollaborations] = useState([]);

  const handleGoogleSignIn = async (item) => {
    try {
      const GoogleAuth = await window.gapi.auth2.getAuthInstance();
      const result = await GoogleAuth.grantOfflineAccess();
      console.log('result after login', result.code);
      const params = new URLSearchParams();
      params.append('authCode', result?.code);
      await GoogleSuiteService.updateToken(params);
      localStorage.setItem('Collaboration', item.id);
      onClick(item);
    } catch (error) {
      console.warn('Error in gogle sign in', error);
    }
  };

  const handleOnClick = (item) => async () => {
    await handleGoogleSignIn(item);
  };
  const classes1 = useStyles();

  const fetchCollaborations = useCallback(async () => {
    try {
      const result = await CollaboratorService.getAllCollaborators();
      setCollaborations(result);
    } catch (error) {
      console.warn('error in fetching departments : ', error);
    }
  }, []);
  useEffect(() => {
    fetchCollaborations();
  }, []);

  return (
    <div className={classes1.root}>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Choose Collaboration Platforms
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={4}>
            {collaborations.map((item, idx) => (
              <Grid item key={idx}>
                <CollabCard
                  title={item.name}
                  image={item.imageURL}
                  component="img"
                  height={item.height}
                  name={item.name}
                  onClick={handleOnClick(item)}
                />
              </Grid>
            ))}
            ,
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};
