import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

import "./css/ToolTip.css";

function ToolTip({ text }) {
  return (
    <div className="tooltip">
      <FontAwesomeIcon icon={faCircleQuestion} />
      <div className="tooltip-text">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ToolTip;
