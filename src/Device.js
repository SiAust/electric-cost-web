import React from "react";

import "./css/Device.css";

function Device({
  name,
  brand,
  desc,
  img,
  imgAlt,
  powerConsumptionWatts: { standby, idle, highLoad },
}) {
  // const [device, setDevices] = useState(props.device);

  // console.log(img);
  const NOT_APP = "N/A";

  return (
    <article className="device">
      <div className="flex-row">
        <img src={img} alt={imgAlt} />
        <div className="device-detail">
          <div>
            <h1>Name: {name}</h1>
            <h2>Brand: {brand}</h2>
            <h2>Power consumption (Watts):</h2>
          </div>
          <ul>
            <li>
              <span>standby: </span>
              <span>{standby || NOT_APP}</span>
            </li>
            <li>
              <span>idle: </span>
              <span>{idle || NOT_APP}</span>
            </li>
            <li>
              <span>high-load: </span>
              <span>{highLoad || NOT_APP}</span>
            </li>
          </ul>
        </div>
      </div>

      <p>{desc}</p>
    </article>
  );
}

export default Device;
