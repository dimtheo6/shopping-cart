import { useState } from "react";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

GameList.propTypes = {
  query: PropTypes.string,
}

const API_KEY = "14366b3fb284408cbbb8c14edf86549e";

export default function GameList({ query }) {

  const [clickedGame,setClickedGame] = useState(null);
  const [gameData, setGameData] = useState(null);

  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}&page_size=10`,
    true
  );

  const handleClick = (game) =>{
    setClickedGame(game);
    navigate('/games/game',{state:{clickedGame:game}})
  }

  const getPlatformStr = (platforms) => {
    if (!platforms || platforms.length === 0) {
        return "No platforms available";
      }

    if (platforms.length === 1){
        return platforms[0].platform.name;
    }else{
        const platformStr = platforms.map((each) => each.platform.name).join(", ");
        if (platformStr.length > 30) {
          return platformStr.substring(0, 30) + "...";
        }
        return platformStr;
    }
   
  };

  console.log(data);

  if (loading){
    return <p>Loading...</p>
  }

  if (error){
    return <p>A network error was encountered</p>
  }

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : data ? (
        <div className="container flex flex-wrap gap-3 justify-center">
          {data.map((game) => (
            <div className="item w-96 border rounded-lg bg-slate-800 text-white" key={game.id} onClick={()=> handleClick(game)}>
                <img className='game_image h-48 min-w-full rounded-lg' src={game.background_image} alt={`${game.name} image`} />
              <h4 className="p-2">
                {game.name}
                <br></br>
                <span className="platforms text-neutral-400 text-sm">
                  {getPlatformStr(game.parent_platforms)}
                </span>
              </h4>
              <p>Price: {game.price ? `$${game.price}` : "Price not available"}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="error">{error}</div>
      )}
    </>
  );
}
