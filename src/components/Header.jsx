import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";

Header.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
}

export default function Header({ query, setQuery }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    setQuery(search)
  },[search,setQuery])

  const handleClick = () => {
    setSearch('')
    navigate("/games",{state:{searchQuery: query}});
  };

  return (
    <header className="flex justify-around">
      <Link to="/">
        {" "}
        <h1 className="font-extrabold text-5xl">Logo</h1>
      </Link>
      <input
        type="text"
        value={search}
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
      {/* Navigate to the results page with query as a query parameter */}

      <button>Cart</button>
    </header>
  );
}
