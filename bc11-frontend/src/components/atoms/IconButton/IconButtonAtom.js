import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from "prop-types";

export default function IconButtonAtom({
  icon,
  color,
  ...restProps 
}) {
  return (
    <div>
      <IconButton color={color} children={icon} {...restProps} />
    </div>
  );
}
IconButton.propTypes = {
  color: PropTypes.string,
  children:PropTypes.element,
};
