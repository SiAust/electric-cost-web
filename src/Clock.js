import React from "react";
// Timer components
import Days from "./Days.js";
import Hours from "./Hours.js";

// css
import "./css/Timer.css";

function Timer({ days, hours, setDays, setHours }) {
  return (
    <div className="clock">
      <Hours hours={hours} setHours={setHours} />
      <Days days={days} setDays={setDays} />
    </div>
  );
}

export default Timer;
