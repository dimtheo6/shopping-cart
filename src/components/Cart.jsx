import { useEffect, useState } from "react";
import PropTypes from "prop-types";

Cart.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func,
  gameCount: PropTypes.number,
  setGameCount: PropTypes.func,
};

export default function Cart({ cart, setCart, gameCount, setGameCount }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setGameCount(cart.length);

    const total = cart.reduce((acc, game) => acc + (game.price || 0), 0);
    setTotal(total);
  }, [cart]);

  const handleClear = () => {
    setCart([]);
  };

  const handleDelete = (index) => {
    const newArray = [...cart];
    newArray.splice(index, 1);
    setCart(newArray);
  };

  return (
    <>
      <div className="cart_container flex flex-col justify-between h-full gap-5">
        <div>
          <div className="header flex text-white justify-between pb-5">
            <h1>Items: {gameCount}</h1>
            <button onClick={handleClear} className="text-neutral-400">
              clear
            </button>
          </div>

          <div className="item_container flex flex-col gap-10">
            {cart.map((game, index) => (
              <div
                key={game.id}
                className="w-full text-white flex flex-col bg-background"
              >
                <div className="image">
                  <img
                    src={game.background_image}
                    alt={`${game.name} image`}
                    className=" "
                  />
                </div>
                <div className="flex justify-between py-2 items-center">
                  <div className="flex flex-col justify-between px-3">
                    <h4>{game.name}</h4>
                    <p>{`${game.price}$`}</p>
                  </div>

                  <button
                    className="bg-card-background rounded-full min-w-6 min-h-6 flex items-center justify-center mr-2 hover:bg-opacity-50 text-sm"
                    onClick={() => handleDelete(index)}
                  >
                    x
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <h1>Total: {total}$ </h1>
      </div>
    </>
  );
}
