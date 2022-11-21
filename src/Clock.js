import React from "react";
// Clock components
import Days from "./Days.js";
import Hours from "./Hours.js";

// css
import "./css/Clock.css";

function Clock({ days, hours, setDays, setHours }) {
  return (
    <div className="clock">
      <Hours hours={hours} setHours={setHours} />
      <Days days={days} setDays={setDays} />
    </div>
  );
}

export default Clock;
