import { React, useState } from "react";
import "./DashBoard.css";
import { Grid } from "@mantine/core";
import Logo1 from "../assets/logo1.png";
import Tun from "../assets/tun.png";
import { Link, useLocation } from "react-router-dom";
import {
  IconHome,
  IconDatabaseImport,
  IconBoxMultiple,
  IconClipboardData,
  IconLogout,
} from "@tabler/icons-react";
import classes from "./NavbarSimple.module.css";
export default function DashBoard() {
  const [active, setActive] = useState("Home");
  const [iframeSrc, setIframeSrc] = useState("/");

  const location = useLocation();

  const handleLinkClick = (newSrc) => {
    const currentPath = location.pathname;
    const defaultSrc = "/"; // Set your default path here

    setIframeSrc(newSrc !== currentPath ? newSrc : defaultSrc);
  };
  return (
    <>
      <Grid>
        <Grid.Col span="content">
          <div id="Nav_Bar">
            <nav className={classes.navbar}>
              <div className={classes.navbarMain}>
                <div className={classes.header}>
                  <img src={Logo1} alt="Logo1" className={classes.Logo1} />
                </div>
                <Link
                  className={classes.link}
                  data-active={active === "Home" || undefined}
                  onClick={() => {
                    setActive("Home");
                    handleLinkClick("/");
                  }}
                >
                  <IconHome className={classes.linkIcon} stroke={1.5} />
                  <span>Accueil</span>
                </Link>
                <Link
                  className={classes.link}
                  data-active={active === "Sections" || undefined}
                  onClick={() => {
                    setActive("Sections");
                    handleLinkClick("/DashBoard/Sections");
                  }}
                >
                  <IconBoxMultiple className={classes.linkIcon} stroke={1.5} />
                  <span>Sections</span>
                </Link>
                <Link
                  className={classes.link}
                  data-active={active === "Matieres" || undefined}
                  onClick={() => {
                    setActive("Matieres");
                    handleLinkClick("/DashBoard/Matieres");
                  }}
                >
                  <IconClipboardData
                    className={classes.linkIcon}
                    stroke={1.5}
                  />
                  <span>Matières</span>
                </Link>
                <Link
                  className={classes.link}
                  data-active={active === "Bacs" || undefined}
                  onClick={() => {
                    setActive("Bacs");
                    handleLinkClick("/DashBoard/FileUpload");
                  }}
                >
                  <IconDatabaseImport
                    className={classes.linkIcon}
                    stroke={1.5}
                  />
                  <span>Bacs</span>
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
          </div>
        </Grid.Col>
        <Grid.Col span={"auto"}>
          <div id="Boodyy">
            <iframe
              title="Embedded Content"
              width="100%"
              height="100%"
              src={iframeSrc}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </Grid.Col>
      </Grid>
      <Grid className="bottom-grid" id="Fo">
        <Grid.Col span={6}>
          <div>
            <br />
            <img src={Tun} alt="Tunisian Flag" className="Tunisian_Flag" />
          </div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>
            <br />
            <br />
            <p id="text-footer">
              المركز الوطني للتكنولوجيات في التربية : جميع الحقوق محفوظة
              1994-2023
            </p>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}
