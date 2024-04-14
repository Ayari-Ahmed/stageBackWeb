import Logo1 from "./assets/logo1.png";
import Logo2 from "./assets/logo2.png";
import Logo4 from "./assets/logo4.png";
import Logo5 from "./assets/logo5.png";
import Logo6 from "./assets/logo6.png";
import Logo7 from "./assets/logo7.png";
import Tun from "./assets/tun.png";
import "./Home.css";
import { Accordion, Grid, Group, Avatar, Text, Button } from "@mantine/core";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import PrintTopics from "./pages/print-topics";
import BacTopics from "./components/BacTopics";

function AccordionLabel({ label, image, description }) {
  return (
    <Group wrap="nowrap">
      <Avatar src={image} radius="xl" size="lg" />
      <div>
        <Text>{label}</Text>
        <Text size="sm" c="dimmed" fw={400}>
          {description}
        </Text>
      </div>
    </Group>
  );
}

function Home() {
  const charactersList = [
    {
      id: "bender",
      image: "https://img.icons8.com/nolan/64/7DE3C3/0BA360/print.png",
      label: "مواضيع جاهزة للطباعة",
      description: " 2012 مواضيع جاهزة للطباعة منذ ",
      content:
        "نقدم لكم مجموعة متنوعة من المواضيع المخصصة لامتحانات البكالوريا، مُصممة لتسهيل عملية الاستعداد للتلاميذ. تشمل المواضيع تغطية شاملة للمناهج الدراسية والمواد الرئيسية التي تُدرَّس في البكالوريا",
    },

    {
      id: "carol",
      image: "https://img.icons8.com/nolan/64/7DE3C3/0BA360/block-chain.png",
      label: "مواضيع البكالوريا واصلاحها",
      description: "مواضيع البكالوريا واصلاحها منذ 1994",
      content:
        ' نرحب بك في موقعنا المخصص لطلاب البكالوريا! نقدم لك مجموعة متنوعة من "مواضيع البكالوريا وإصلاحها" لتسهيل رحلتك التحضيرية للامتحانات وبذلك يشمل موقعنا تغطية شاملة لمواد امتحانات البكالوريا السابقة ',
    },
  ];
  const accordionItems = charactersList.map((item) => (
    <Accordion.Item value={item.id} key={item.label}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="sm">{item.content}</Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <>
      <Grid className="Grid">
        <Grid.Col span={4}>
          <div>
            <img src={Logo1} alt="Logo1" id="Logo1" />
          </div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div id="Div2">
            <p className="logo-text">موقع الباكالوريا</p>
            <img src={Logo4} alt="Logo4" id="Logo4" />
          </div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div id="Div3">
            <img src={Logo2} alt="Logo2" id="Logo2" />
          </div>
        </Grid.Col>
      </Grid>

      <div id="myDiv4">
        <p>مواضيع الباكالوريا و اصلاحها منذ 1994</p>
        <p>Toutes les epreuves du BAC tunisien et leurs corriges</p>
      </div>

      <Grid>
        <Grid.Col span={4}>
          <div>
            <img src={Logo5} alt="Logo5" id="Logo5" />
          </div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div id="myDiv5">
            <Accordion
              chevronPosition="right"
              variant="contained"
              style={{
                backgroundColor: "#b6c8bf7a",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: 7,
              }}
            >
              {accordionItems}
            </Accordion>
            <div id="myDiv6">
              <Group justify="center">
                <Link to="/print-topics">
                  <Button color="cyan" className="responsive-button" id="butt">
                    المواضيع الجاهزة للطباعة
                  </Button>
                </Link>
                <Link to="/Sections">
                  <Button color="pink" className="responsive-button" id="butt">
                    مواضيع البكالوريا واصلاحها
                  </Button>
                </Link>
              </Group>
            </div>
          </div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>
            <img src={Logo7} alt="Logo7" id="Logo7" />
          </div>
        </Grid.Col>
      </Grid>

      <Grid className="bottom-grid">
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

export default Home;
