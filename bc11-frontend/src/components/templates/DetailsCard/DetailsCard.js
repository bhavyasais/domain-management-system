import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { CardHeader, Divider, Grid, Typography, useTheme } from '@material-ui/core';
import IconAtom from '../../atoms/Icon/IconAtom';
import IconButtonAtom from '../../atoms/IconButton/IconButtonAtom';
import options from '../../atoms/shared/ListIcons';
import ButtonAtom from '../../atoms/Button/ButtonAtom';
import Dropdown from '../../molecules/Dropdown/Dropdown';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '450px',
    height: '726px',
  },
  threat: {
    height: '25px',
    paddingRight: '20px',
    paddingLeft: '30px',
  },
  source: {
    height: '25px',
    paddingLeft: '1px',
  },
  subject: {
    paddingTop: '20px',
    paddingRight: '20px',
    paddingLeft: '30px',
  },
  margin: {
    marginBottom: '5px',
    color: theme?.palette?.darkGrey?.main,
  },
  contentStyle: {
    color: theme?.palette?.black?.main,
  },
  details: {
    paddingTop: '20px',
    paddingLeft: '30px',
  },
  arrowIcon: {
    transform: 'translate(5px, 5px)',
  },
  dropDown: {
    transform: 'translate(-40px, 15px)',
  },
}));

const DetailsCard = ({ cardDetails, sourceDetailsHeader, threatDetailsHeader, selectedItem }) => {
  const [open, setOpen] = useState(true);

  const showSource = () => {
    setOpen(false);
  };
  const showThreat = () => {
    setOpen(true);
  };
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{ borderColor: theme?.palette?.grey?.main }}
    >
      {!open && (
        <CardHeader
          title={sourceDetailsHeader}
          avatar={
            <IconButtonAtom onClick={showThreat} className={classes.arrowIcon}>
              <IconAtom children={options.arrowBack} />
            </IconButtonAtom>
          }
          action={
            <IconButtonAtom>
              <IconAtom children={options.close} />
            </IconButtonAtom>
          }
          titleTypographyProps={{ variant: 'h4' }}
          className={classes.source}
        />
      )}
      {open && (
        <CardHeader
          title={threatDetailsHeader}
          action={
            <IconButtonAtom>
              <IconAtom children={options.close} />
            </IconButtonAtom>
          }
          titleTypographyProps={{ variant: 'h4' }}
          className={classes.threat}
        />
      )}
      <Divider variant="middle" light />
      <Grid container>
        <Grid container>
          <Grid
            item
            container
            direction="row"
            className={clsx(classes.margin, classes.subject)}
            justify="space-between"
          >
            <Typography variant="h6">{cardDetails.id}: Subject</Typography>
            {open && (
              <ButtonAtom
                textVariant="caption"
                variant="text"
                value="View Source"
                style={{ color: theme?.palette?.green?.main }}
                onClick={showSource}
              />
            )}
          </Grid>
          <Grid container spacing={3} className={classes.details}>
            <Grid item container direction="column">
              <Typography variant="button" className={classes.margin}>
                Domain
              </Typography>
              <Typography variant="body1" className={classes.contentStyle}>
                {cardDetails.Domain}
              </Typography>
            </Grid>

            <Grid item container direction="column">
              <Typography variant="button" className={classes.margin}>
                From
              </Typography>
              <Typography variant="body1" className={classes.contentStyle}>
                {cardDetails.From}
              </Typography>
            </Grid>
            <Grid item container direction="column">
              <Typography variant="button" className={classes.margin}>
                {open ? 'Description' : 'Email'}
              </Typography>
              <Typography
                variant="body1"
                className={classes.contentStyle}
                style={{ width: '378px' }}
              >
                {open ? cardDetails.description : cardDetails.emailDetails}
              </Typography>
            </Grid>
            {open && (
              <>
                <Grid item container direction="column">
                  <Typography variant="button" className={classes.margin}>
                    Treat type
                  </Typography>
                  <Typography variant="body1" className={classes.contentStyle}>
                    {cardDetails.threatType}
                  </Typography>
                </Grid>

                <Grid item container direction="column">
                  <Typography variant="button" className={classes.margin}>
                    Treat level
                  </Typography>
                  <Typography variant="body1" className={classes.contentStyle}>
                    {cardDetails.threatLevel}
                  </Typography>
                </Grid>

                <Grid item container direction="column">
                  <Typography variant="button" className={classes.margin}>
                    Trust score
                  </Typography>
                  <Typography variant="body1" className={classes.contentStyle}>
                    {cardDetails.trustScore}
                  </Typography>
                </Grid>

                <Grid item container direction="column">
                  <Typography variant="button" className={classes.margin}>
                    Source date time
                  </Typography>
                  <Typography variant="body1" className={classes.contentStyle}>
                    {cardDetails.time}
                  </Typography>
                </Grid>
              </>
            )}

            <Grid item container>
              <Typography variant="button" className={classes.margin}>
                Group
              </Typography>
              <Dropdown
                onChange={cardDetails.onChange}
                selectedItem={selectedItem}
                list={cardDetails.trustGroups}
                dropDownStyle={classes.dropDown}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
DetailsCard.propTypes = {
  cardDetails: PropTypes.shape({ value: PropTypes.string, name: PropTypes.string }).isRequired,
};
DetailsCard.defaultProps = {};

export default DetailsCard;
