import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";
const useStyles = makeStyles({
  buttonLabel: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

export default function ButtonAtom({
  value,
  variant,
  disabled,
  color,
  onClick,
  textColor,
  rootStyle,
  labelStyle,
  textVariant,
  maxWidth,
  ...restProps
}) {
  const classes = useStyles();
  return (
    <div>
      <Button
        variant={variant}
        disabled={disabled}
        style={{ backgroundColor: color, maxWidth: maxWidth }}
        onClick={onClick}
        classes={{
          root: rootStyle,
          label: clsx(labelStyle, classes.buttonLabel),
        }}
        {...restProps}
      >
        <Typography variant={textVariant} className={classes.buttonLabel}>
          {value}
        </Typography>
      </Button>
    </div>
  );
}
Button.propTypes = {
  value: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
};
Button.defaultProps = {
  variant: "contained",
};
