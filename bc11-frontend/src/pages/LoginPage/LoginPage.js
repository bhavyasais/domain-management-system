import React from 'react'
import { Typography, Grid, Paper, makeStyles,CircularProgress} from "@material-ui/core";
import Button from '../../components/atoms/Button/ButtonAtom'
import { useAuth0 } from "@auth0/auth0-react";
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        width: "500px",
        height: "300px",
        padding: "15px",
        border: '1px solid #dfe3eb',
        borderRadius: '37px',
      },
    },
  }));

function LoginPage(props){
 
    const {
        isAuthenticated,
        isLoading,
        loginWithRedirect,
        logout,
      } = useAuth0(); 

    const classes = useStyles();


    const logoutWithRedirect = () => {
        logout({
          returnTo: window.location.origin,
        });   
    } 

    return (
        <div style={{height: '98vh', width: '100%', backgroundColor: '#f8f8f9'}}>
        <Grid container alignItems="center" justify="center" style={{height: '100%', backgroundColor: 'none'}}>
            <Grid item>
            <div className={classes.root}>
                {isLoading ? <CircularProgress/>: <Paper>
                    <Grid container direction="column" alignItems="center" justify="center" style={{height: '100%', width: '100%', backgroundColor: 'none'}}>
                        {!isAuthenticated && <Grid item style={{backgroundColor: 'none', width: '100%'}}>
                            <Grid container justify="center" style={{backgroundColor: 'none', width: '100%', paddingBottom: '3%'}}>
                                <Grid item>
                                    <Typography variant="h3">
                                        Hi! Looks like you're not signed in. Would you like to sign in?
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>}
                        <Grid item style={{backgroundColor: 'none', width: '100%'}}>    
                            <Grid container justify="center" style={{backgroundColor: 'none', width: '100%'}}>
                                <Grid item>
                                    <Button
                                        id="signIn"
                                        variant="contained"
                                        color="primary"
                                        value={!isAuthenticated ? "Sign In" : "Log Out"}
                                        onClick={() => {!isAuthenticated ? loginWithRedirect() : logoutWithRedirect()}}
                                    />                                      
                                </Grid>
                            </Grid>                          
                        </Grid>
                    </Grid>

                </Paper>}
            </div>
            </Grid>
        </Grid>
        </div>
    )
}

export default LoginPage