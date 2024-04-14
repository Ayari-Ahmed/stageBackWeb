import React, { useState } from "react";
import logo1 from "../assets/upload1.svg";
import "./DashBoard.css";
import { Button, Grid } from "@mantine/core";

export default function Bac_Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3001/api/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("File uploaded successfully");
        // Handle success
      } else {
        console.error("Failed to upload file");
        // Handle failure
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Grid>
      <Grid.Col span={"auto"}>
        <form onSubmit={handleSubmit}>
          <img className="upload1" src={logo1} alt="logo1" />
          <h1>Upload BAC</h1>
          <input type="file" onChange={handleFileChange} />
          <Button type="submit" mt="md" disabled={!file}>
            Upload
          </Button>
        </form>
      </Grid.Col>
    </Grid>
  );
}
