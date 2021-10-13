import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { PLACEHOLDER } from '../../../utils/Strings';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const TextFieldBox = withStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme?.palette?.lightGrey?.main,
      },
      '&:hover fieldset': {
        borderColor: theme?.palette?.lightGrey?.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme?.palette?.lightGrey?.main,
      },
    },
    width: '360px',
    height: '52px',
  },
}))(TextField);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    backgroundColor: theme?.palette?.white?.main,
  },
  labelProps: {
    width: '360px',
    height: '16px',
    fontSize: '14px',
    opacity: 0.6,
  },
}));
const TextInput = ({ value, onChange, inputStyle }) => {
  const classes = useStyles();
  return (
    <TextFieldBox
      className={clsx(classes.margin, inputStyle)}
      placeholder={PLACEHOLDER}
      variant="outlined"
      id="custom-css-outlined-input"
      inputProps={{ className: clsx(classes.labelProps) }}
      defaultValue={value}
      onChange={onChange}
    />
  );
};
TextInput.propTypes = {
  value: PropTypes.string,
};
TextInput.defaultProps = {
  value: { PLACEHOLDER },
};

export default TextInput;
