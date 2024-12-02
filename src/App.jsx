import Header from "./components/header";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function App() {
  const [query, setQuery] = useState("");
  const location = useLocation();

  const getBackgroundClass = () => {
    switch (location.pathname) {
      case "/":
        return "home-bg";
      default:
        return "default-bg";
    }
  };

  return (
    <>
      <div className={`main ${getBackgroundClass()}`}>
        <Header query={query} setQuery={setQuery} />
        <div className=" flex justify-center ">
          <Outlet />
        </div>
      </div>
    </>
  );
}
