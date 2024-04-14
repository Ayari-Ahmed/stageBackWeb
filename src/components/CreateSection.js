import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Code } from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CreateSection() {
  const [sectionName, setSectionName] = useState("");
  const [image_url, setImage_url] = useState("");
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3001/create_Section", {
        sectionName,
        image_url,
        link,
      })
      .then((res) => {
        console.log(res);
        navigate("/DashBoard/Sections");
      });
  }
  return (
    <Box maw={340} mx="auto">
      <form onSubmit={handleSubmit}>
        <h1>ADD Section</h1>
        <TextInput
          label="Section Name"
          placeholder="Section Name"
          onChange={(e) => setSectionName(e.target.value)}
        />
        <TextInput
          label="Image URL"
          placeholder="Image URL"
          mt="md"
          onChange={(e) => setImage_url(e.target.value)}
        />
        <TextInput
          label="Link"
          placeholder="Link"
          mt="md"
          onChange={(e) => setLink(e.target.value)}
        />
        <Button type="submit" mt="md">
          ADD
        </Button>
      </form>
    </Box>
  );
}

export default CreateSection;
