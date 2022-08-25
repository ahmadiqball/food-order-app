import classes from "./CartItem.module.css";
import React from 'react';


const CartItem = (props) => {
  const price = `$${props.price}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <h3 className={classes.price}>{price}</h3>
          <div className={classes.amount}>x {props.amount}</div>
        </div>
      </div>
      <div className={classes.actions}> 
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;