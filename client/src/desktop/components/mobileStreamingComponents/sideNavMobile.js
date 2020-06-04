import React from "react";
import Sidebar from "react-sidebar";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styling/sideNavMobile.css";

class SideNavMobileStreaming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  changeContent(newContent) {
    this.props.streamingContent.current.changeContent(newContent);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    return (
      <Sidebar
        sidebar={
          <React.Fragment>
            <Row style={{ background: "#cc2d2d", color: "white" }}>
              <Col style={{ margin: "15px" }}>
                <Link to="/home" style={{ fontSize: "30px", color: "white" }}>
                  Schulich Velocity
                </Link>
              </Col>
            </Row>
            <Row
              style={{ color: "grey" }}
              onClick={() => {
                console.log("Dash");
              }}
            >
              <Col style={{ margin: "10px" }}>
                <p style={{ fontSize: "25px" }}>Plotting</p>
              </Col>
            </Row>
            <Row
              style={{ color: "grey" }}
              onClick={() => {
                console.log("Data");
              }}
            >
              <Col style={{ margin: "10px" }}>
                <p style={{ fontSize: "25px" }}>Current Data</p>
              </Col>
            </Row>
            <Row>
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
    );
  }
}

export default SideNavMobileStreaming;
