import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import SideNavigationBar from "../../molecules/SideNavigationBar/SideNavigationBar";
import TopBar from "../../organisms/Topbar/Topbar";
import PropTypes from "prop-types";

const styles = () => ({});

const AccessPanel = ({ headerLabel, children ,headerVariant}) => {
  return (
    <Grid container direction="row">
      <Grid item>
        <SideNavigationBar />
      </Grid>
      <Grid item style={{ width: "90%" }}>
        <Grid container direction="column">
          <Grid item>
            <TopBar label={headerLabel} variant={headerVariant}/>
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
AccessPanel.propTypes = {
  headerLabel: PropTypes.string,
};
AccessPanel.defaultProps = {
  headerLabel: "Centralized  Communication Command Center",
};

export default withStyles(styles)(AccessPanel);
