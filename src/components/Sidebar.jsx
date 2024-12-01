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

export default function Sidebar() {

  const buttonStyles = `flex flex-col gap-2`;
  
  return (
    <aside className="sidebar text-white max-w-80 flex-1 bg-black sticky top-0 overflow-auto py-8 px-10">
      <div className="sidebar_container">
        <h1>New Releases</h1>
        <div className={buttonStyles}>
          <p>
            <FontAwesomeIcon icon={faStar} /> Last 30 days
          </p>

          <p>
            <FontAwesomeIcon icon={faCalendar} /> This week
          </p>

          <p>
            <FontAwesomeIcon icon={faForward} /> Next week
          </p>
        </div>
      </div>

      <div className="sidebar_container">
        <h1>Top</h1>
        <div className={buttonStyles}>
          <p>
            <FontAwesomeIcon icon={faTrophy} /> Best of the year
          </p>

          <p>
            <FontAwesomeIcon icon={faFire} /> Popular in 2023
          </p>

          <p>
            <FontAwesomeIcon icon={faCrown} /> All time top
          </p>
        </div>
      </div>

      <div className="sidebar_container">
        <h1>Genres</h1>
        <div className={buttonStyles}>
          <p>
            <FontAwesomeIcon icon={faHandFist} /> Action
          </p>

          <p>
            <FontAwesomeIcon icon={faFortAwesome} /> RPG
          </p>

          <p>
            <FontAwesomeIcon icon={faGun} /> FPS
          </p>

          <p>
            <FontAwesomeIcon icon={faTree} /> Adventure
          </p>

          <p>
            <FontAwesomeIcon icon={faChessKnight} /> Strategy
          </p>
        </div>
      </div>
    </aside>
  );
}
