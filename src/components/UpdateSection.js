import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Code } from "@mantine/core";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function UpdateSection() {
  const [sectionName, setSectionName] = useState("");
  const [image_url, setImage_url] = useState("");
  const [link, setLink] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put("http://localhost:3001/update/"+ id , {sectionName, image_url, link })
      .then((res) => {
        console.log(res);
        navigate("/DashBoard/Sections");
      });
  }
  return (
    <Box maw={340} mx="auto">
      <form onSubmit={handleSubmit}>
          <h1>Update Section</h1>
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
          Update
        </Button>
      </form>
    </Box>
  );
}

export default UpdateSection;
