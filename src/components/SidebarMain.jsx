import {
    buildLast30DaysFilter,
    buildDateFilter,
    buildWeekFilter,
  } from "/src/components/utils";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {
    faCalendar,
    faForward,
    faStar,
    faTrophy,
    faFire,
    faCrown,
  } from "@fortawesome/free-solid-svg-icons";
  import { useNavigate } from "react-router-dom";

export default function SidebarMain(){
    const navigate = useNavigate();

    const handleClick = (btnQuery) => {
        navigate("/games", { state: { searchQuery: "", btnQuery } });
      };
    
    const iconStyles = "text-xl flex p-2 min-w-8 ";
    const buttonStyles =
      "hover:bg-blue-200 hover:scale-110 rounded-xl bg-white font-bold transition:all duration-200";

    return(
        <div className="quick_navigation fixed right-16 top-1/4 flex flex-col  bg-gray-200 bg-opacity-95 text-black p-7 rounded-xl  text-center gap-3 max-sm:right-auto">
        <h2 className="text-2xl font-bold">Quick Navigation</h2>
        <div className="container flex flex-col  [&>h3]:cursor-pointer [&>h3]:flex [&>h3]:items-center [&>h3]:gap-2 gap-2 ">
          <h3 className={buttonStyles} onClick={() => handleClick("")}>
            {" "}
            <FontAwesomeIcon icon={faCrown} className={iconStyles} />
            All time top
          </h3>
          <h3
            className={buttonStyles}
            onClick={() => handleClick(`&dates=2024-01-01,2024-12-31`)}
          >
            <FontAwesomeIcon icon={faTrophy} className={iconStyles} />
            Best of the year
          </h3>
          <h3
            onClick={() => handleClick(`&dates=2023-01-01,2023-12-31`)}
            className={buttonStyles}
          >
            <FontAwesomeIcon icon={faFire} className={iconStyles} />{" "}
            Popular in 2023
          </h3>
          <h3
            className={buttonStyles}
            onClick={() => handleClick(buildWeekFilter())}
          >
            <FontAwesomeIcon icon={faForward} className={iconStyles} />{" "}
            Next Week
          </h3>
          <h3
            className={buttonStyles}
            onClick={() => handleClick(buildDateFilter())}
          >
            <FontAwesomeIcon icon={faCalendar} className={iconStyles} />
            This Week
          </h3>
          <h3
            className={buttonStyles}
            onClick={() => handleClick(buildLast30DaysFilter())}
          >
            <FontAwesomeIcon icon={faStar} className={iconStyles} />{" "}
            Last 30 Days
          </h3>
        </div>
      </div>
    )
}