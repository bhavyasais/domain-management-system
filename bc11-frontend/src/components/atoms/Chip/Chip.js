import React from "react";
import MuiChip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";

const styles = (theme) => ({
  chip: {
    maxWidth: "150px",
    fontFamily: "Roboto",
  },
});

const Chip = ({
  label,
  backgroundColor,
  color,
  size,
  chipStyle,
  variant,
  classes,
  ...restProps
}) => {
  return (
    <MuiChip
      label={label}
      style={{ backgroundColor: backgroundColor, color: color }}
      size={size}
      className={clsx(classes.chip, chipStyle)}
      variant={variant}
      {...restProps}
    />
  );
};

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
  backgroundColor: PropTypes.string,
};
Chip.defaultProps = {
  backgroundColor: "#eeeeee",
  color: "#1c1c21",
  size: "small",
  chipStyle: null,
  variant: "default",
};

export default withStyles(styles)(Chip);
