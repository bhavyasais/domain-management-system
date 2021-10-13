import { Grid, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import BarGraph from '../../molecules/BarGraph/BarGraph';
import Dropdown from '../../molecules/Dropdown/Dropdown';
import clsx from 'clsx';
import { RELATIONSHIP_CARD_LEGEN_2, RELATIONSHIP_CARD_LEGEN_1 } from '../../../utils/Strings';

const styles = () => ({
  containerStyle: {
    border: 'solid 1px #eaedf3',
    margin: 0,
    width: '100%',
  },
  headerStyle: {
    borderBottom: '1px solid #eeeeee',
    width: '100%',
  },
  headerText: {
    margin: '12px 24px 12px 24px',
  },
  circle: {
    height: '8px',
    width: '8px',
    borderRadius: '50%',
    marginRight: '4px',
  },
  legendContainer: {
    paddingLeft: '24px',
  },
  dropDown: {
    marginRight: '36px',
  },
});

const RelationshipCard = ({ classes, header, children, containerStyle }) => {
  return (
    <Grid item container spacing={2} className={clsx(classes.containerStyle, containerStyle)}>
      {header && (
        <Grid item container className={classes.headerStyle} alignItems="center">
          <Typography variant="h6" className={classes.headerText}>
            {header}
          </Typography>
        </Grid>
      )}
      <Grid item container className={classes.legendContainer}>
        <Grid item container direction="row">
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            xs={7}
            style={{ padding: '24px 24px 12px 24px', color: '#949494' }}
          >
            <div className={classes.circle} style={{ backgroundColor: '#ff3162' }} />
            <Typography variant="body1" style={{ marginRight: '20px' }}>
              {RELATIONSHIP_CARD_LEGEN_1}
            </Typography>
            <div className={classes.circle} style={{ backgroundColor: '#ffab2b' }} />
            <Typography variant="body1">{RELATIONSHIP_CARD_LEGEN_2}</Typography>
          </Grid>
          <Grid item container direction="row" alignItems="center" xs={5} justify="flex-end">
            <Typography variant="body1" style={{ color: '#949494' }}>
              Showing for:
            </Typography>
            <Dropdown containerStyle={classes.dropDown} />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        item
        direction="row"
        spacing={4}
        xs={12}
        style={{ padding: '12px 24px 12px 24px', width: '100%' }}
      >
        {children?.map((item) => (
          <Grid item container xs={6}>
            {item}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

RelationshipCard.propTypes = {
  header: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
};
RelationshipCard.defaultProps = {
  header: null,
  children: null,
};

export default withStyles(styles)(RelationshipCard);
