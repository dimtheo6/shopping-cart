import { useEffect, useState } from "react";

export default function Cart({ cart, setCart }) {
  const [gameCount, setGameCount] = useState(0);

  console.log("games in cart", cart);

  useEffect(() => {
    setGameCount(cart.length);
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
      <div className="header flex text-white justify-between">
        <h1>Games: {gameCount}</h1>
        <button onClick={handleClear}>clear</button>
      </div>

      <div className="cart_container flex flex-col gap-10">
        {cart.map((game, index) => (
          <div key={game.id} className="w-full text-white flex flex-col ">
            <div className="image">
              <img
                src={game.background_image}
                alt={`${game.name} image`}
                className=" "
              />
            </div>
            <h4>{game.name}</h4>
            <div className="flex justify-between px-1">
              <p>{`${game.price}$`}</p>
              <button onClick={() => handleDelete(index)}>X</button>
            </div>
          </div>
        ))}
        <div>Total: </div>
      </div>
    </>
  );
}
