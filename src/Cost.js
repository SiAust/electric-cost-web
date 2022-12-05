import React, { useState, useEffect } from "react";
import ToolTip from "./ToolTip";

import "./css/Cost.css";

function Cost({
  currencyCode,
  units,
  subUnits,
  displayCostOptions,
  costOptions,
  setCostOptions,
}) {
  // holds the value for the select option, as this is a controlled component
  const [selVal, setSelVal] = useState("");

  const handleChange = (e) => {
    // e.preventDefault();
    if (e.target.type === "select-one") {
      // console.log(e.target.type);
      // set select element to new value
      setSelVal(e.target.value);
      // reset values then set user choice as true
      setCostOptions({ ...costOptions, costOverTimeDisp: e.target.value });
      // console.log(e.target.value);
      // console.log(costOptions);
    }
    if (e.target.type === "checkbox") {
      console.log(`${e.target.value} : ${e.target.checked}`);
      setCostOptions({ ...costOptions, [e.target.value]: e.target.checked });
      console.log(costOptions);
    }
  };

  useEffect(() => {
    console.log(`displayCostOptions: ${displayCostOptions}`);
  }, [displayCostOptions]);

  const stdChrgTipText =
    "Electricity companies add on a daily fee to your bill which is called a standing charge. This is for maintaining the network regardless of your personal energy use. Currently the standing charge is 46p.";
  const selOptTipText =
    "Display the cost with the selected hours and days over the course of the week, month, or year.";

  return (
    <section className="cost">
      <p>
        <span>&pound;</span>
        <span>{units}</span>
        <span>.</span>
        <span>{subUnits}</span>
      </p>

      <div className="options">
        <div>
          <label htmlFor="incStandCharge">Include standing charge</label>
          <input
            type="checkbox"
            id="incStandCharge"
            value="incStandCharge"
            onChange={handleChange}
            disabled={!displayCostOptions}
          />
          <ToolTip text={stdChrgTipText} />
        </div>

        <form>
          <label htmlFor="time-cost-sel">Show </label>
          <select
            name="time-cost-sel"
            value={selVal}
            onChange={handleChange}
            disabled={!displayCostOptions}
          >
            <option id="weekly" name="time_cost" value="weekly">
              weekly
            </option>
            <option id="monthly" name="time_cost" value="monthly">
              monthly
            </option>
            <option id="yearly" name="time_cost" value="yearly">
              yearly
            </option>
          </select>
          <label>
            &nbsp;cost
            <ToolTip text={selOptTipText} />
          </label>
        </form>
      </div>
    </section>
  );
}

export default Cost;
