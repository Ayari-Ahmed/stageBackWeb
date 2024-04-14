import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Code, Grid } from "@mantine/core";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FileList  from "./FileList"
function Test() {

  return (
    <div>
      <FileList filename="Mathematiques-Mathematiques_P_2017_Corrige.pdf" />
    </div>
  );
}

export default Test;
