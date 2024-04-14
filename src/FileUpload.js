import React, { useState, useEffect } from "react";
import { Select, Button, Grid, Notification } from "@mantine/core";
import logo1 from "./assets/upload1.svg";
import logo2 from "./assets/upload2.svg";
import axios from "axios";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedMatiere, setSelectedMatiere] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [year, setYear] = useState("");
  const [corrige, setCorrige] = useState(""); // Add useState for corrige

  const [transformedData1, setTransformedData1] = useState([]);
  const [transformedData2, setTransformedData2] = useState([]);
  const [transformedData3, setTransformedData3] = useState([]);
  const [transformedData4, setTransformedData4] = useState([]);
  const [transformedData5, setTransformedData5] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const [warningNotification, setWarningNotification] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getSubjects")
      .then((res) => {
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
      .get("http://localhost:3001/api/getYears")
      .then((res) => {
        const transformedData3 = res.data.map((item) => ({
          value: item.topicYear.toString(),
          label: item.topicYear.toString(),
        }));
        setTransformedData3(transformedData3);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getMatieres1")
      .then((res) => {
        const transformedData1 = res.data.map((item) => ({
          value: item.matiere.toString(),
          label: item.matiere,
        }));
        setTransformedData1(transformedData1);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Fetch session data
    const sessionData = [
      { value: "P", label: "Principale" },
      { value: "C", label: "Controle" },
    ];
    setTransformedData4(sessionData);
  }, []);

  useEffect(() => {
    // Fetch session data
    const corrigeData = [
      { value: "", label: "Non Corrige" },
      { value: "_Corrige", label: "Corrige" },
    ];
    setTransformedData5(corrigeData);
  }, []);

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  async function handleUpload() {
    // Check if all options are selected
    if (
      !selectedFile ||
      !selectedSection ||
      !selectedMatiere ||
      !selectedSession ||
      !year
    ) {
      setWarningNotification(true);
      return;
    }

    setShowNotification(true);
    setWarningNotification(false);

    const filename = `${selectedSection}-${selectedMatiere}_${selectedSession}_${year}${corrige}.pdf`;
    const formData = new FormData();
    formData.append("file", selectedFile, filename);

    try {
      // Upload the file
      await axios.post("http://localhost:3001/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully");

      // Insert data into the database
      const dataToInsert = {
        filename: filename,
        matiere: selectedMatiere,
        section: selectedSection,
        session: selectedSession,
        year: year,
        corrige: corrige,
      };

      await axios.post("http://localhost:3001/api/insertData", dataToInsert);
      console.log("Data inserted into the database successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {
    if (showNotification) {
      const timeout = setTimeout(() => {
        setShowNotification(false);
      }, 5000); // Hide notification after 10 seconds

      return () => clearTimeout(timeout);
    }
  }, [showNotification]);
  useEffect(() => {
    if (warningNotification) {
      const timeout = setTimeout(() => {
        setWarningNotification(false);
      }, 3000); // Hide notification after 10 seconds

      return () => clearTimeout(timeout);
    }
  }, [warningNotification]);
  return (
    <>
      <Grid>
        <Grid.Col span="6">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Select
              variant="filled"
              size="lg"
              radius="xl"
              label="Matière"
              withAsterisk
              description="Choisissez une matière."
              placeholder="Matières"
              data={transformedData1}
              value={selectedMatiere}
              onChange={(selectedOption) => setSelectedMatiere(selectedOption)}
              required
            />
            <Select
              variant="filled"
              size="lg"
              radius="xl"
              label="Section"
              withAsterisk
              description="Choisissez une section."
              placeholder="Section"
              data={transformedData2}
              value={selectedSection}
              onChange={(selectedOption) => setSelectedSection(selectedOption)}
              required
            />
            <Select
              variant="filled"
              size="lg"
              radius="xl"
              label="Session"
              withAsterisk
              description="Choisissez la Session."
              placeholder="Session"
              data={transformedData4}
              value={selectedSession}
              onChange={(selectedOption) => setSelectedSession(selectedOption)}
              required
            />
            <Select
              variant="filled"
              size="lg"
              radius="xl"
              label="Année"
              withAsterisk
              description="Choisissez une Année."
              placeholder="Année"
              data={transformedData3}
              value={year}
              onChange={(selectedOption) => setYear(selectedOption)}
              required
            />
            <Select
              variant="filled"
              size="lg"
              radius="xl"
              label="Corrige"
              withAsterisk
              description="Choisissez Corrige."
              placeholder="Corrige"
              data={transformedData5}
              value={corrige}
              onChange={(selectedOption) => setCorrige(selectedOption)}
              required
            />
            <Button onClick={handleUpload} type="submit" mt="md">
              Upload
            </Button>
          </div>
        </Grid.Col>
        <Grid.Col span={6}>
          <img className="upload1" src={logo1} alt="logo1" />
          <div id="H1_Titre">
            <h1 className="H1_S">Téléverser Un Sujet Du BAC </h1>
          </div>
          <div id="mydiiiv1">
            <img
              src={logo2}
              alt="Logo"
              style={{
                position: "absolute",
                top: "15%",
                left: "40%",
                width: "30%",
              }}
            />
            <input
              type="file"
              onChange={handleFileChange}
              style={{
                marginTop: "5%",
                border: "2px solid #ccc", // border color
                borderRadius: "20px", // border radius
                padding: "10px", // padding
                backgroundColor: "rgb(232, 232, 232)", // background color
                fontSize: "16px", // font size
                width: "80%",
                height: "70%",
                boxSizing: "border-box", // box sizing
              }}
            />
            <div id="text_div">
              <h3>Upload BAC</h3>
            </div>
          </div>
        </Grid.Col>
      </Grid>
      {warningNotification && (
        <div id="mydiv_Notif1">
          <Notification
            title="Warning"
            color="red"
            style={{
              backgroundColor: "rgb(242, 242, 242)",
              boxShadow: "0 8px 6px rgba(0, 0, 0, 0.2)",
            }}
            className="mydiv_Notif"
            onClose={() => setWarningNotification(false)}
            closeButtonProps={{ "aria-label": "Hide notification" }}
          >
            Please select all options
          </Notification>
        </div>
      )}

      {showNotification && (
        <>
          <div id="mydiv_Notif">
            <Notification
              title="We notify you that"
              className="Notif"
              closeButtonProps={{
                visibility: "hidden",
                "aria-label": "Hide notification",
              }}
            >
              <div>Selected section: {selectedSection}</div>
            </Notification>
            <Notification
              title="We notify you that"
              className="Notif"
              closeButtonProps={{ "aria-label": "Hide notification" }}
            >
              <div>Selected matiere: {selectedMatiere}</div>
            </Notification>
            <Notification
              title="We notify you that"
              className="Notif"
              closeButtonProps={{ "aria-label": "Hide notification" }}
            >
              <div>Selected session: {selectedSession}</div>
            </Notification>
            <Notification
              title="We notify you that"
              className="Notif"
              closeButtonProps={{ "aria-label": "Hide notification" }}
            >
              <div>Selected year: {year}</div>
            </Notification>
            <Notification title="We notify you that" className="Notif">
              <div>Selected corrige: {corrige}</div>
            </Notification>
          </div>
        </>
      )}
    </>
  );
}

export default FileUpload;
