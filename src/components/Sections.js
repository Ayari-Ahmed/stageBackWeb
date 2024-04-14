import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid } from "@mantine/core";
import "./Sections.css";
import Logo1 from "../assets/logo1.png";
import Logo2 from "../assets/logo2.png";
import Logo8 from "../assets/logo8.png";
import Tun from "../assets/tun.png";

export default function Sections() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/getSections"
        );
        setSections(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (sections.length !== 0) {
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
              <div>
    
        </div>
            </div>
            
            
          </Grid.Col>
          
          <Grid.Col span={4}>
            <div id="Div3">
              <img src={Logo2} alt="Logo2" id="Logo2" />
            </div>
          </Grid.Col>
        </Grid>
        <Link to="/Recherche" className="Lien" >
        <div id="logo_Recherche" >
          
          <h1>Recherche </h1>
            <img src={Logo8} alt="Logo2" />
            </div>
            </Link>
        <Grid
          justify="center"
          align="center"
          style={{ marginLeft: "3%", marginRight: "3%", marginTop: "5%" }}
        >
          
          {sections.map((section, index) => (
            <Grid.Col key={index} span={3}>
              <Link to={section.link} className="Lien">
                <div className="Section" id={`lien${index + 1}`}>
                  <img
                    src={require(`../assets/matieres/${section.image_url}`)}
                    alt={`Logo ${section.id}`}
                    style={{ cursor: "pointer" }}
                    id={`L${section.id}`}
                    className="Sections-Logos"
                  />
                  <h2>{section.section_name}</h2>
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
  } else {
    return <p>No data available.</p>;
  }
}
