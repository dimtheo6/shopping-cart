import { useLocation } from "react-router-dom";
import Carousel from "../components/Carousel";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Game() {
  const [isVisible, setIsVisible] = useState(false);

  const location = useLocation();
  const game = location.state?.clickedGame || "";
  const images = game.short_screenshots;

  console.log(`the game is `, game);
  console.log(`the image is `, images);

  const handleShow = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex flex-col gap-5 px-4 md:px-8 lg:px-16">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Link to="/games">
          <h1>
            <FontAwesomeIcon icon={faLeftLong} /> Store
          </h1>
        </Link>
        <h1>{game.name}</h1>
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
                {game.description
                  ? game.description
                  : `Lorem ipsum odor amet, consectetuer adipiscing elit. Litora
                lobortis nascetur sagittis litora platea natoque pharetra at.
                Dictum senectus nibh primis sociosqu vehicula ullamcorper eu.
                Pharetra cubilia per lorem tellus ullamcorper arcu pharetra duis
                urna. Tortor velit at feugiat curabitur pulvinar elementum
                torquent. Risus nascetur quisque aliquet ad hendrerit nascetur
                volutpat vulputate. Habitant tempor fermentum enim cursus
                torquent; efficitur congue vel. Congue vestibulum euismod nulla
                torquent placerat a. Conubia aliquam egestas quam integer
                pellentesque. Vivamus aptent aenean nullam urna, sollicitudin
                gravida pretium sit purus. Bibendum a justo et suspendisse mus
                ac himenaeos. Litora imperdiet torquent efficitur etiam nam
                consectetur lacinia dictumst mauris. Porttitor facilisi est nunc
                rutrum non congue sagittis urna. Ullamcorper sem sapien magnis
                non phasellus pulvinar. Aliquam iaculis molestie vivamus blandit
                consectetur risus commodo torquent.`}
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
            <button className="py-2 px-4  text-white font-bold rounded-lg hover:bg-black hover:bg-opacity-15 transition-all">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
