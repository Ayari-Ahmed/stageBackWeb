import React, { useState, useEffect } from "react";
import { TextInput, Button, Box, Grid, Select } from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateMatiere() {
  const [selectedMatiere, setSelectedMatiere] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [section, setSectionName] = useState("");
  const navigate = useNavigate();
  const [matiere, setMatiere] = useState([]);
  const [transformedData1, setTransformedData1] = useState([]);
  const [transformedData2, setTransformedData2] = useState([]);
  const [section1, setSection] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getSubjects")
      .then((res) => {
        setSection(res.data);
        const transformedData2 = res.data.map((item) => ({
          value: item.section.toString(),
          label: item.section,
        }));
        setTransformedData2(transformedData2);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getMatieres1")
      .then((res) => {
        setMatiere(res.data);
        const transformedData1 = res.data.map((item) => ({
          value: item.matiere.toString(),
          label: item.matiere,
        }));
        setTransformedData1(transformedData1);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (!selectedMatiere) {
      // If no matiere selected, prevent form submission
      return;
    }

    axios
      .post("http://localhost:3001/create_Matiere", {
        matiere: selectedMatiere,
        section: selectedSection,
      })
      .then((res) => {
        console.log(res);
        navigate("/DashBoard/Matieres");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <Grid>
      
      <Grid.Col span={"auto"}>
        <Box maw={340} mx="auto">
          <h1>ADD Matière</h1>
          <form onSubmit={handleSubmit}>
            <Select
              variant="filled"
              size="lg"
              radius="xl"
              label="Matière"
              withAsterisk
              description="Choisissez une matière."
              placeholder="Matières"
              data={transformedData1}
              value={selectedMatiere} // Set value of the Select component to selectedMatiere
              onChange={(selectedOption) => {
                console.log(selectedOption); // Check selectedOption
                setSelectedMatiere(selectedOption);
              }}
            required
            />
            <Select
              variant="filled"
              size="lg"
              radius="xl"
              label="Section"
              withAsterisk
              description="Choisissez une section."
              placeholder="section"
              data={transformedData2}
              value={selectedSection} // Set value of the Select component to selectedMatiere
              onChange={(selectedOption) => {
                console.log(selectedOption); // Check selectedOption
                setSelectedSection(selectedOption);
              }}
              required
            />
            <Button type="submit" mt="md">
              ADD Matière
            </Button>
          </form>
        </Box>
      </Grid.Col>
    </Grid>
  );
}

export default CreateMatiere;
