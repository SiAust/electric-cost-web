import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Hours({ hours, setHours }) {
  const incHours = () => {
    if (hours !== 24) {
      setHours(hours + 1);
    }
  };

  const decHours = () => {
    if (hours !== 1) {
      setHours(hours - 1);
    }
  };

  return (
    <div className="clock-component">
      <button name="increase hours" onClick={incHours}>
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
      <p>
        {hours} <br /> {hours > 1 ? <span>hours</span> : <span>hour</span>}/day
      </p>
      <button name="decrease hours" onClick={decHours}>
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
    </div>
  );
}

export default Hours;
