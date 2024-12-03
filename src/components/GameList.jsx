import { useState } from "react";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useCart } from "./CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

GameList.propTypes = {
  query: PropTypes.string,
};

const API_KEY = "14366b3fb284408cbbb8c14edf86549e";

export default function GameList({ query, btnQuery}) {
  const [clickedGame, setClickedGame] = useState(null);
  const {cart , setCart} = useCart();

  const navigate = useNavigate();

  

  const { data, loading, error } = useFetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}&page_size=12${btnQuery}`,
    true
  );

  const handleClick = (game) => {
    setClickedGame(game);
    navigate("/games/game", { state: { clickedGame: game } });
  };

   const addToCart = (game) =>{
    if (cart.some(item => item.id === game.id)) {
      console.log('already in cart')
      return;
    }
      
    setCart((prevCart) => {
      const newCart = [...prevCart, game];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  }

  const getPlatformStr = (platforms) => {
    if (!platforms || platforms.length === 0) {
      return "No platforms available";
    }

    if (platforms.length === 1) {
      return platforms[0].platform.name;
    } else {
      const platformStr = platforms
        .map((each) => each.platform.name)
        .join(", ");
      if (platformStr.length > 30) {
        return platformStr.substring(0, 30) + "...";
      }
      return platformStr;
    }
  };

  console.log(data);

  if (loading) {
    return <div className="text-white font-bold text-3xl loader"></div>;
  }

  if (error) {
    return (
      <p className="text-white font-bold text-3xl">
        A network error was encountered
      </p>
    );
  }

  

  return (
    <>
      <div className="container flex flex-wrap gap-8 justify-center">
        {data.map((game) => (
          <div
            className="item w-full sm:w-full md:w-72 lg:w-80 rounded-lg bg-card-background text-white"
            key={game.id}
          >
            <img
              className="game_image h-48 min-w-full rounded-t-lg cursor-pointer"
              src={game.background_image}
              alt={`${game.name} image`}
              onClick={() => handleClick(game)}
            />

            <div className="game-info  space-y-2 px-3 py-5">
              <div className="flex text-left justify-between items-center">
                <p className="text-neutral-400 text-sm py-2">
                  Price: {game.price ? `$${game.price}` : "Price not available"}
                </p>
                <button onClick={() => addToCart(game)}
                 className="text-neutral-400 text-sm py-2 px-2 rounded-lg hover:bg-black hover:bg-opacity-15">
                 {cart.some(item => item.id === game.id)? (<div className="text-green-500">Added <FontAwesomeIcon icon={faCheck}/></div>) : (`Add to cart +`)} 
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <h4
                  className="font-extrabold text-xl cursor-pointer"
                  onClick={() => handleClick(game)}
                >
                  {game.name}
                </h4>
                <span className="platforms text-neutral-400 text-sm">
                  {getPlatformStr(game.parent_platforms)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
