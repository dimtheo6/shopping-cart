import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCrown,
  faTrophy,
  faFire,
  faForward,
  faStar,
  faChessKnight,
  faGun,
  faTree,
  faHandFist,
  faCalendar,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faFortAwesome } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { buildDateFilter,buildWeekFilter,buildLast30DaysFilter } from "./utils";

export default function Sidebar() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const buttonStyles = `flex flex-col gap-2 [&>p]:flex [&>p]:items-center [&>p]:gap-2 py-3 [&>p]:cursor-pointer [&>p]:py-1`;
  const iconStyles = `p-2 bg-card-background group-hover:bg-white group-hover:text-black rounded-lg min-w-5`;

  const handleClick = (btnQuery, filterKey) => {
    setActiveFilter(filterKey);
    setIsVisible(false);
    navigate("/games", { state: { searchQuery: "", btnQuery } });
  };


  const handleShow = () =>{
    setIsVisible(!isVisible);
  }

  return (
    <>
    <button onClick={handleShow} className='fixed bottom-8 right-6 text-black bg-white p-2 w-10 h-10  rounded-full font-bold md:hidden max-md:z-50'> {isVisible ? 'X' : <FontAwesomeIcon icon={faBars} />}</button>
    <aside className={`sidebar flex flex-col gap-5 text-white w-56 md:w-72 sticky top-0 left-0 overflow-auto py-8 px-10 h-screen bg-background ${isVisible ? '' : 'max-md:hidden' } max-md:w-full max-md:fixed max-md:z-40 `}>
      {/* New Releases */}
      <div className="sidebar_container flex flex-col gap-1">
        <h1>New Releases</h1>
        <div className={`${buttonStyles}`}>
          <p onClick={() => handleClick(buildLast30DaysFilter(), "last30days")} className="group">
            <FontAwesomeIcon
              icon={faStar}
              className={`${iconStyles} ${
                activeFilter === "last30days" ? "text-black bg-white" : "bg-card-background text-white"
              }`}
            />
            Last 30 days
          </p>

          <p onClick={() => handleClick(buildWeekFilter(), "thisweek")} className="group">
            <FontAwesomeIcon
              icon={faCalendar}
              className={`${iconStyles} ${
                activeFilter === "thisweek" ? "text-black bg-white" : "bg-card-background text-white"
              }`}
            />
            This week
          </p>

          <p onClick={() => handleClick(buildDateFilter(), "nextweek")} className="group">
            <FontAwesomeIcon
              icon={faForward}
              className={`${iconStyles} ${
                activeFilter === "nextweek" ? "text-black bg-white" : "bg-card-background text-white"
              }`}
            />
            Next week
          </p>
        </div>
      </div>

      {/* Top */}
      <div className="sidebar_container flex flex-col gap-1">
        <h1>Top</h1>
        <div className={buttonStyles}>
          <p onClick={() => handleClick(`&dates=2024-01-01,2024-12-31`, "Best of the year")} className="group">
            <FontAwesomeIcon
              icon={faTrophy}
              className={`${iconStyles} ${
                activeFilter === "Best of the year" ? "text-black bg-white" : "bg-card-background text-white"
              }`}
            />
            Best of the year
          </p>

          <p onClick={() => handleClick(`&dates=2023-01-01,2023-12-31`, "popular2023")} className="group">
            <FontAwesomeIcon
              icon={faFire}
              className={`${iconStyles} ${
                activeFilter === "popular2023" ? "text-black bg-white" : "bg-card-background text-white"
              }`}
            />
            Popular in 2023
          </p>

          <p onClick={() => handleClick("", "alltime")} className="group">
            <FontAwesomeIcon
              icon={faCrown}
              className={`${iconStyles} ${
                activeFilter === "alltime" ? "text-black bg-white" : "bg-card-background text-white"
              }`}
            />
            All time top
          </p>
        </div>
      </div>

      {/* Genres */}
      <div className="sidebar_container flex flex-col gap-1">
        <h1>Genres</h1>
        <div className={buttonStyles}>
          <p onClick={() => handleClick(`&genres=action`, "action")} className="group">
            <FontAwesomeIcon
              icon={faHandFist}
              className={`${iconStyles} ${
                activeFilter === "action" ? "text-black bg-white" : "bg-card-background text-white"
              }`}
            />
            Action
          </p>

          <p onClick={() => handleClick(`&genres=5`, "rpg")} className="group">
            <FontAwesomeIcon
              icon={faFortAwesome}
              className={`${iconStyles} ${
                activeFilter === "rpg" ? "text-black bg-white" : "bg-card-background text-white"
              }`}
            />
            RPG
          </p>

          <p onClick={() => handleClick(`&genres=shooter`, "shooter")} className="group">
            <FontAwesomeIcon
              icon={faGun}
              className={`${iconStyles} ${
                activeFilter === "shooter" ? "text-black bg-white" : "bg-card-background text-white"
              }`}
            />
            Shooter
          </p>

          <p onClick={() => handleClick(`&genres=adventure`, "adventure")} className="group">
            <FontAwesomeIcon
              icon={faTree}
              className={`${iconStyles} ${
                activeFilter === "adventure" ? "text-black bg-white" : "bg-card-background text-white"
              }`}
            />
            Adventure
          </p>

          <p onClick={() => handleClick(`&genres=strategy`, "strategy")} className="group">
            <FontAwesomeIcon
              icon={faChessKnight}
              className={`${iconStyles} ${
                activeFilter === "strategy" ? "text-black bg-white" : "bg-card-background text-white"
              }`}
            />
            Strategy
          </p>
        </div>
      </div>
    </aside>
    </>
    
  );
}
