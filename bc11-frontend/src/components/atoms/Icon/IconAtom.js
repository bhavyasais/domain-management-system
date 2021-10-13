import React from "react";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";

export default function IconAtom({
  icon,
  color,
  ...restProps 
}) {
  return (
    <div>
      <Icon
        children={icon}
        style={{ color: color }}
        {...restProps}
     />
    </div>
  );
}
Icon.propTypes = {
  color: PropTypes.string,
  children:PropTypes.element,
};
