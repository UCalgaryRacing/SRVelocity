import React from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import VehicleForm from "./vehicleForm";

class VehicleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mode: this.props.mode || "view" };
    this.refs = null;
  }

  async setReferences(childRefs) {
    this.refs = childRefs;
  }

  async componentDidMount() {
    this.renderVehicleContents(this.props.vehicle);
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

  async renderVehicleContents(vehicle) {
    let render = [];
    render.push(
      <tr key={vehicle.name}>
        <th>Name</th>
        <td>{vehicle.name}</td>
      </tr>
    );
    await this.setState({ vehicleTableRender: render });
  }

  async errorDisplay(res, resJSON) {
    if (!res.status == 401) {
      this.props.history.push("/signin");
    } else if (res.status == 500) {
      this.setState({
        errorRender: [<p>ERROR 500: Something went wrong</p>],
      });
    } else if (res.status == 400) {
      this.setState({ errorRender: [<p>{resJSON.error}</p>] });
      console.log(res);
    } else if (res.status == 200) {
      this.props.toggleVehicleMode(this.props.vehicle);
    }
  }

  async submitPut() {
    try {
      const requestURL =
        "http://localhost:7000/vehicle/putVehicle/" +
        this.props.vehicle.vehicle_id;
      const res = await fetch(requestURL, {
        method: "PUT",
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

  async submitDelete() {
    try {
      const requestURL =
        "http://localhost:7000/vehicle/deleteVehicle/" +
        this.props.vehicle.vehicle_id;
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
                  this.props.toggleVehicleMode(this.props.vehicle);
                }}
              >
                Back
              </Button>
            </Col>
          </Row>
          <VehicleForm
            vehicle={this.props.vehicle}
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
    } else if (this.state.mode === "add") {
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
                  this.props.toggleVehicleMode(this.props.vehicle);
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
                    ></th>
                  </tr>
                </thead>
                <tbody>{this.state.vehicleTableFormRender}</tbody>
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
                  this.props.toggleVehicleMode(this.props.vehicle);
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
                <tbody>{this.state.vehicleTableRender}</tbody>
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

export default VehicleView;
