import Header from "./components/Header";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Cart from "./components/Cart";
import { CartProvider } from "./components/CartContext";
import useSavedCart from "./components/useSavedCart";
import { useNavigate } from "react-router-dom";
import {
  buildLast30DaysFilter,
  buildDateFilter,
  buildWeekFilter,
} from "./components/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faForward,
  faStar,
  faTrophy,
  faFire,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useSavedCart();
  const [cartVisible, setCartVisible] = useState(false);
  const [gameCount, setGameCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const getBackgroundClass = () => {
    switch (location.pathname) {
      case "/":
        return "home-bg";
      default:
        return "default-bg";
    }
  };

  const iconStyles = "text-xl flex p-2 min-w-8 ";
  const buttonStyles =
    "hover:bg-blue-200 hover:scale-110 rounded-xl bg-white font-bold transition:all duration-200";

  const closeCart = () => {
    setCartVisible(false);
  };

  const handleClick = (btnQuery) => {
    navigate("/games", { state: { searchQuery: "", btnQuery } });
  };

  return (
    <>
      <CartProvider cart={cart} setCart={setCart}>
        <div className={`main ${getBackgroundClass()} `}>
          <Header
            query={query}
            setQuery={setQuery}
            cartVisible={cartVisible}
            setCartVisible={setCartVisible}
            gameCount={gameCount}
            setGameCount={setGameCount}
          />

          {cartVisible && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black opacity-40 z-40"
              onClick={closeCart}
            ></div>
          )}

          {/* Cart Panel */}
          <div
            className={`fixed top-0 ${
              cartVisible ? "right-0" : `-right-full`
            } bg-card-background h-full w-80 px-10 py-5 overflow-auto no-scrollbar transition-all duration-500 ease-in-out z-50`}
          >
            <Cart
              cart={cart}
              setCart={setCart}
              gameCount={gameCount}
              setGameCount={setGameCount}
            />
          </div>

          <div className=" flex justify-center ">
            <Outlet context={{ query, setQuery }} />

            {/* Home Page */}
            {useLocation().pathname === "/" && (
              <div className="quick_navigation fixed right-16 top-1/4 flex flex-col  bg-gray-200 bg-opacity-95 text-black p-7 rounded-xl  text-center gap-3 max-sm:right-auto">
                <h2 className="text-2xl font-bold">Quick Navigation</h2>
                <div className="container flex flex-col  [&>h3]:cursor-pointer [&>h3]:flex [&>h3]:items-center [&>h3]:gap-2 gap-2 ">
                  <h3 className={buttonStyles} onClick={() => handleClick("")}>
                    {" "}
                    <FontAwesomeIcon icon={faCrown} className={iconStyles} />
                    All time top
                  </h3>
                  <h3
                    className={buttonStyles}
                    onClick={() => handleClick(`&dates=2024-01-01,2024-12-31`)}
                  >
                    <FontAwesomeIcon icon={faTrophy} className={iconStyles} />
                    Best of the year
                  </h3>
                  <h3
                    onClick={() => handleClick(`&dates=2023-01-01,2023-12-31`)}
                    className={buttonStyles}
                  >
                    <FontAwesomeIcon icon={faFire} className={iconStyles} />{" "}
                    Popular in 2023
                  </h3>
                  <h3
                    className={buttonStyles}
                    onClick={() => handleClick(buildWeekFilter())}
                  >
                    <FontAwesomeIcon icon={faForward} className={iconStyles} />{" "}
                    Next Week
                  </h3>
                  <h3
                    className={buttonStyles}
                    onClick={() => handleClick(buildDateFilter())}
                  >
                    <FontAwesomeIcon icon={faCalendar} className={iconStyles} />
                    This Week
                  </h3>
                  <h3
                    className={buttonStyles}
                    onClick={() => handleClick(buildLast30DaysFilter())}
                  >
                    <FontAwesomeIcon icon={faStar} className={iconStyles} />{" "}
                    Last 30 Days
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </CartProvider>
    </>
  );
}
