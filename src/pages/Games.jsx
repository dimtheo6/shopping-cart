import GameList from "../components/GameList";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Games() {
    const location = useLocation();

    const searchQuery = location.state?.searchQuery || "";

  return (
    <>
      <Sidebar/>
      <GameList query={searchQuery}/>
    </>
  );
}
