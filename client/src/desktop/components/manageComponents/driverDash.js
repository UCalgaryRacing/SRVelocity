import React from "react";
import DriverList from "./driverList";
import DriverView from "./driverView";
import DriverForm from "./driverForm";
import { Row, Col, Button } from "react-bootstrap";
class DriverDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      driverMode: false,
      selectedDriver: {},
      addMode: false,
    };
    this.refs = {};
  }

  async setReferences(childRefs) {
    this.refs = childRefs;
  }

  async toggleDriverMode(driver) {
    await this.setState({
      driverMode: !this.state.driverMode,
      selectedDriver: driver,
      addMode: false,
    });
  }

  async toggleAddMode() {
    await this.setState({
      addMode: !this.state.addMode,
    });
  }

  async errorDisplay(res, resJSON) {
    if (!res.status === 401) {
      this.props.history.push("/signin");
    } else if (res.status === 500) {
      this.setState({
        errorRender: [<p>ERROR 500: Something went wrong</p>],
      });
    } else if (res.status === 400) {
      this.setState({ errorRender: [<p>{resJSON.error}</p>] });
      console.log(res);
    } else if (res.status === 200) {
      this.toggleAddMode();
    }
  }

  async submitPost() {
    try {
      const requestURL = "http://localhost:7000/driver/postDriver";
      const res = await fetch(requestURL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: this.refs.first_name.current.value,
          lastName: this.refs.last_name.current.value,
        }),
      });
      console.log(res);
      const resJSON = await res.json();
      this.errorDisplay(res, resJSON);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.addMode) {
      return (
        <React.Fragment>
          <DriverForm
            driver={{}}
            setReferences={(refs) => {
              this.setReferences(refs);
            }}
          />
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Button
                style={{
                  backgroundColor: "rgb(194, 45, 45)",
                  color: "white",
                  float: "right",
                }}
                onClick={() => {
                  this.submitPost();
                }}
              >
                Submit
              </Button>
              <Button
                style={{
                  backgroundColor: "rgb(194, 45, 45)",
                  color: "white",
                  float: "right",
                }}
                onClick={() => {
                  this.toggleAddMode();
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </React.Fragment>
      );
    } else if (!this.state.driverMode) {
      return (
        <React.Fragment>
          <DriverList
            toggleDriverMode={(driver) => {
              this.toggleDriverMode(driver);
            }}
          />
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Button
                style={{
                  backgroundColor: "rgb(194, 45, 45)",
                  color: "white",
                  float: "right",
                }}
                onClick={() => {
                  this.toggleAddMode();
                }}
              >
                Add
              </Button>
            </Col>
          </Row>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <DriverView
            driver={this.state.selectedDriver}
            toggleDriverMode={(driver) => {
              this.toggleDriverMode(driver);
            }}
            mode={this.state.mode}
          />
        </React.Fragment>
      );
    }
  }
}

export default DriverDash;
