import React from "react";

function DeviceMenuItem({ img, imgAlt, name }) {
  return (
    <article className="device-menu-item">
      <img src={img} alt={imgAlt} />
      <p>{name}</p>
      <div className="backgrnd-grad"></div>
    </article>
  );
}

export default DeviceMenuItem;
