import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import VehicleList from "./vehicleList";
import SensorView from "./sensorView";

class SensorDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleMode: true,
      selectedVehicle: {},
      vehicleTableRender: [],
      sensorRender: [],
      sensorMode: false,
      selectedSensor: {},
      sensorSelected: false,
      add: false,
    };
  }

  async createSensorList() {
    try {
      const sensors = await this.fetchSensors();
      console.log(sensors);
      await this.renderSensorTable(sensors);
      await this.setState({
        sensorMode: true,
        vehicleMode: false,
        sensorSelected: false,
        add: false,
      });
    } catch (err) {
      console.log(err);
    }
  }

  fetchSensors = async () => {
    try {
      const requesturl =
        "http://localhost:7000/sensor/getSensors/" +
        this.state.selectedVehicle.vehicle_id;
      let res = await fetch(requesturl, {
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
  };

  async toggleVehicleMode(vehicle) {
    console.log(vehicle);
    await this.setState({ selectedVehicle: vehicle });
    let sensors = await this.fetchSensors();
    console.log(sensors);
    this.renderSensorTable(sensors);
    this.setState({
      sensorMode: true,
      vehicleMode: false,
      sensorSelected: false,
    });
  }

  selectSensor(sensor) {
    this.setState({
      vehicleMode: false,
      sensorMode: false,
      sensorSelected: true,
      selectedSensor: sensor,
    });
  }

  addSensor() {
    this.setState({
      vehicleMode: false,
      sensorMode: false,
      sensorSelected: true,
      selectedSensor: {},
      add: true,
    });
  }

  renderSensorTable = async (sensors) => {
    let render = [];
    if (sensors != null) {
      sensors.forEach((ele) => {
        render.push(
          <tr
            key={ele.name + ele.id}
            onClick={() => {
              this.selectSensor(ele);
            }}
          >
            <td>{ele.name}</td>
            <td>{ele.output_unit}</td>
            <td>{ele.category}</td>
            <td>{ele.code_name}</td>
            <td>{ele.can_id}</td>
          </tr>
        );
      });
    }
    this.setState({ sensorRender: render });
  };

  handleReturnToVehicle() {
    this.setState({
      vehicleMode: true,
      sensorMode: false,
      sensorSelected: false,
    });
  }

  render() {
    if (this.state.vehicleMode) {
      return (
        <React.Fragment>
          <VehicleList toggleVehicleMode={this.toggleVehicleMode.bind(this)} />
        </React.Fragment>
      );
    } else if (this.state.sensorMode) {
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
                  this.handleReturnToVehicle();
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
                    <th>Name</th>
                    <th>Output Units</th>
                    <th>Category</th>
                    <th>Code Name</th>
                    <th>Can ID</th>
                  </tr>
                </thead>
                <tbody>{this.state.sensorRender}</tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <div style={{ display: "inline-block", float: "right" }}>
                <Button
                  style={{
                    backgroundColor: "rgb(194, 45, 45)",
                    color: "white",
                  }}
                  onClick={() => {
                    this.addSensor({});
                  }}
                >
                  Add
                </Button>
              </div>
            </Col>
          </Row>
        </React.Fragment>
      );
    } else if (this.state.selectedSensor) {
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
                  this.createSensorList();
                }}
              >
                Back
              </Button>
            </Col>
          </Row>
          <SensorView
            vehicle={this.state.selectedVehicle}
            sensor={this.state.selectedSensor}
            add={this.state.add}
          />
        </React.Fragment>
      );
    }
  }
}

export default withRouter(SensorDash);
