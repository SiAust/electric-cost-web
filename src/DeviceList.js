import React, { useState, useEffect } from "react";
// import Device from "./Device";
import DeviceMenuItem from "./DeviceMenuItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Data
// import { data } from "./devices_data.js";

function DeviceList({ data, setDeviceIndex }) {
  const [devices, setDevices] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [selectedId, setSelectedId] = useState(-1);

  // const url = "https://api.github.com/users";

  // const getDevices = async () => {
  //   const response = await fetch(url);
  //   // console.log(response.text());
  //   const devices = await response.json();
  //   console.log(`devices ${devices}`);
  //   setDevices(devices);
  // };

  useEffect(() => {
    // getDevices();
    console.log(data);
    setDevices(data);
  }, []);

  // sets the deviceIndex to the id of the clicked menu item
  const handleClick = (id) => {
    setDeviceIndex(id);

    setSelectedId(id);

    console.log(`id: ${id} selectedId: ${selectedId}`);
  };

  const handleInputChange = (event) => {
    setInputVal(event.target.value);
    console.log(`input text ${event.target.value}`);
  };

  useEffect(() => {
    setDevices((prev) => {
      console.log(prev); // TODO improve this filtering
      if (prev.length === 0 || inputVal.length === 0) {
        prev = data;
      }
      return prev.filter((device) => device.name.startsWith(inputVal));
      // return data;
    });
  }, [inputVal]);

  return (
    <div className="devices-drop-menu">
      <div className="menu-search-grp">
        <label htmlFor="search">Search:</label>
        <input
          name="search"
          type="text"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <ul className="menu-items-container">
        {devices.map((device) => (
          <li
            key={device.id}
            onClick={() => handleClick(device.id)}
            className={device.id === selectedId ? "selected" : ""}
          >
            <DeviceMenuItem {...device} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeviceList;
