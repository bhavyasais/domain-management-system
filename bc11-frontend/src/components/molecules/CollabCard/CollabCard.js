import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import ButtonAtom from "../../atoms/Button/ButtonAtom";
import Typography from "@material-ui/core/Typography";
import "./CollabCard.css";
import icon from "../../../assets/atoms_icon_excel.svg";

const useStyles = makeStyles({
  root: {
    maxWidth: "194px",
    height: "200px",
  },
  media: {
    height: "60px",
    width: "62px",
    padding: "35px 66px 92px 66px",
  },
  media1: {
    height: "18px",
    width: "20px",
    transform: "translate(165px, 8px)",
  },
  action: {
    objectFit: "inherit",
    backgroundColor: "#e8ecef",
    borderRadius: "4px",
    height: "148px",
  },
  button: {
    height: "52px",
  },
  addb: {
    width: "78px",
    height: "32px",
    backgroundColor: "#1d4cd7",
    color: "#ffffff",
    margin: "-8px 10px 8px 4px",
  },
  preview: {
    width: "86px",
    height: "32px",
    backgroundColor: "#ffffff",
    color: "#949494",
    margin: "-8px 2px 8px -10px",
  },
  CardHoverContent: {
    color: "#ffffff",
    position: "absolute",
    bottom: "0px",
    left: "12px",
    fontSize: "18px",
  },
  CardContent: {
    color: "#1c1c21",
    fontSize: "16px",
    bottom: "16px",
    transform: "translate(5%, 35%)",
  },
});

export default function CollabCard(props) {
  const classes = useStyles();
  const [showContent, setShowContent] = useState(true);
  const [showCardContent, setShowCardContent] = useState(false);

  const handleMouseEnter = () => {
    setShowContent(false);
    setShowCardContent(true);
  };
  const handleMouseLeave = () => {
    setShowContent(true);
    setShowCardContent(false);
  };
  const handleOnClick = () => {
    props.onClick();
  };
  const style = showCardContent
    ? { backgroundColor: "#666666", opacity: 0.8, borderRadius: "4px" }
    : {};
  const media_style = showCardContent ? { opacity: 0.2 } : {};
  return (
    <Card
      className={classes.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      children={props.children}
    >
      <CardActionArea className={classes.action} style={style}>
        {showCardContent && (
          <Typography
            gutterBottom
            variant="h5"
            color="textSecondary"
            component="h2"
            size="16px"
            className={classes.CardHoverContent}
          >
            {props.name}
          </Typography>
        )}
        <CardMedia
          style={media_style}
          className={classes.media1}
          component={props.component}
          image={icon}
          title={props.title}
        />

        <CardMedia
          style={media_style}
          className={classes.media}
          component={props.component}
          image={props.image}
          title={props.title}
        />
      </CardActionArea>

      {showContent && (
        <CardActions>
          <Typography
            gutterBottom
            variant="h5"
            color="textSecondary"
            component="h2"
            size="16px"
            className={classes.CardContent}
          >
            {props.name}
          </Typography>
        </CardActions>
      )}

      {showCardContent && (
        <CardActions className={classes.button}>
          <ButtonAtom
            className={classes.addb}
            variant="contained"
            value="Add"
            textVariant="caption"
            onClick={handleOnClick}
          />

          <ButtonAtom
            className={classes.preview}
            variant="outlined"
            value="Preview"
            textVariant="caption"
          />
        </CardActions>
      )}
    </Card>
  );
}
