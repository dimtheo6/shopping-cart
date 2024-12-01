import Header from "./components/header";
import GameList from "./components/GameList";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <div className="main flex justify-center">
        <Outlet/>
      </div>
    </>
  );
}
