import React from "react";
import Sidebar from "react-sidebar";
import Cookie from "js-cookie";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "../../styling/sideNavMobile.css";
import { FreeFormPattern } from "@arction/lcjs";
import Data from "../../../data";

class SideNavMobileStreaming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  startTestRun() {
    Data.getInstance().doTestRun();
  }

  componentDidMount() {
    document.ontouchmove = (event) => {
      event.preventDefault();
    };
  }

  changeContent(newContent) {
    console.log(newContent);
    this.onSetSidebarOpen(false);
    this.props.streamingContent.current.changeContentMobile(newContent);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    let signInLink = null;
    if (!Cookie.get("token")) {
      signInLink = (
        <Row
          style={{ color: "grey", margin: "auto" }}
          onClick={() => {
            this.changeContent("currentData");
          }}
        >
          <Col style={{ margin: "10px" }}>
            <Link to="/signin" style={{ fontSize: "25px", color: "grey" }}>
              Sign In
            </Link>
          </Col>
        </Row>
      );
    }
    return (
      <React.Fragment>
        <div style={{ position: "fixed", zIndex: "1000" }}>
          <Button
            onClick={() => {
              this.onSetSidebarOpen(!this.state.sidebarOpen);
            }}
            style={{ width: "100%", background: "#cc2d2d" }}
          >
            <GiHamburgerMenu />
          </Button>
        </div>
        <Sidebar
          sidebar={
            <React.Fragment>
              <Row
                style={{
                  background: "#cc2d2d",
                  color: "white",
                  margin: "auto",
                }}
              >
                <Col style={{ margin: "10px" }}>
                  <Link to="/home" style={{ fontSize: "30px", color: "white" }}>
                    Schulich Velocity
                  </Link>
                </Col>
              </Row>
              <Row
                style={{ color: "grey", margin: "auto" }}
                onClick={() => {
                  this.changeContent("plotting");
                }}
              >
                <Col style={{ margin: "10px" }}>
                  <p style={{ fontSize: "25px" }}>Plotting</p>
                </Col>
              </Row>
              <Row
                style={{ color: "grey", margin: "auto" }}
                onClick={() => {
                  this.changeContent("currentData");
                }}
              >
                <Col style={{ margin: "10px" }}>
                  <p style={{ fontSize: "25px" }}>Current Data</p>
                </Col>
              </Row>
              <Row style={{ margin: "auto" }}>
                <Col>
                  <hr
                    style={{
                      color: "#000000",
                      backgroundColor: "#000000",
                      height: 0.5,
                      borderColor: "#000000",
                      width: "90%",
                    }}
                  />
                </Col>
              </Row>
              <Row
                style={{ color: "grey", margin: "auto" }}
                onClick={() => {
                  this.changeContent("currentData");
                }}
              >
                <Col style={{ margin: "10px" }}>
                  <Link to="/about" style={{ fontSize: "25px", color: "grey" }}>
                    About
                  </Link>
                </Col>
              </Row>
              {signInLink}
              <Row style={{ margin: "auto" }}>
                <Col>
                  <hr
                    style={{
                      color: "#000000",
                      backgroundColor: "#000000",
                      height: 0.5,
                      borderColor: "#000000",
                      width: "90%",
                    }}
                  />
                </Col>
              </Row>
              <Row style={{ margin: "auto" }}>
                <Col style={{ margin: "10px" }}>
                  <Button
                    onClick={() => {
                      this.startTestRun();
                    }}
                    style={{ width: "100%", background: "#cc2d2d" }}
                  >
                    Test Run
                  </Button>
                </Col>
              </Row>
            </React.Fragment>
          }
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{
            sidebar: {
              zIndex: "1001",
              background: "white",
            },
          }}
        ></Sidebar>
      </React.Fragment>
    );
  }
}

export default SideNavMobileStreaming;
