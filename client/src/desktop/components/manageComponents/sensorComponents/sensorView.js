import React from "react";
import { Row, Col, Button, Jumbotron, Form, Table } from "react-bootstrap";

class SensorView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
    this.output_unit = React.createRef();
    this.can_id = React.createRef();
    this.category = React.createRef();
    this.code_name = React.createRef();
    this.name = React.createRef();
    this.frequency = React.createRef();
  }

  async componentDidMount() {
    this.buttonRender();
    this.renderSensorContents(this.props.sensor);
    this.renderSensorFormContents(this.props.sensor);
  }

  async errorDisplay(res, resJSON) {
    if (!res.status === 401) {
      this.props.history.push("/signin");
    } else if (res.status === 500) {
      this.setState({
        errorRender: [
          <p>ERROR 500: Something went wrong. Make sure code name is unique</p>,
        ],
      });
    } else if (res.status === 400) {
      this.setState({ errorRender: [<p>{resJSON.error}</p>] });
      console.log(res);
    } else if (res.status === 200) {
      this.props.toggleVehicleMode(this.props.vehicle);
    }
  }

  async renderSensorFormContents(sensor) {
    let render = [];
    render.push(
      <React.Fragment key={"sensorFormFragment"}>
        <tr>
          <th>Sensor Name</th>
          <td>
            <Form>
              <Form.Group>
                <Form.Control
                  type="input"
                  defaultValue={sensor.name}
                  ref={this.name}
                ></Form.Control>
              </Form.Group>
            </Form>
          </td>
        </tr>
        <tr>
          <th>Output Units</th>
          <td>
            <Form>
              <Form.Group>
                <Form.Control
                  type="input"
                  defaultValue={sensor.output_unit}
                  ref={this.output_unit}
                ></Form.Control>
              </Form.Group>
            </Form>
          </td>
        </tr>
        <tr>
          <th>Category</th>
          <td>
            <Form>
              <Form.Group>
                <Form.Control
                  type="input"
                  defaultValue={sensor.category}
                  ref={this.category}
                ></Form.Control>
              </Form.Group>
            </Form>
          </td>
        </tr>
        <tr>
          <th>Code Name</th>
          <td>
            <Form>
              <Form.Group>
                <Form.Control
                  type="input"
                  defaultValue={sensor.code_name}
                  ref={this.code_name}
                ></Form.Control>
              </Form.Group>
            </Form>
          </td>
        </tr>
        <tr>
          <th>CAN ID</th>
          <td>
            <Form>
              <Form.Group>
                <Form.Control
                  type="input"
                  defaultValue={sensor.can_id}
                  ref={this.can_id}
                ></Form.Control>
              </Form.Group>
            </Form>
          </td>
        </tr>
        <tr>
          <th>Frequency</th>
          <td>
            <Form>
              <Form.Group>
                <Form.Control
                  type="input"
                  defaultValue={sensor.frequency}
                  ref={this.frequency}
                ></Form.Control>
              </Form.Group>
            </Form>
          </td>
        </tr>
      </React.Fragment>
    );
    await this.setState({ sensorFormRender: render });
  }

  async renderSensorContents(sensor) {
    let render = [];
    render.push(
      <React.Fragment key={"sensorViewKey"}>
        <tr>
          <th>Sensor Name</th>
          <td>{sensor.name}</td>
        </tr>
        <tr>
          <th>Output Units</th>
          <td>{sensor.output_unit}</td>
        </tr>
        <tr>
          <th>Category</th>
          <td>{sensor.category}</td>
        </tr>
        <tr>
          <th>Code Name</th>
          <td>{sensor.code_name}</td>
        </tr>
        <tr>
          <th>CAN ID</th>
          <td>{sensor.can_id}</td>
        </tr>
        <tr>
          <th>Frequency</th>
          <td>{sensor.frequency}</td>
        </tr>
      </React.Fragment>
    );
    await this.setState({ sensorRender: render });
  }

  async submit() {
    if (this.props.add) {
      try {
        console.log("submitting");
        const requestURL = "http://localhost:7000/sensor/postSensor";
        let res = await fetch(requestURL, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vehicleId: this.props.vehicle.vehicle_id,
            name: this.name.current.value,
            outputUnit: this.output_unit.current.value,
            category: this.category.current.value,
            codeName:
              this.code_name.current.value === ""
                ? null
                : this.code_name.current.value,
            canId:
              this.can_id.current.value === ""
                ? null
                : this.can_id.current.value,
            frequency:
              this.frequency.current.value === ""
                ? null
                : this.frequency.current.value,
          }),
        });
        let resJSON = await res.json();
        this.errorDisplay(res, resJSON);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        console.log("submitting" + this.props.sensor.sensor_id);
        const requestURL =
          "http://localhost:7000/sensor/putSensor/" +
          this.props.sensor.sensor_id;
        let res = await fetch(requestURL, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.name.current.value,
            outputUnit: this.output_unit.current.value,
            category: this.category.current.value,
            codeName:
              this.code_name.current.value === ""
                ? null
                : this.code_name.current.value,
            canId:
              this.can_id.current.value === ""
                ? null
                : this.can_id.current.value,
            frequency:
              this.frequency.current.value === ""
                ? null
                : this.frequency.current.value,
          }),
        });
        let resJSON = await res.json();
        this.errorDisplay(res, resJSON);
      } catch (err) {
        console.log(err);
      }
    }
  }

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }

  async deleteSensor() {
    try {
      const requestURL =
        "http://localhost:7000/sensor/" + this.props.sensor.sensor_id;
      let res = await fetch(requestURL, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status == 401) {
        console.log("LOG IN REQUIRED");
        this.props.history.push("/signin");
      } else if (res.status === 500) {
        console.log("ERROR");
      } else if (res.status === 400) {
        console.log(res);
      } else if (res.status === 200) {
        this.props.toggleVehicleMode(this.props.vehicle);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async buttonRender() {
    let render = [];
    if (this.props.add)
      render.push(
        <Row>
          <Col>
            <div style={{ display: "inline-block", float: "right" }}>
              <Button
                style={{
                  backgroundColor: "rgb(194, 45, 45)",
                  color: "white",
                }}
                onClick={() => {
                  this.submit();
                }}
              >
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      );
    else
      render.push(
        <Row>
          <Col>
            <div style={{ display: "inline-block", float: "right" }}>
              <Button
                style={{
                  backgroundColor: "rgb(194, 45, 45)",
                  color: "white",
                }}
                onClick={() => {
                  this.toggleEditMode();
                }}
              >
                Cancel
              </Button>
              <Button
                style={{
                  backgroundColor: "rgb(194, 45, 45)",
                  color: "white",
                }}
                onClick={() => {
                  this.submit();
                }}
              >
                Submit
              </Button>
              <Button
                style={{
                  backgroundColor: "rgb(194, 45, 45)",
                  color: "white",
                }}
                onClick={() => {
                  this.deleteSensor();
                }}
              >
                Delete
              </Button>
            </div>
          </Col>
        </Row>
      );
    this.setState({ buttonRender: render });
  }

  render() {
    if (this.state.editMode == true || this.props.add) {
      return (
        <React.Fragment>
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
                <tbody>{this.state.sensorFormRender}</tbody>
              </Table>
              {this.state.buttonRender}
              <Row>{this.state.errorRender}</Row>
            </Col>
          </Row>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
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
                <tbody>{this.state.sensorRender}</tbody>
              </Table>
              <Row>
                <Col>
                  <Button
                    style={{
                      backgroundColor: "rgb(194, 45, 45)",
                      color: "white",
                      float: "right",
                    }}
                    onClick={() => {
                      this.toggleEditMode();
                    }}
                  >
                    Edit
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </React.Fragment>
      );
    }
  }
}

export default SensorView;
