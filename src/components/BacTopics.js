import React, { useState, useEffect } from "react";
import Logo1 from "../assets/logo1.png";
import Logo2 from "../assets/logo2.png";
import { Grid } from "@mantine/core";
import "./bac-topics.css";
import { useLocation } from "react-router-dom";
import Tun from "../assets/tun.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function BacTopics() {
  const navigate = useNavigate();
  const location = useLocation();

  const path = decodeURIComponent(
    location.pathname.split("/").join("-").slice(1)
  );
  const [section, matiere] = path.split("-");
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/getTopics")
      .then((response) => response.json())
      .then((data) => setTopics(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <>
      <Grid className="Grid">
        <Grid.Col span={4}>
          <div>
            <img src={Logo1} alt="Logo1" id="Logo1" />
          </div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div id="myDiv4">
            <p>مواضيع الباكالوريا و اصلاحها منذ 1994</p>
            <p>Toutes les épreuves du BAC tunisien et leurs corrigés</p>
          </div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div id="Div3">
            <img src={Logo2} alt="Logo2" id="Logo2" />
          </div>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span="auto"></Grid.Col>
        <Grid.Col span={6}>
          <div class="banner">
            <h1>
              {" "}
              <span className="Cont_tit">Section :</span>{" "}
              <span className="cont"> {section} </span>
            </h1>
            <h1>
              {" "}
              <span className="Cont_tit">Matiere :</span>
              <span className="cont"> {matiere} </span>
            </h1>
          </div>
          <table id="Topic_Table">
            <thead>
              <tr>
                <th rowSpan={2}>
                  <strong>Année</strong>
                </th>
                <th colSpan={2}>
                  <strong>Session Principale</strong>
                </th>
                <th colSpan={2}>
                  <strong>Session Controle</strong>
                </th>
              </tr>
              <tr>
                <th> Enoncé</th>
                <th> Corrigé</th>
                <th> Enoncé</th>
                <th> Corrigé</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic) => (
                <tr key={topic.id}>
                  <td>{topic.topicYear}</td>
                  <td>
                    {(() => {
                      try {
                        const pdfUrl = require(`../server/uploads/${path}_P_${topic.topicYear}.pdf`);
                        return (
                          <img
                            className="but_Topics"
                            src="https://img.icons8.com/external-prettycons-lineal-prettycons/49/00bfa6/external-file-file-types-prettycons-lineal-prettycons.png"
                            alt="logo_PDF"
                            onClick={() => {
                              window.open(pdfUrl, "_blank");
                            }}
                          />
                        );
                      } catch (error) {
                        return (
                          <span className="non_disponible">Non disponible</span>
                        );
                      }
                    })()}
                  </td>
                  <td>
                    {(() => {
                      try {
                        const pdfUrl = require(`../server/uploads/${path}_P_${topic.topicYear}_Corrige.pdf`);
                        return (
                          <img
                            className="but_Topics"
                            src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/00bfa6/external-pdf-file-online-learning-flatart-icons-outline-flatarticons.png"
                            alt="logo_PDF"
                            onClick={() => {
                              window.open(pdfUrl, "_blank");
                            }}
                          />
                        );
                      } catch (error) {
                        return (
                          <span className="non_disponible">Non disponible</span>
                        );
                      }
                    })()}
                  </td>

                  <td>
                    {(() => {
                      try {
                        const pdfUrl = require(`../server/uploads/${path}_C_${topic.topicYear}.pdf`);
                        return (
                          <img
                            className="but_Topics"
                            src="https://img.icons8.com/external-prettycons-lineal-prettycons/49/00bfa6/external-file-file-types-prettycons-lineal-prettycons.png"
                            alt="logo_PDF"
                            onClick={() => {
                              window.open(pdfUrl, "_blank");
                            }}
                          />
                        );
                      } catch (error) {
                        return (
                          <span className="non_disponible">Non disponible</span>
                        );
                      }
                    })()}
                  </td>
                  <td>
                    {(() => {
                      try {
                        const pdfUrl = require(`../server/uploads/${path}_C_${topic.topicYear}_Corrige.pdf`);
                        return (
                          <img
                            className="but_Topics"
                            src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/00bfa6/external-pdf-file-online-learning-flatart-icons-outline-flatarticons.png"
                            alt="logo_PDF"
                            onClick={() => {
                              window.open(pdfUrl, "_blank");
                            }}
                          />
                        );
                      } catch (error) {
                        return (
                          <span className="non_disponible">Non disponible</span>
                        );
                      }
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Grid.Col>
        <Grid.Col span="auto"></Grid.Col>
      </Grid>
      <Grid className="bottom-grid" id="footer_Topics">
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
export default BacTopics;
