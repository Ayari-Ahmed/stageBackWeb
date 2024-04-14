import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid } from "@mantine/core";

import Logo1 from "./logos/logo1.png";
import Tun from "./logos/tun.png";
import Logo2 from "./logos/logo2.png";

export default function Mathematiques() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/getSubjects/Mathematiques"
        );
        setSubjects(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getLogoSrc = (name) => {
    switch (name) {
      case "Mathematiques":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/calculator--v1.png";
      case "Informatique":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/imac.png";
      case "Disc. techniques":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/settings-3.png";
      case "Sciences physiques":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/physics.png";
      case "Sciences de la vie et de la terre":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/microscope.png";
      case "Gestion":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/financial-growth-analysis.png";
      case "Economie":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/profit-analysis.png";
      case "Anglais":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/abc.png";
      case "Arabe":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/book-and-pencil.png";
      case "Français":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/glossary.png";
      case "Hist et geo":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/globe-earth.png";
      case "Philosophie":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/books-1.png";
      case "Allemand":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/open-book.png";
      case "Espagnol":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/storytelling.png";
      case "Russe":
        return "https://img.icons8.com/external-icongeek26-outline-icongeek26/64/00bfa6/external-cathedral-of-saint-basil-russia-icongeek26-outline-icongeek26.png";
      case "Chinois":
        return "https://img.icons8.com/external-glyph-wichaiwi/64/00bfa6/external-china-chinese-new-year-glyph-wichaiwi.png";
      case "Turque":
        return "https://img.icons8.com/external-outline-wichaiwi/64/00bfa6/external-european-european-cities-landmarks-outline-wichaiwi.png";
      case "Portugais":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/books.png";
      case "Italien":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/love-book.png";
      case "Education Musicale":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/music-library.png";
      case "Arts & Plastiques":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/microsoft-paint.png";
      case "Theatre":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/off-book.png";
      case "Sport":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/running.png";
      case "Pensee islamique":
        return "https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/00bfa6/external-quran-islam-and-ramadan-flatart-icons-outline-flatarticons.png";
      case "Algorithmes":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/code--v1.png";
      case "Bases de donnees":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/database.png";
      default:
        return "";
    }
  };
  if (subjects != []) {
    return (
      <>
        <Grid>
          <Grid.Col span={4}>
            <div>
              <img src={Logo1} alt="Logo1" id="Logo1" />
            </div>
          </Grid.Col>
          <Grid.Col span={4}>
            <div id="myDiv4">
              <p>مواضيع الباكالوريا و اصلاحها منذ 1994</p>
              <p>Toutes les epreuves du BAC tunisien et leurs corriges</p>
            </div>
          </Grid.Col>
          <Grid.Col span={4}>
            <div id="Div3">
              <img src={Logo2} alt="Logo2" id="Logo2" />
            </div>
          </Grid.Col>
        </Grid>
        {subjects.length > 0 && (
          <h1>
            {" "}
            <span className="Cont_tit" style={{ textTransform: "uppercase" }}>
              Section :
            </span>{" "}
            <span className="cont" style={{ textTransform: "uppercase" }}>
              {" "}
              {subjects[0].section}
            </span>
          </h1>
        )}
        <Grid
          justify="center"
          align="center"
          style={{ marginLeft: "3%", marginRight: "3%", marginTop: "5%" }}
        >
          {subjects.map((subject, index) => (
            <Grid.Col key={index} span={3}>
              <Link
                className="Lien"
                to={"/" + subject.section + "/" + subject.matiere}
              >
                <div className="Matieres">
                  <img
                    src={getLogoSrc(subject.matiere)}
                    alt={`Logo : ${subject.matiere}`}
                  />

                  <h2>{subject.matiere}</h2>
                </div>
              </Link>
            </Grid.Col>
          ))}
        </Grid>
        <Grid className="bottom-grid" id="footer">
          <Grid.Col span={4}>
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
          <Grid.Col span={4}>
            <div>
              <img src={Logo1} alt="Logo1" className="L_Footer" />
            </div>
          </Grid.Col>
        </Grid>
      </>
    );
  }
}
