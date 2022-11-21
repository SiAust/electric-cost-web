import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronRight } from "@fortawesome/free-solid-svg-icons";

// Components
import Nav from "./Nav";
import Clock from "./Clock";
import DeviceList from "./DeviceList";
import Device from "./Device";
import Cost from "./Cost";

// CSS
import "./css/App.css";
import "./css/CostCalculator.css";
import "./css/DeviceDropMenu.css";

import { data } from "./resources/test_data.js";

function App() {
  const [dispDevicesMenu, setDisplayDevices] = useState(false);

  // lifting state up from Clock
  const [days, setDays] = useState(1);
  const [hours, setHours] = useState(1);
  // console.log(days, hours, mins);

  // index value from devices menu
  const [deviceIndex, setDeviceIndex] = useState(0);

  const [costOptions, setCostOptions] = useState({
    incStandCharge: false,
    costOverTimeDisp: "weekly",
  });

  const elecPricePerKwh = 0.34;
  const standingCharge = 0.46;

  // state for cost in units and fractions
  const [units, setUnits] = useState("0");
  const [frac, setFrac] = useState("00");

  const calcCost = (days, hours) => {
    const kiloWattHours =
      (data[deviceIndex].powerConsumptionWatts.highLoad * hours) / 1000;

    let cost = 0;

    cost += kiloWattHours * elecPricePerKwh * days;

    let standingChargeAdjustment = 1;

    if (costOptions.costOverTimeDisp === "monthly") {
      // calc electric cost for month (4 weeks)
      cost *= 4;
      standingChargeAdjustment = 4;
    }

    if (costOptions.costOverTimeDisp === "yearly") {
      // calc electric cost for year (52 weeks)
      cost *= 52;
      standingChargeAdjustment = 52;
    }

    if (costOptions.incStandCharge) {
      cost += standingCharge * (days * standingChargeAdjustment);
    }
    // console.log(`cost ${cost}`);
    const costStr = cost.toFixed(2); // limit to two decimal places

    // split the units from the fractional part
    const unitsStr = costStr.split(".");
    // console.log(`kiloWatts: ${kiloWattHours}`);
    // console.log(`costStr ${costStr}`);
    setUnits(unitsStr[0]);
    setFrac(unitsStr[1]);
  };

  const showDeviceMenu = () => {
    setDisplayDevices((prev) => !prev);
    console.log(`display devices clicked ${dispDevicesMenu}`);
  };

  /* Device menu animations */
  useEffect(() => {
    const svg = document.getElementById("device-menu-svg");
    const menuGroup = document.querySelector(".menu-search-grp");
    const menuItems = document.querySelector(".menu-items-container");

    /* menu is closed, open */
    if (!svg.classList.contains("animated-device-menu")) {
      svg.classList.add("animated-device-menu");
      menuGroup.classList.add("search-menu-grp-open");
      menuItems.classList.add("show-menu-items-container");
      // console.log(`click animation: classList: ${svg.classList}`);
      return;
    }
    /* menu is open, close */
    // console.log(`click animation: classList: ${svg.classList}`);
    svg.classList.remove("animated-device-menu");
    menuGroup.classList.remove("search-menu-grp-open");
    menuItems.classList.remove("show-menu-items-container");
  }, [dispDevicesMenu]);

  useEffect(() => {
    calcCost(days, hours);
    console.log(costOptions);
  }, [days, hours, costOptions, deviceIndex]);

  return (
    <>
      <nav>
        <Nav />
      </nav>
      <div className="App">
        <header id="devices-drop-header">
          <div className="header-grp" onClick={showDeviceMenu}>
            <FontAwesomeIcon icon={faChevronRight} id="device-menu-svg" />
            <h2>Devices</h2>
          </div>
          <DeviceList
            data={data}
            setDeviceIndex={setDeviceIndex}
            /* dispDevicesMenu={dispDevicesMenu} */
          />
        </header>
        <div className="cost-calc">
          <Device {...data[deviceIndex]} />
          <div className="ttl-cost-grp border-top-btm">
            <Clock
              days={days}
              hours={hours}
              setDays={setDays}
              setHours={setHours}
            />
            <Cost
              currencyCode={163}
              units={units}
              fractions={frac}
              costOptions={costOptions}
              setCostOptions={setCostOptions}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
