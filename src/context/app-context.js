import React from "react";

const AppContext = React.createContext({
    mealDatas: [],
    cartData: [],
    totalAmount: 0,
    addCartData: (data) => {},
    removeCartData: (id) => {}
});

export default AppContext;