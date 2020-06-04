import React from "react";
import TopNav from "../components/navigationComponents/topNav";
import BottomNav from "../components/navigationComponents/bottomNav";
import { Jumbotron, Row, Col, Button } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import "../styling/home.css";

export default class HomePage extends React.Component {
  render = () => {
    if (isMobile) {
      return (
        <React.Fragment>
          <TopNav />
          <div id="homePage">
            <Row id="row1" style={{margin: 'auto'}}>
              <Col style={{ marginTop: "100px" }}>
                <img
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                  src={require("../../assets/logo.svg")}
                  alt="Schulich Racing"
                />
              </Col>
            </Row>
            <Row id="row2" style={{margin: 'auto'}}>
              <Col>
                <p>
                  <b style={{ fontSize: "30px", marginBottom:"20px" }}>
                    Welcome to Schulich Velocity!
                  </b>
                </p>
                <p style={{ fontSize: "15px", marginLeft:'5px', marginRight:'5px', marginBottom:'30px'}}>
                  Schulich Velocity is telemetry software created for the SR21.
                  It is capable of receiving data from the SR21 at 60 Hz. This
                  data is stored, plotted, and analyzed in various ways to help
                  us make data driven decisions.
                </p>
                <Button id="streamingButton" href="/streaming" >
                  <b>Go to Streaming</b>
                </Button>
              </Col>
            </Row>
            <BottomNav />
          </div>
        </React.Fragment>
      );
    } else
      return (
        <div id="homePage">
          <TopNav />
          <Jumbotron>
            <Row id="row1">
              <Col>
                <img
                  id="logoImg"
                  src={require("../../assets/logo.svg")}
                  alt="Schulich Racing"
                />
              </Col>
            </Row>
            <Row id="row2">
              <Col>
                <p id="welcomeHeader">
                  <b>Welcome to Schulich Velocity!</b>
                </p>
                <p id="infoPara">
                  Schulich Velocity is telemetry software created for the SR21.
                  It is capable of receiving data from the SR21 at 60 Hz. This
                  data is stored, plotted, and analyzed in various ways to help
                  us make data driven decisions.
                </p>
                <Button id="streamingButton" href="/streaming">
                  <b>Go to Streaming</b>
                </Button>
              </Col>
            </Row>
          </Jumbotron>
          <BottomNav />
        </div>
      );
  };
}
