import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./CartButton.module.css";
import AppContext from "../context/app-context";

const CartButton = (props) => {
  const [isBump, setIsBump] = useState(false);
  const cartCtx = useContext(AppContext);
  const cartItemNum = cartCtx.cartData.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0)

  useEffect(() => {
    if (cartItemNum === 0) {
      return;
    }
    setIsBump(true);

    const bumpTimer = setTimeout(() => {
      setIsBump(false)
    }, 300);
    
    return () => clearTimeout(bumpTimer)
  }, [cartItemNum])

  return (
    <button className={`${classes.button} ${isBump ? classes.bump : ''} `} onClick={props.onClick}>
      <span>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemNum}</span>
    </button>
  );
};

export default CartButton;