import { useLocation } from "react-router-dom";
import Carousel from "../components/Carousel";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faLeftLong,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";

export default function Game() {
  const [isVisible, setIsVisible] = useState(false);
  const [gameData, setGameData] = useState(null); // State for fetched data
  const [error, setError] = useState(null); // State for errors
  const { cart, setCart } = useCart();

  const location = useLocation();
  const game = location.state?.clickedGame || "";
  const images = game.short_screenshots;

  // fetch description
  useEffect(() => {
    if (!game.slug) return; // Avoid fetching if slug is undefined

    fetch(
      `https://api.rawg.io/api/games/${game.slug}?key=14366b3fb284408cbbb8c14edf86549e`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setGameData(data))
      .catch((err) => setError(err.message));
  }, [game.slug]); // Re-run the effect if game.slug changes

  const handleShow = () => {
    setIsVisible(!isVisible);
  };

  const addToCart = (game) => {
    if (cart.some((item) => item.id === game.id)) {
      return;
    }

    setCart((prevCart) => {
      const newCart = [...prevCart, game];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <div className="flex flex-col gap-5 px-4 md:px-8 lg:px-16">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Link to="/games">
          <h1 className="max-sm:text-xl max-md:text-2xl w-32">
            <FontAwesomeIcon icon={faLeftLong} /> Store
          </h1>
        </Link>
        <h1 className="flex max-sm:text-2xl">{game.name}</h1>
      </div>

      {/* Main Content */}
      <div className="game_container flex flex-col lg:flex-row text-white gap-10">
        {/* Carousel */}
        <div className="w-full lg:w-2/3 aspect-w-16 aspect-h-9">
          <Carousel imageUrl={images} />
        </div>

        {/* Sidebar */}
        <div className="side flex flex-col justify-between w-full lg:w-1/3">
          <div>
            <section className="game_description  max-h-80 p-4 flex flex-col gap-3 overflow-auto rounded-lg no-scrollbar bg-gradient-to-tr from-background to-card-background ">
              <h1>Description</h1>
              <p className="">
                {gameData?.description_raw
                  ? gameData?.description_raw
                  : `Description Loading...`}
              </p>
            </section>

            {/* Additional Details Section */}
            <div
              className={`transition-all flex flex-col duration-300 overflow-hidden py-2 px-4 mt-2 text-neutral-400 rounded-lg bg-gradient-to-br from-background to-card-background ${
                isVisible ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p>Released: {game.released ? game.released : "Not Available"}</p>
              <p>
                Genres:{" "}
                {game.genres
                  ? game.genres.map((each) => each.name).join(`, `)
                  : `Not Available`}
              </p>
              <p>
                Platforms:{" "}
                {game.parent_platforms
                  ? game.parent_platforms
                      .map((each) => each.platform.name)
                      .join(`, `)
                  : `Not Available`}
              </p>
              <p>
                Rating: {game.rating ? `${game.rating} / 5` : "Not Available"}
              </p>
            </div>

            {/* Toggle Button */}
            <div className="flex justify-end">
              <button className="text-lg font-bold" onClick={handleShow}>
                {" "}
                More{" "}
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className={`transition-transform duration-200 ${
                    isVisible ? `rotate-180` : ``
                  } `}
                />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center p-5 mt-4 bg-gradient-to-r from-background to-card-background rounded-lg">
            <p className="font-bold text-lg">{`${game.price}$`}</p>
            <button
              onClick={() => addToCart(game)}
              className="py-2 px-4  text-white font-bold rounded-lg hover:bg-black hover:bg-opacity-15 transition-all"
            >
              {cart.some((item) => item.id === game.id) ? (
                <div className="text-green-500">
                  Added <FontAwesomeIcon icon={faCheck} />
                </div>
              ) : (
                `Add to cart`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
