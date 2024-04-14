import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logg from "../assets/login1.svg"
import Logg1 from "../assets/login.svg"
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./log.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3001/login", {
        username,
        password,
      })
      .then((res) => {
        console.log(res);
        navigate("/DashBoard");
      })
      .catch((error) => {
        console.error(
          "Login failed:",
          error.response?.data?.error || error.message
        );
        setError("Invalid username or password . Please try again . ");
      });
  }

  return (
    <div className="cont_log">
      <form onSubmit={handleSubmit}>
        <MDBContainer fluid className="p-3 my-5">
          <MDBRow>
            <MDBCol col="10" md="6">
            
              <img
              style={{width : "70%"}}
                src={Logg}
                className="img-fluid"
                alt="logo1"
              />
              <img
              style={{width : "40%" , float : "right"}}
                src={Logg1}
                className="img-fluid"
                alt="logo2"
              />
            </MDBCol>
            <MDBCol col="4" md="6">
              <div className="login_div">
                <h1>Login Admin</h1>
                <br />
                <h2 className="left">User Name :</h2>
                <MDBInput
                  wrapperClass="mb-4"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="formControlLg"
                  type="text"
                  size="lg"
                />
                <h2 className="left">Password :</h2>
                <MDBInput
                  wrapperClass="mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="formControlLg"
                  type="password"
                  size="lg"
                />
                <div className="d-flex justify-content-between mx-4 mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Remember me"
                  />
                </div>
                <MDBBtn
                  type="button"
                  className="mb-4 w-100"
                  id="b"
                  size="lg"
                  onClick={handleSubmit}
                >
                  Sign in
                </MDBBtn>
                {error && <div style={{ color: "red" }}>{error}</div>}
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </form>
    </div>
  );
};

export default Login;
