import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Code, Grid } from "@mantine/core";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateMatiere() {
  const [matiere, setMatiereName] = useState("");
  const [section, setSectionName] = useState("");
  const [logo_matiere, setLogoMatiere] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getLogoMatieres")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const rows = data.map((element) => (
    <tr key={element.id} className="row_mat">
      <td className="T_Body_Mat">{element.matiere}</td>
      <td className="T_Body_Mat">{element.logo_matiere}</td>
      <td className="T_Body_Mat">
        <img src={element.logo_matiere} alt={element.matiere}></img>
      </td>
    </tr>
  ));

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put("http://localhost:3001/update_matiere/" + id, {
        matiere,
        section,
        logo_matiere,
      })
      .then((res) => {
        console.log(res);
        navigate("/DashBoard/Matieres");
      });
  }

  return (
    <Grid>
      <Grid.Col span={3}>
        <Box maw={340} mx="auto">
          <form onSubmit={handleSubmit}>
            <h1>Update matiere</h1>
            <TextInput
              label="Matiere Name"
              placeholder="Matiere Name"
              onChange={(e) => setMatiereName(e.target.value)}
            />
            <TextInput
              label="Section Du Matiere"
              placeholder="Section Du Matiere"
              mt="md"
              onChange={(e) => setSectionName(e.target.value)}
            />
            <TextInput
              label="Logo Matiere"
              placeholder="Logo Matiere"
              mt="md"
              onChange={(e) => setLogoMatiere(e.target.value)}
            />
            <Button type="submit" mt="md">
              Update matiere
            </Button>
          </form>
        </Box>
      </Grid.Col>
      <Grid.Col span={3}>
        <div>
          <table id="Table_Mat">
            <thead>
              <tr id="T_Head_Mat">
                <th>Matière</th>
                <th>Logo Matiere</th>
                <th>Logo</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </Grid.Col>
    </Grid>
  );
}

export default UpdateMatiere;
