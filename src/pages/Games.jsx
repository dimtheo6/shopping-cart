import GameList from "../components/GameList";
import Header from "../components/header";
import { useLocation } from "react-router-dom";

export default function Games() {
    const location = useLocation();

    const searchQuery = location.state?.searchQuery || "";

  return (
    <>
      <GameList query={searchQuery}/>
    </>
  );
}
