import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid } from "@mantine/core";

import Logo1 from "./logos/logo1.png";
import Tun from "./logos/tun.png";
import Logo2 from "./logos/logo2.png";

export default function Economie_gestion() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/getSubjects/Economie et gestion"
        );
        setSubjects(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
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
                    src={subject.logo_matiere}
                    alt={"Logo : " + subject.matiere}
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
