import React from "react";
import BottomNav from "../components/NavigationComponents/bottomNav";
import { Jumbotron, Row, Col, Button } from "react-bootstrap";
import TopNav from "../components/NavigationComponents/topNav";
import "./_styling/home.css";

export default class HomePage extends React.Component {
  render = () => {
    return (
      <div id="homePage">
        <TopNav />
        <Jumbotron>
          <Row id="row1">
            <Col>
              <img
                id="logoImg"
                src={require("../assets/logo.svg")}
                alt="Schulich Racing"
              />
            </Col>
          </Row>
          <Row id="row2">
            <Col>
              <p
                id="welcomeHeader"
                style={{ fontSize: "calc(0.9vw + 0.4vh + 0.8em)" }}
              >
                <b>Welcome to SR Velocity!</b>
              </p>
              <p
                id="infoPara"
                style={{
                  fontSize: "calc(0.9vw + 0.4vh + 0.8em)",
                  textAlign: "justify",
                }}
              >
                SR Velocity is telemetry software created for current and future
                vehicles from the Schulich Racing team.
                It is capable of receiving data from the vehicle at a variable rate
                up to 60 Hz. This
                data is stored, plotted, and analyzed in various ways to help us
                make data driven decisions. We also have various internal systems
                that help us create, interpret, and distribute data. 
              </p>
              <Button
                id="streamingButton"
                href="/streaming"
                style={{
                  marginTop: "30px",
                  width: "100%",
                  fontSize: "calc(0.9vw + 0.4vh + 0.8em)",
                }}
              >
                <b>Go to Streaming</b>
              </Button>
              <img
                src={require("../assets/render.png")}
                style={{ marginTop: "120px", width: "100%" }}
              />
            </Col>
          </Row>
        </Jumbotron>
        <BottomNav />
      </div>
    );
  };
}
