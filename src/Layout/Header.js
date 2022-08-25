import React, { Fragment } from 'react';
import classes from './Header.module.css';
import mealsImage from '../assets/meals.jpg';
import CartButton from './CartButton';

const Header = props => {
    return (
    <Fragment>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <CartButton onClick={props.openCart}/> 
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt='a table full of meals'/>
        </div>
    </Fragment>
)};

export default Header;