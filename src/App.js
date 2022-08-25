import React, { useState } from "react";
import Header from "./Layout/Header";
import Meals from "./Meals/Meals";
import Cart from "./Cart/Cart";
import AppProvider from "./context/AppProvider";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  }

  const closeCart = () => {
    setIsCartOpen(false);
  }

  return (
    <AppProvider>
      <Header openCart={openCart}/>
      {isCartOpen && <Cart closeCart={closeCart}/>}
      <Meals />
    </AppProvider>
  );
}

export default App;
