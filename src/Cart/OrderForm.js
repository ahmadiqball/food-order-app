import { useRef, useState } from "react";
import classes from "./OrderForm.module.css";

const isEmpty = value => value.trim() === ''
const isFiveChar = value => value.trim().length === 5


const OrderForm = (props) => {
  const enteredNameRef = useRef();
  const enteredStreetRef = useRef();
  const enteredPostalRef = useRef();
  const enteredCityRef = useRef();
  const [isFormValid, setIsFormValid] = useState({
    name: true,
    street: true,
    postal: true,
    city: true
  })

  const orderSubmit = (event) => {
    event.preventDefault();
    const enteredName = enteredNameRef.current.value;
    const enteredStreet = enteredStreetRef.current.value;
    const enteredPostal = enteredPostalRef.current.value;
    const enteredCity = enteredCityRef.current.value;

    const isNameValid = !isEmpty(enteredName)
    const isStreetValid = !isEmpty(enteredStreet)
    const isPostalValid = isFiveChar(enteredPostal)
    const isCityValid = !isEmpty(enteredCity)

    setIsFormValid({
        name: isNameValid,
        street: isStreetValid,
        postal: isPostalValid,
        city: isCityValid
    })

    if (isNameValid && isStreetValid && isPostalValid && isCityValid) {
        const orderData = {
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity,
          };

        props.onOrder(orderData)
    }
  };

  return (
    <form onSubmit={orderSubmit}>
      <div className={`${classes.control} ${!isFormValid.name && classes.invalid}`}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={enteredNameRef} />
        {!isFormValid.name && <p>Name must not be empty!</p>}
      </div>
      <div className={`${classes.control} ${!isFormValid.street && classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={enteredStreetRef} />
        {!isFormValid.street && <p>Street must not be empty!</p>}
      </div>
      <div className={`${classes.control} ${!isFormValid.postal && classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={enteredPostalRef} />
        {!isFormValid.postal && <p>Postal Code must have 5 characters!</p>}
      </div>
      <div className={`${classes.control} ${!isFormValid.city && classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={enteredCityRef} />
        {!isFormValid.city && <p>City must not be empty!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Confirm Order</button>
      </div>
    </form>
  );
};

export default OrderForm;
