import React from 'react';
import SideNavigationBar from '../../components/molecules/SideNavigationBar/SideNavigationBar';
import Topbar from '../../components/organisms/Topbar/Topbar';
import AppBanner from '../../components/molecules/AppBanner/AppBanner';
import { makeStyles } from '@material-ui/core/styles';
import LandingPageTemplate from '../../components/templates/LandingPageTemplate/LandingPageTemplate';
import {useDispatch } from 'react-redux';
import { updateUser } from '../../redux/actions/userActions';
const useStyles = makeStyles(() => ({
  root: {
    marginTop: '229px',
  },
  topmargin: {
    marginTop: '-10px',
    fontSize: '30px',
    color: '#666666',
  },
  buttonmargin: {
    marginTop: '10px',
    width: '206px',
    height: '44px',
    backgroundColor: '#1d4cd7',
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
  alignCenter: {
    maxHeight: '310px',
    maxWidth: '300px',
  },
}));

export default function LandingPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch(); //updating user details from redux store
  React.useEffect(() => {
    dispatch(updateUser({ userName: 'Bhavya' }));
  }, []);
  const options = {
    sidebar: <SideNavigationBar />,
    topbar: <Topbar label="Centralized  Communication Command Center" />,
    banner: <AppBanner height={300} width={310} childClasses={classes} />,
  };
  return <LandingPageTemplate childComponents={options} />;
}
