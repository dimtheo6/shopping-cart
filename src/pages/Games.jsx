import GameList from "../components/GameList";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Games() {
  const location = useLocation();

  const searchQuery = location.state?.searchQuery || "";

  return (
    <>

      <Sidebar />

      <div className="flex-grow flex justify-center items-center p-10">
        <GameList query={searchQuery} />
      </div>
    </>
  );
}
