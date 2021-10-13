import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ButtonAtom from "../../atoms/Button/ButtonAtom";
import deleteSelectedIcon from '../../../assets/delete.png';
import IconAtom from '../../atoms/Icon/IconAtom'
const useStyles = makeStyles(() => ({
    button: {
        width: "169px",
        height: "40px",
    },
}));

const DeleteButton = ({ deleteSelected }) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <ButtonAtom
            variant="contained"
            color={theme.palette.error.main}
            className={classes.button}
            startIcon={<IconAtom icon={<img src={deleteSelectedIcon} width="20" height="20"/>} />}
            value={"Delete selected("+`${deleteSelected}`+")"}
            textVariant="caption"
        />
    );
}
export default DeleteButton;