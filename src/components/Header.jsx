import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

Header.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
  cartVisible: PropTypes.bool,
  setCartVisible: PropTypes.func,
  gameCount: PropTypes.number,
};

export default function Header({
  query,
  setQuery,
  cartVisible,
  setCartVisible,
  gameCount,
}) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(search);
  }, [search, setQuery]);

  const handleClick = () => {
    setSearch("");
    navigate("/games", { state: { searchQuery: query } });
  };

  const handleShowCart = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <header className="flex justify-between py-8 px-16 max-sm:px-5 max-sm:py-4">
      <Link to="/">
        {" "}
        <h1 className="font-extrabold text-5xl max-sm:text-3xl">Logo</h1>
      </Link>

      <div className="relative flex  items-center gap-2">
        <input
          type="text"
          value={search}
          id="search_bar"
          className="right-0 rounded-lg h-8 p-2 w-56 md:focus-visible:w-96 transition-all duration-200 placeholder:text-sm max-sm:w-44
          "
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search Games..."
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="bg-white absolute right-2 cursor-pointer text-black"
          onClick={handleClick}
        />
        {/* Navigate to the results page with query as a query parameter */}
      </div>

      <button className="text-white relative" onClick={handleShowCart}>
        <FontAwesomeIcon
          icon={faCartShopping}
          className="hover:text-blue-300"
        />
        {gameCount > 0 && (
          <span className="absolute -top-0 -right-3 text-xs bg-blue-600 rounded-full h-4 w-4 flex justify-center items-center">
            {gameCount}
          </span>
        )}
      </button>
    </header>
  );
}
