import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo1 from "../assets/logo1.png";
import {
  IconHome,
  IconDatabaseImport,
  IconBoxMultiple,
  IconClipboardData,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import classes from "./NavbarSimple.module.css";
import Home from "./Login";
import Databases from "./Sections";
import Sections from "./Sections";
import Matieres from "./Recherche";
import OtherSettings from "./Sections";

function NavbarSimple() {
  const [active, setActive] = useState("Home");

  return (
    <div>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <div className={classes.header}>
            <img src={Logo1} alt="Logo1" className={classes.Logo1} />
          </div>
          <button
            className={classes.link}
            data-active={active === "Home" || undefined}
            onClick={() => setActive("Home")}
          >
            <IconHome className={classes.linkIcon} stroke={1.5} />
            <span>Home</span>
          </button>
          <Link
            className={classes.link}
            data-active={active === "Databases" || undefined}
            onClick={() => setActive("Databases")}
          >
            <IconDatabaseImport className={classes.linkIcon} stroke={1.5} />
            <span>Databases</span>
          </Link>
          <Link
            to={"Sections"}
            className={classes.link}
            data-active={active === "Sections" || undefined}
            onClick={() => setActive("Sections")}
          >
            <IconBoxMultiple className={classes.linkIcon} stroke={1.5} />
            <span>Sections</span>
          </Link>
          <Link
            to={"Matieres"}
            className={classes.link}
            data-active={active === "Matieres" || undefined}
            onClick={() => setActive("Matieres")}
          >
            <IconClipboardData className={classes.linkIcon} stroke={1.5} />
            <span>Matières</span>
          </Link>
        </div>

        <div className={classes.footer}>
          <Link to="/login" className={classes.link}>
            <IconLogout className={classes.linkIcon} stroke={2} />
            <span>
              <b>Deconnexion</b>
            </span>
          </Link>
        </div>
      </nav>

      <div id="Nav_Bar"></div>
    </div>
  );
}

export default NavbarSimple;
