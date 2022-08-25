import React, { useRef, useState } from 'react';
import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";

const MealItemForm = (props) => {
  const [isFromValid, setIsFormValid] = useState(true)
  const inputAmount = useRef()

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = inputAmount.current.value;
    const enteredAmountNum = +enteredAmount
    if ( enteredAmount.trim().length === 0 || enteredAmountNum < 1 || enteredAmountNum > 5){
      setIsFormValid(false)
      return;
    }
    
    
    props.addToCart(enteredAmountNum)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input ref={inputAmount} label='Amount' input={{
        id:'amount',
        type:'number',
        min:'1',
        max:'5',
        step:'1',
        defaultValue:'1'
      }} />
      <button> + Add</button>
      {!isFromValid && <p>Please input amount 1-5.</p>}
    </form>
  );
};

export default MealItemForm;
