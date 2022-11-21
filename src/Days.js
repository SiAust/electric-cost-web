import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Days({ days, setDays }) {
  const incDay = () => {
    if (days !== 7) setDays(days + 1);
  };
  const decDay = () => {
    if (days !== 1) setDays(days - 1);
  };

  return (
    <div className="clock-component">
      <button onClick={incDay}>
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
      <p>
        {days} <br /> {days > 1 ? <span>days</span> : <span>days</span>}/week
      </p>
      <button onClick={decDay}>
        {" "}
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
    </div>
  );
}

export default Days;
