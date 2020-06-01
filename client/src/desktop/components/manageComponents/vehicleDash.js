import React from "react";
import VehicleList from "./vehicleList";
import VehicleView from "./vehicleView";
import VehicleForm from "./vehicleForm";
import { Row, Col, Button } from "react-bootstrap";
class VehicleDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleMode: false,
      selectedVehicle: {},
      addMode: false,
    };
    this.refs = {};
  }

  async setReferences(childRefs) {
    this.refs = childRefs;
  }

  async toggleVehicleMode(vehicle) {
    await this.setState({
      vehicleMode: !this.state.vehicleMode,
      selectedVehicle: vehicle,
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
      this.toggleVehicleMode(this.state.selectedVehicle);
    }
  }

  async submitPost() {
    try {
      const requestURL = "http://localhost:7000/vehicle/postVehicle";
      const res = await fetch(requestURL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.refs.name.current.value,
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
          <VehicleForm
            vehicle={{}}
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
    } else if (!this.state.vehicleMode) {
      return (
        <React.Fragment>
          <VehicleList
            toggleVehicleMode={(vehicle) => {
              this.toggleVehicleMode(vehicle);
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
          <VehicleView
            vehicle={this.state.selectedVehicle}
            toggleVehicleMode={(vehicle) => {
              this.toggleVehicleMode(vehicle);
            }}
            mode={this.state.mode}
          />
        </React.Fragment>
      );
    }
  }
}

export default VehicleDash;
