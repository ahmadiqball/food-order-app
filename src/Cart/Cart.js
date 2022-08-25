import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import OrderForm from "./OrderForm";
import AppContext from "../context/app-context";

const Cart = (props) => {
  const cartCtx = useContext(AppContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isOrderSend, setIsOrderSend] = useState(false);

  const datas = cartCtx.cartData;
  const hasItems = cartCtx.cartData.length > 0;

  const addCartItem = (item) => {
    cartCtx.addCartData({ ...item, amount: 1 });
  };

  const removeCartItem = (id) => {
    cartCtx.removeCartData(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const orderingFood = async (orderData) => {
    setIsOrdering(true);
    const fetchData = {
      meals: datas,
      user: orderData,
    };

    await fetch(
      "https://reactmeals-debe8-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify(fetchData),
      }
    );
    setIsOrdering(false);
    setIsOrderSend(true);
  };

  return (
    <Modal>
      {isOrdering && <p>Sending Orders...</p>}
      {isOrderSend && <p>Your order have been received.</p>}
      {isCheckout && !isOrderSend && !isOrdering && (
        <OrderForm onCancel={props.closeCart} onOrder={orderingFood} />
      )}
      {!isCheckout && !isOrderSend && !isOrdering && (
        <React.Fragment>
          <ul className={classes["cart-items"]}>
            {datas.map((data) => (
              <CartItem
                key={data.id}
                amount={data.amount}
                price={data.price}
                name={data.name}
                onAdd={addCartItem.bind(null, data)}
                onRemove={removeCartItem.bind(null, data.id)}
              />
            ))}
          </ul>
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>${cartCtx.totalAmount.toFixed(2)}</span>
          </div>

          <div className={classes.actions}>
            <button
              className={classes["button--alt"]}
              onClick={props.closeCart}
            >
              Close
            </button>
            {hasItems && (
              <button className={classes.button} onClick={orderHandler}>
                Order
              </button>
            )}
          </div>
        </React.Fragment>
      )}
    </Modal>
  );
};

export default Cart;
