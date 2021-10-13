import {
  Button,
  ClickAwayListener,
  Grid,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import Avatar from '../../atoms/Avatar/AvatarAtom';
import IconButton from '../../atoms/IconButton/IconButtonAtom';
import IconWithBadge from '../../atoms/IconWithBadge/IconWithBadge';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import { useAuth0 } from '@auth0/auth0-react';
import Grow from '@material-ui/core/Grow';
const useStyles = makeStyles((theme) => ({
  container: {
    height: '63px',
    paddingLeft: '20px',
    paddingRight: '30px',
    borderBottom: '1px solid #eeeeee',
  },
  color: {
    color: '#666666',
  },
  marginRight: {
    marginRight: theme.spacing(0.5),
  },
  avatarSize: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    marginLeft: theme.spacing(1.5),
  },
}));

const Topbar = ({variant,label}) => {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const { logout } = useAuth0();
  const anchorRef = React.useRef(null);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className={classes.container}
    >
      <Grid item>
        <Typography variant={variant} className={classes.color}>
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <Grid item className={classes.marginRight}>
            <IconButton
              icon={
                <IconWithBadge color="secondary" variant="dot" icon={<TextsmsOutlinedIcon />} />
              }
            />
          </Grid>
          <Grid item>
            <IconButton
              icon={
                <IconWithBadge
                  color="secondary"
                  variant="dot"
                  overlap="circle"
                  icon={<NotificationsOutlinedIcon />}
                />
              }
            />
          </Grid>
          <Grid item>
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleClickOpen}
              disableFocusRipple
              disableRipple
              disableTouchRipple
              disableElevation
              variant={Text}
            >
              <Avatar
                src="https://cdn.zeplin.io/5fa102170abc4fbe7467eaa5/screens/438d5cb7-5113-4c26-9a9f-109b56acf94c.png"
                className={classes.avatarSize}
              />
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
                          Logout
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Topbar;
