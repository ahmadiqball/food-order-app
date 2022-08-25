import { useReducer } from "react";
import AppContext from "./app-context";

const defaultCart = {
    cartData: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedAmount = state.totalAmount + action.item.amount * action.item.price;
        const existingItemIdx = state.cartData.findIndex(item => item.id === action.item.id)
        const existingItem = state.cartData[existingItemIdx]
        let updatedCart;

        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            };
            updatedCart = [...state.cartData];
            updatedCart[existingItemIdx] = updatedItem;
        } else {
            updatedCart = state.cartData.concat(action.item);
        }
        
        return {
            cartData: updatedCart,
            totalAmount: updatedAmount
        }
    } else if (action.type === "REMOVE") {
        const targetIdx = state.cartData.findIndex(item => item.id === action.id);
        const targetItem = state.cartData[targetIdx];
        const updatedAmount = state.totalAmount - targetItem.price;
        let updatedCart;

        if (targetItem.amount === 1) {
            updatedCart = state.cartData.filter(item => item.id !== action.id)
        } else {
            updatedCart = [...state.cartData]
            const updatedItem = {...targetItem, amount: targetItem.amount - 1}
            updatedCart[targetIdx] = updatedItem
        }

        return {
            cartData: updatedCart,
            totalAmount: updatedAmount
        }
    }

    return defaultCart;
}

const AppProvider = (props) => {
    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCart)

    const addCartData = (item) => {
        dispatchCart({type: "ADD", item: item})
    }

    const removeCartData = (id) => {
        dispatchCart({type: "REMOVE", id: id})
    }

    const contextData = {
        mealDatas: [],
        cartData: cartState.cartData,
        totalAmount: cartState.totalAmount,
        addCartData: addCartData,
        removeCartData: removeCartData 
    }

    return (
        <AppContext.Provider value={contextData}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider;