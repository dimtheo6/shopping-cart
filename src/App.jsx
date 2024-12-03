import Header from "./components/header";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Cart from "./components/Cart";
import { CartProvider } from "./components/CartContext";
import useSavedCart from "./components/useSavedCart";

export default function App() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useSavedCart();
  const [cartVisible, setCartVisible] = useState(true);

  const location = useLocation();

  const getBackgroundClass = () => {
    switch (location.pathname) {
      case "/":
        return "home-bg";
      default:
        return "default-bg";
    }
  };

  const closeCart = () => {
    setCartVisible(false);
  };

  console.log("App - Query:", query);

  return (
    <>
      <CartProvider cart={cart} setCart={setCart}>
        <div className={`main ${getBackgroundClass()} `}>
          <Header query={query} setQuery={setQuery} cartVisible={cartVisible} setCartVisible={setCartVisible} />

          {cartVisible && (
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40 z-40" onClick={closeCart}></div>
            )}

          {/* Cart Panel */}
          <div
            className={`fixed top-0 ${
              cartVisible ? "right-0" : `-right-full`
            } bg-card-background h-full w-80 px-10 py-5 overflow-auto no-scrollbar transition-all duration-500 ease-in-out z-50`}
          >
            <Cart cart={cart} setCart={setCart} />
          </div>

          <div className=" flex justify-center ">
            <Outlet context={{ query, setQuery }} />
          </div>
        </div>
      </CartProvider>
    </>
  );
}
