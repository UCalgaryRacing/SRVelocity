import React from "react";
import { Table, Row, Col, Button, Form } from "react-bootstrap";
import DriverForm from "./driverForm";
import { withRouter } from "react-router-dom";

class DriverView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mode: this.props.mode || "view" };
    this.refs = null;
    this.selectedVehicle = React.createRef();
  }

  async setReferences(childRefs) {
    this.refs = childRefs;
  }

  async componentDidMount() {
    this.renderDriverContents(this.props.driver);
    this.renderDriverCars(this.props.driver);
    this.renderDriverCarsEdit(this.props.driver);
    this.createOptions();
  }

  async fetchSubteams() {
    try {
      let res = await fetch("http://localhost:7000/vehicle/getVehicles", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status == 401) {
        console.log("LOG IN REQUIRED");
        this.props.history.push("/signin");
      }
      res = await res.json();
      return await res;
    } catch (err) {
      console.log(err);
    }
  }

  async createOptions() {
    let vehicleRender = [];
    let vehicleDict = {};
    let vehicleList = await this.fetchSubteams();

    vehicleList.forEach((ele) => {
      vehicleDict[ele.name] = ele.vehicle_id;
      vehicleRender.push(<option>{ele.name}</option>);
    });
    this.setState({ optionRender: vehicleRender, vehicleDict: vehicleDict });
  }

  async setEditMode() {
    await this.setState({ mode: "edit" });
  }

  async setViewMode() {
    await this.setState({ mode: "view" });
  }

  async setAddMode() {
    await this.setState({ mode: "add" });
  }

  async renderDriverContents(driver) {
    let render = [];
    render.push(
      <React.Fragment
        key={driver.first_name + driver.last_name + "driverContents"}
      >
        <tr>
          <th>First Name</th>
          <td>{driver.first_name}</td>
        </tr>
        <tr>
          <th>Last Name</th>
          <td>{driver.last_name}</td>
        </tr>
      </React.Fragment>
    );
    await this.setState({
      driverTableRender: render,
    });
  }

  async renderDriverCars(driver) {
    console.log(driver);
    let render = [];
    driver.drives.forEach((ele) => {
      render.push(
        <React.Fragment key={ele.name + "driverViewKey"}>
          <tr>
            <td>{ele.name}</td>
          </tr>
        </React.Fragment>
      );
    });

    await this.setState({
      driverCarTableRender: render,
    });
  }

  async renderDriverCarsEdit(driver) {
    console.log(driver);
    let render = [];
    driver.drives.forEach((ele) => {
      console.log(ele);
      render.push(
        <React.Fragment key={ele.name + "carlistrender"}>
          <tr>
            <td>{ele.name}</td>
            <td>
              <Button
                style={{
                  backgroundColor: "rgb(194, 45, 45)",
                  color: "white",
                  float: "center",
                }}
                onClick={() => {
                  this.submitDeleteDrives(ele);
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        </React.Fragment>
      );
    });

    await this.setState({
      driverCarEditTableRender: render,
    });
  }

  async errorDisplay(res, resJSON) {
    if (res.status == 401) {
      this.props.history.push("/signin");
    } else if (res.status == 500) {
      this.setState({
        errorRender: [
          <p key={"driverErrorMessage"}>ERROR 500: Something went wrong</p>,
        ],
      });
    } else if (res.status == 400) {
      this.setState({
        errorRender: [<p key={"driverErrorMessage"}>{resJSON.error}</p>],
      });
      console.log(res);
    } else if (res.status == 200) {
      this.props.toggleDriverMode(this.props.driver);
    }
  }

  async submitPut() {
    try {
      const requestURL =
        "http://localhost:7000/driver/putDriver/" + this.props.driver.driver_id;
      const res = await fetch(requestURL, {
        method: "PUT",
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

  async submitDelete() {
    try {
      const requestURL =
        "http://localhost:7000/driver/deleteDriver/" +
        this.props.driver.driver_id;
      const res = await fetch(requestURL, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      const resJSON = await res.json();
      this.errorDisplay(res, resJSON);
    } catch (err) {
      console.log(err);
    }
  }

  async submitDeleteDrives(drives) {
    try {
      const requestURL =
        "http://localhost:7000/driver/unassigndriver/" + drives.d_id;
      const res = await fetch(requestURL, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      const resJSON = await res.json();
      this.errorDisplay(res, resJSON);
    } catch (err) {
      console.log(err);
    }
  }

  async assignDriver() {
    try {
      const requestURL = "http://localhost:7000/driver/assignDriverToVehicle/";
      const res = await fetch(requestURL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleId: this.state.vehicleDict[this.selectedVehicle.current.value],
          driverId: this.props.driver.driver_id,
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
    if (this.state.mode === "edit") {
      return (
        <React.Fragment>
          <Row>
            <Col>
              <Button
                style={{
                  backgroundColor: "rgb(194, 45, 45)",
                  color: "white",
                }}
                onClick={() => {
                  this.props.toggleDriverMode(this.props.driver);
                }}
              >
                Back
              </Button>
            </Col>
          </Row>
          <DriverForm
            driver={this.props.driver}
            setReferences={(refs) => {
              this.setReferences(refs);
            }}
          />
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Table striped style={{ borderRadius: "25px" }}>
                <thead
                  style={{
                    backgroundColor: "rgb(194, 45, 45)",
                    color: "white",
                  }}
                >
                  <tr>
                    <th
                      style={{
                        width: "100%",
                      }}
                    >
                      Drives
                    </th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>{this.state.driverCarEditTableRender}</tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Table striped style={{ borderRadius: "25px" }}>
                <thead
                  style={{
                    backgroundColor: "rgb(194, 45, 45)",
                    color: "white",
                  }}
                >
                  <tr>
                    <th
                      style={{
                        width: "100%",
                      }}
                    >
                      Assign Driver To New Vehicle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Row>
                        <Col md={{ span: 10 }}>
                          <Form>
                            <Form.Group controlId="vehicleSelect">
                              <Form.Control
                                as="select"
                                ref={this.selectedVehicle}
                              >
                                {this.state.optionRender}
                              </Form.Control>
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col>
                          <Button
                            style={{
                              backgroundColor: "rgb(194, 45, 45)",
                              color: "white",
                              float: "Right",
                            }}
                            onClick={() => {
                              this.assignDriver();
                            }}
                          >
                            Assign
                          </Button>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Button
                style={{
                  backgroundColor: "rgb(194, 45, 45)",
                  color: "white",
                  float: "right",
                }}
                onClick={() => {
                  this.submitPut();
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
                  this.submitDelete();
                }}
              >
                Delete
              </Button>
              <Button
                style={{
                  backgroundColor: "rgb(194, 45, 45)",
                  color: "white",
                  float: "right",
                }}
                onClick={() => {
                  this.setViewMode();
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>{this.state.errorRender}</Col>
          </Row>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Row>
            <Col>
              <Button
                style={{
                  backgroundColor: "rgb(194, 45, 45)",
                  color: "white",
                }}
                onClick={() => {
                  this.props.toggleDriverMode(this.props.driver);
                }}
              >
                Back
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Table striped style={{ borderRadius: "25px" }}>
                <thead
                  style={{
                    backgroundColor: "rgb(194, 45, 45)",
                    color: "white",
                  }}
                >
                  <tr>
                    <th
                      style={{
                        width: "20%",
                      }}
                    >
                      Label
                    </th>
                    <th
                      style={{
                        width: "80%",
                      }}
                    >
                      Content
                    </th>
                  </tr>
                </thead>
                <tbody>{this.state.driverTableRender}</tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Table striped style={{ borderRadius: "25px" }}>
                <thead
                  style={{
                    backgroundColor: "rgb(194, 45, 45)",
                    color: "white",
                  }}
                >
                  <tr>
                    <th
                      style={{
                        width: "100%",
                      }}
                    >
                      Drives
                    </th>
                  </tr>
                </thead>
                <tbody>{this.state.driverCarTableRender}</tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Button
                style={{
                  backgroundColor: "rgb(194, 45, 45)",
                  color: "white",
                  float: "right",
                }}
                onClick={() => {
                  this.setEditMode();
                }}
              >
                Edit
              </Button>
            </Col>
          </Row>
        </React.Fragment>
      );
    }
  }
}

export default withRouter(DriverView);
