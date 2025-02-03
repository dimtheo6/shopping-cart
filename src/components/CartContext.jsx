import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

// const {cart,usecart} = useCart()  In the component i want it to use

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children, cart, setCart }) => {
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
  cart: PropTypes.array,
  setCart: PropTypes.func,
};
