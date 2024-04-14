import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import BacTopics from "./components/BacTopics";
import Print from "./pages/print-topics";
import Login from "./components/Login";
import Recherche from "./components/Recherche";
import { MantineProvider } from "@mantine/core";
import Sections from "./components/Sections";
import Science from "./components/Matiere/Science";
import Mathematiques from "./components/Matiere/Mathematiques";
import Technique from "./components/Matiere/Technique";
import Economie_gestion from "./components/Matiere/Economie_gestion";
import Informatique from "./components/Matiere/Informatique";
import Lettres from "./components/Matiere/Lettres";
import Sport from "./components/Matiere/Sport";
import DashBoard from "./components/DashBoard";
import DashBoard_Sections from "./components/DashBoardSections";
import CreateSection from "./components/CreateSection";
import UpdateSection from "./components/UpdateSection";
import DashBoardMatieres from "./components/DashBoardMatieres";
import CreateMatiere from "./components/CreateMatiere";
import UpdateMatiere from "./components/UpdateMatiere";
import Test from "./components/Test";
import MyIframeComponent from "./components/MyIframeComponent";
import FileUpload from "./FileUpload";

import FileList from "./components/FileList";
const App = () => {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/FileUpload" element={<FileUpload />} index />

          <Route path="/" element={<Home />} index />
          <Route path="/recherche" element={<Recherche />} />
          <Route path="/print-topics" element={<Print />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/Science" element={<Science />} />
          <Route path="/Mathematiques" element={<Mathematiques />} />
          <Route path="/Economie-gestion" element={<Economie_gestion />} />
          <Route path="/Technique" element={<Technique />} />
          <Route path="/Lettres" element={<Lettres />} />
          <Route path="/Informatique" element={<Informatique />} />
          <Route path="/Sport" element={<Sport />} />
          <Route path="/Mathematiques/*" element={<BacTopics />} />
          <Route path="/Sciences Experimentales/*" element={<BacTopics />} />
          <Route path="/Economie et gestion/*" element={<BacTopics />} />
          <Route path="/Technique/*" element={<BacTopics />} />
          <Route path="/Lettres/*" element={<BacTopics />} />
          <Route path="/Sport/*" element={<BacTopics />} />
          <Route path="/Informatique/*" element={<BacTopics />} />


          <Route path="/login" element={<Login />} />

          <Route path="/DashBoard/Sections" element={<DashBoard_Sections />} />
          <Route path="/DashBoard/Matieres" element={<DashBoardMatieres />} />
          <Route path="/DashBoard/FileUpload" element={<FileUpload />} />

          <Route path="/FileList" element={<FileList />} />
          <Route path="/DashBoard" element={<DashBoard />} />
          <Route
            path="DashBoard/Sections/update/:id"
            element={<UpdateSection />}
          />
          <Route
            path="DashBoard/Matieres/update_matiere/:id"
            element={<UpdateMatiere />}
          />
          <Route path="/create_Section" element={<CreateSection />} />
          <Route path="/create_Matiere" element={<CreateMatiere />} />
          <Route path="/test" element={<Test />} />
          <Route path="/MyIframeComponent" element={<MyIframeComponent />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export default App;
