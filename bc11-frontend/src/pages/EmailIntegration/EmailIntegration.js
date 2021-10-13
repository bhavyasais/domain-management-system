import React, { useState } from 'react';
import SideNavigationBar from '../../components/molecules/SideNavigationBar/SideNavigationBar';
import Topbar from '../../components/organisms/Topbar/Topbar';
import { makeStyles } from '@material-ui/core/styles';
import email_banner from '../../assets/email_banner.png';
import { Grid, Typography, useTheme } from '@material-ui/core';
import TextInput from '../../components/atoms/TextInput/TextInput';
import ButtonAtom from '../../components/atoms/Button/ButtonAtom';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme?.palette?.grey?.main,
    padding: '183px 494px 375px 600px',
  },
  integrate: {
    padding: '59px 30.6px 10px 100px',
  },
  email: {
    padding: '5px 30.6px 10px 100px',
  },
  textInput: {
    marginLeft: '30px',
  },
  button: {
    marginTop: '20px',
    marginLeft: '110px',
  },
}));

export default function EmailIntegration() {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = useState('');
  const handleOnChange = (event) => {
    setState(event?.target?.value);
  };
  return (
    <Grid container>
      <Grid item>
        <SideNavigationBar />
      </Grid>
      <Grid item style={{ width: '95.5%' }}>
        <Grid item container direction="column">
          <Grid item>
            <Topbar label="Centralized  Communication Command Center" variant="h3" />
          </Grid>

          <Grid item container className={clsx(classes.root)} direction="column">
            <Grid item>
              <img src={email_banner} width="452.7px" height="252px" />
              <Typography variant="h6" className={classes.integrate}>
                Integrate your Email Id
              </Typography>
              <Typography
                className={classes.email}
                variant="body2"
                style={{
                  fontWeight: '300',
                  fontSize: '14px',
                  color: theme?.palette?.greyLight?.main,
                  width: '209px',
                  height: '21px',
                  lineHeight: '21px',
                }}
              >
                Enter your Email ID to get started
              </Typography>
              <TextInput inputStyle={classes.textInput} onChange={handleOnChange} value={state} />
              <ButtonAtom
                className={classes.button}
                value="Get Started"
                textVariant="caption"
                style={{
                  height: '44px',
                  width: '206px',
                  backgroundColor: theme?.palette?.green?.main,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
