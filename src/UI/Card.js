import classCard from "./Card.module.css";

const Card = (props) => {
  const classes = classCard.card + ' ' + props.className;

  return <div className={classes}>{props.children}</div>;
};

export default Card;