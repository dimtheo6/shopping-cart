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
} from "@fortawesome/free-solid-svg-icons";
import { faFortAwesome } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { startOfWeek, endOfWeek, format, subDays } from "date-fns";

const buildWeekFilter = () => {
  // Get the start and end of the current week
  const startOfCurrentWeek = format(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
    "yyyy-MM-dd"
  );
  const endOfCurrentWeek = format(
    endOfWeek(new Date(), { weekStartsOn: 1 }),
    "yyyy-MM-dd"
  );

  return `&dates=${startOfCurrentWeek},${endOfCurrentWeek}`;
};

const buildDateFilter = () => {
  // Get the current date and the date 7 days from now
  const today = format(new Date(), "yyyy-MM-dd");
  const in7Days = format(
    new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    "yyyy-MM-dd"
  );

  return `&dates=${today},${in7Days}`;
};

const buildLast30DaysFilter = () => {
  // Get the date 30 days ago
  const startDate = format(subDays(new Date(), 30), "yyyy-MM-dd");
  const endDate = format(new Date(), "yyyy-MM-dd");

  return `&dates=${startDate},${endDate}`;
};

export default function Sidebar() {
  const navigate = useNavigate();

  const buttonStyles = `flex flex-col gap-2`;

  const handleClick = (btnQuery) => {
    navigate("/games", { state: { searchQuery: "", btnQuery: btnQuery } });
  };

  return (
    <aside className="sidebar text-white w-40 md:w-56 lg:w-64  sticky top-0 left-0 overflow-auto py-8 px-6 h-screen bg-blue-500">
      <div className="sidebar_container">
        <h1>New Releases</h1>
        <div className={buttonStyles}>
          <div onClick={() => handleClick(buildLast30DaysFilter())}>
            <FontAwesomeIcon icon={faStar} /> Last 30 days
          </div>

          <p onClick={() => handleClick(buildWeekFilter())}>
            <FontAwesomeIcon icon={faCalendar} /> This week
          </p>

          <p onClick={() => handleClick(buildDateFilter())}>
            <FontAwesomeIcon icon={faForward} /> Next week
          </p>
        </div>
      </div>

      <div className="sidebar_container">
        <h1>Top</h1>
        <div className={buttonStyles}>
          <p onClick={() => handleClick(`&dates=2024-01-01,2024-12-31`)}>
            <FontAwesomeIcon icon={faTrophy} /> Best of the year
          </p>

          <p onClick={() => handleClick(`&dates=2023-01-01,2023-12-31`)}>
            <FontAwesomeIcon icon={faFire} /> Popular in 2023
          </p>

          <p onClick={() => handleClick("")}>
            <FontAwesomeIcon icon={faCrown} /> All time top
          </p>
        </div>
      </div>

      <div className="sidebar_container">
        <h1>Genres</h1>
        <div className={buttonStyles}>
          <p onClick={() => handleClick(`&genres=action`)}>
            <FontAwesomeIcon icon={faHandFist} /> Action
          </p>

          <p onClick={() => handleClick(`&genres=5`)}>
            <FontAwesomeIcon icon={faFortAwesome} /> RPG
          </p>

          <p onClick={() => handleClick(`&genres=shooter`)}>
            <FontAwesomeIcon icon={faGun} /> Shooter
          </p>

          <p onClick={() => handleClick(`&genres=adventure`)}>
            <FontAwesomeIcon icon={faTree} /> Adventure
          </p>

          <p onClick={() => handleClick(`&genres=strategy`)}>
            <FontAwesomeIcon icon={faChessKnight} /> Strategy
          </p>
        </div>
      </div>
    </aside>
  );
}
