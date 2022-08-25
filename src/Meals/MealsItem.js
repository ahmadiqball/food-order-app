import { useContext } from "react";
import classes from "./MealsItem.module.css";
import MealItemForm from "./MealItemForm";
import AppContext from "../context/app-context";

const MealsItem = (props) => {
  const cartCtx = useContext(AppContext)

  const addToCart = (amount) => {
    cartCtx.addCartData({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount
    })
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={classes.description}>{props.desc}</p>
        <h4 className={classes.price}>${props.price.toFixed(2)}</h4>
      </div>
      <MealItemForm addToCart={addToCart}/>
    </li>
  );
};

export default MealsItem;
