import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { timerCalc, presetCalc } from "./CalcUtility";

// Components
import Nav from "./Nav";
import Presets from "./Presets";
import Timer from "./Clock";
import DeviceList from "./DeviceList";
import Device from "./Device";
import Cost from "./Cost";

// CSS
import "./css/App.css";
import "./css/CostCalculator.css";
import "./css/DeviceDropMenu.css";
import "./css/Time.css";

// Test data
import { data } from "./resources/test_data.js";

function App() {
  const [dispDevicesMenu, setDisplayDevices] = useState(false);

  /* Presets */
  const [showPresets, setShowPresets] = useState(false);
  const [preset, setPreset] = useState(data[0].presets[0]);

  /* == End Presets == */

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

  // state for cost in units and subunits
  const [units, setUnits] = useState("0");
  const [subUnits, setSubUnits] = useState("00");

  /* Time menu */
  const showPresetMenu = () => {
    setShowPresets(true);
  };

  const showTimerMenu = () => {
    setShowPresets(false);
  };

  /* string representing css class to display visual feedback on selected menu */
  const selected = "selected";
  /* == End Time menu == */

  /* Device menu */
  const showDeviceMenu = () => {
    setDisplayDevices((prev) => !prev);
    // console.log(`display devices clicked ${dispDevicesMenu}`);
  };

  useEffect(() => {
    // TODO tidy all this up. Refactor to just single CSS animation
    const svg = document.getElementById("device-menu-svg");
    const menuGroup = document.querySelector(".menu-search-grp");
    const menuItems = document.querySelector(".menu-items-container");
    const devicesDropMenu = document.querySelector(".devices-drop-menu");

    /* menu is closed, open */
    if (!svg.classList.contains("animated-device-menu")) {
      svg.classList.add("animated-device-menu");
      menuGroup.classList.add("search-menu-grp-open");
      menuItems.classList.add("show-menu-items-container");
      devicesDropMenu.classList.remove("z-delay");
      // console.log(`click animation: classList: ${svg.classList}`);
      return;
    }
    /* menu is open, close */
    // console.log(`click animation: classList: ${svg.classList}`);
    svg.classList.remove("animated-device-menu");
    menuGroup.classList.remove("search-menu-grp-open");
    menuItems.classList.remove("show-menu-items-container");
    devicesDropMenu.classList.add("z-delay");
  }, [dispDevicesMenu]);

  /* == End Device menu == */

  /* -- Calculations on re-render -- */

  /* Cost calc */
  useEffect(() => {
    if (showPresets) {
      // use Preset calculation

      /* If there are no Presets, set the cost to 0.00 and don't calculate anything */
      let costVals = [];
      console.log(`costVals ${costVals}`);
      if (data[deviceIndex].presets.length !== 0) {
        costVals = [
          ...presetCalc(
            data[deviceIndex].powerConsumptionWatts.highLoad,
            preset.minutes
          ),
        ];
        console.log(costVals);

        // console.log(`costVals ${costVals}`);
      } else {
        costVals = ["0", "00"];
        console.log(costVals);
        console.log(costVals);
      }

      setUnits(costVals[0]);
      setSubUnits(costVals[1]);

      console.log(
        `Preset calc: watts=${data[deviceIndex].powerConsumptionWatts.highLoad} mins=${preset.minutes}`
      );
    } else {
      // otherwise use Timer calculation
      const [units, subUnits] = timerCalc(
        data[deviceIndex].powerConsumptionWatts.highLoad,
        hours,
        days,
        costOptions
      );
      setUnits(units);
      setSubUnits(subUnits);
      console.log(
        `Timer calc: watts=${data[deviceIndex].powerConsumptionWatts.highLoad} hours=${hours} days=${days} costOptions.costOverTimeDisp=${costOptions.costOverTimeDisp} costOptions.incStandingCharge=${costOptions.incStandCharge}`
      );
    }

    // calcCost(days, hours);
  }, [days, hours, costOptions, deviceIndex, preset, showPresets]);

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
          <div className="time-and-cost-container border-top-btm">
            <div className="time-container">
              <div className="time-menu">
                <button
                  type="button"
                  id="showPresetMenu"
                  className={`time-menu-btn ${showPresets && selected}`}
                  onClick={showPresetMenu}
                >
                  Presets
                </button>
                <button
                  type="button"
                  id="showTimerMenu"
                  className={`time-menu-btn ${!showPresets && selected}`}
                  onClick={showTimerMenu}
                >
                  Timer
                </button>
              </div>
              {showPresets && (
                <Presets
                  presets={data[deviceIndex].presets}
                  setPreset={setPreset}
                />
              )}
              {!showPresets && (
                <Timer
                  days={days}
                  hours={hours}
                  setDays={setDays}
                  setHours={setHours}
                />
              )}
            </div>
            <Cost
              currencyCode={163}
              units={units}
              subUnits={subUnits}
              displayCostOptions={!showPresets}
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
