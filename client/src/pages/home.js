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
        <div id="content">
          <Row id='row1'>
            <div>
              <img id="backgroundImg"/>
              <div>
                <img id="logoImg" src={require("../assets/logo.svg")} alt="Schulich Racing" />
              </div>
              <div id="welcome">
                <b>Welcome to SR Velocity!</b>
              </div>
            </div>
          </Row>
          <Row id="row2">
            <Col>
              <h1 id="row2Title">What is SR Velocity?</h1>
              <div id="row2Underline"> </div>
            </Col>
            <Col>
              <p id="infoPara">
                SR Velocity is telemetry software created for current and future
                vehicles from the Schulich Racing team.
                It is capable of receiving data from the vehicle at a variable rate
                up to 60 Hz. This
                data is stored, plotted, and analyzed in various ways to help us
                make data driven decisions. We also have various internal systems
                that help us create, interpret, and distribute data.
              </p>
              <Button id="streamingButton" href="/streaming">
                <b>Go to Streaming</b>
              </Button>
            </Col>
          </Row>
          <Row id="row3">
            <Col>
              <img id="sr20Render" src={require("../assets/render.png")}/>
            </Col>
            <Col>
              <h1 id="row3Title">SR-20 Render</h1>
              <div id="row3Underline"></div>
            </Col>
          </Row>
        </div>
        <BottomNav />
      </div>
    );
  };
}
