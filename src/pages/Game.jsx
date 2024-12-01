import { useLocation } from "react-router-dom";
import Carousel from "../components/Carousel";

export default function Game() {
  const location = useLocation();
  const game = location.state?.clickedGame || "";
  const images = game.short_screenshots;

  console.log(`the game is `, game);
  console.log(`the image is `, images);
  return (
   
      <div className="max-w-7xl w-full h-500px">
        <Carousel imageUrl={images} />
      </div>
    
  );
}
