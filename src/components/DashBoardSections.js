import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DashBoard_Sections.css";
import { IconDatabaseImport } from "@tabler/icons-react";
function DashBoardSections() {
  const [section, setSection] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getSections")
      .then((res) => setSection(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3001/delete/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1><IconDatabaseImport  stroke={2} /> DashBoard Sections </h1>
      <div className="d-flex vh-100  justify-content-center align-items-center" >
        <div className="w-50 bg-white rounded" id='ll'>
          <Link to="/create_Section" className="btn btn-success">
            Add +
          </Link>
          <br />
          <table>
            <thead>
              <tr>
                <th>Section Name</th>
                <th>Image URL</th>
                <th>Lien</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {section.map((data) => (
                <tr key={data.section_id}>
                  <td>{data.section_name}</td>
                  <td>{data.image_url}</td>
                  <td>{data.link}</td>
                  <td>
                    <Link to={`update/${data.id}`} className="btn btn-primary">
                      Update
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      </div>
    </>
  );
}

export default DashBoardSections;
