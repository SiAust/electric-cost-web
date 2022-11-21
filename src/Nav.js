import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  return (
    <section className="site-nav">
      <FontAwesomeIcon icon={faBars} />
    </section>
  );
}

export default Nav;
