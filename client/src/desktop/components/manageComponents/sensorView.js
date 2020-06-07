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
    this.red_lower = React.createRef();
    this.red_upper = React.createRef();
    this.lower_bound = React.createRef();
    this.upper_bound = React.createRef();
    this.yellow_lower = React.createRef();
    this.yellow_upper = React.createRef();
  }

  async componentDidMount() {
    this.buttonRender();
    this.renderDriverContents(this.props.sensor);
    this.renderDriverFormContents(this.props.sensor);
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

  async renderDriverFormContents(sensor) {
    let render = [];
    render.push(
      <React.Fragment key={"driverFormFragment"}>
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
        {/* <tr>
          <th>Lower Bound</th>
          <td>
            <Form>
              <Form.Group>
                <Form.Control
                  type="input"
                  defaultValue={sensor.lower_bound}
                  ref={this.lower_bound}
                ></Form.Control>
              </Form.Group>
            </Form>
          </td>
        </tr>
        <tr>
          <th>Upper Bound</th>
          <td>
            <Form>
              <Form.Group>
                <Form.Control
                  type="input"
                  defaultValue={sensor.upper_bound}
                  ref={this.upper_bound}
                ></Form.Control>
              </Form.Group>
            </Form>
          </td>
        </tr> */}
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
        {/* <tr>
          <th>Yellow Lower Bound</th>
          <td>
            <Form>
              <Form.Group>
                <Form.Control
                  type="input"
                  defaultValue={sensor.yellow_lower}
                  ref={this.yellow_lower}
                ></Form.Control>
              </Form.Group>
            </Form>
          </td>
        </tr>
        <tr>
          <th>Yellow Upper Bound</th>
          <td>
            <Form>
              <Form.Group>
                <Form.Control
                  type="input"
                  defaultValue={sensor.yellow_upper}
                  ref={this.yellow_upper}
                ></Form.Control>
              </Form.Group>
            </Form>
          </td>
        </tr>
        <tr>
          <th>Red Lower Bound</th>
          <td>
            <Form>
              <Form.Group>
                <Form.Control
                  type="input"
                  defaultValue={sensor.red_lower}
                  ref={this.red_lower}
                ></Form.Control>
              </Form.Group>
            </Form>
          </td>
        </tr>
        <tr>
          <th>Red Upper Bound</th>
          <td>
            <Form>
              <Form.Group>
                <Form.Control
                  type="input"
                  defaultValue={sensor.red_upper}
                  ref={this.red_upper}
                ></Form.Control>
              </Form.Group>
            </Form>
          </td>
        </tr> */}
      </React.Fragment>
    );
    await this.setState({ sensorFormRender: render });
  }

  async renderDriverContents(sensor) {
    let render = [];
    render.push(
      <React.Fragment key={"driverViewKey"}>
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
        {/* <tr>
          <th>Lower Bound</th>
          <td>{sensor.lower_bound}</td>
        </tr>
        <tr>
          <th>Upper Bound</th>
          <td>{sensor.upper_bound}</td>
        </tr> */}
        <tr>
          <th>Code Name</th>
          <td>{sensor.code_name}</td>
        </tr>
        <tr>
          <th>CAN ID</th>
          <td>{sensor.can_id}</td>
        </tr>
        {/* <tr>
          <th>Yellow Lower Bound</th>
          <td>{sensor.yellow_lower}</td>
        </tr>
        <tr>
          <th>Yellow Upper Bound</th>
          <td>{sensor.yellow_upper}</td>
        </tr>
        <tr>
          <th>Red Lower Bound</th>
          <td>{sensor.red_lower}</td>
        </tr>
        <tr>
          <th>Red Upper Bound</th>
          <td>{sensor.red_upper}</td>
        </tr> */}
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
            // lowerBound: this.lower_bound.current.value,
            // upperBound: this.upper_bound.current.value,
            codeName:
              this.code_name.current.value === ""
                ? null
                : this.code_name.current.value,
            canId:
              this.can_id.current.value === ""
                ? null
                : this.can_id.current.value,
            // yellowUpper:
            //   this.yellow_upper.current.value === ""
            //     ? null
            //     : this.yellow_upper.current.value,
            // yellowLower:
            //   this.yellow_lower.current.value === ""
            //     ? null
            //     : this.yellow_lower.current.value,
            // redUpper:
            //   this.red_upper.current.value === ""
            //     ? null
            //     : this.red_upper.current.value,
            // redLower:
            //   this.red_lower.current.value === ""
            //     ? null
            //     : this.red_lower.current.value,
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
            //lowerBound: this.lower_bound.current.value,
            //upperBound: this.upper_bound.current.value,
            codeName:
              this.code_name.current.value === ""
                ? null
                : this.code_name.current.value,
            canId:
              this.can_id.current.value === ""
                ? null
                : this.can_id.current.value,
            // yellowUpper:
            //   this.yellow_upper.current.value === ""
            //     ? null
            //     : this.yellow_upper.current.value,
            // yellowLower:
            //   this.yellow_lower.current.value === ""
            //     ? null
            //     : this.yellow_lower.current.value,
            // redUpper:
            //   this.red_upper.current.value === ""
            //     ? null
            //     : this.red_upper.current.value,
            // redLower:
            //   this.red_lower.current.value === ""
            //     ? null
            //     : this.red_lower.current.value,
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
              {/*<Jumbotron>
                <Form>
                  <Form.Group as={Row} controlId="sensorName">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Sensor Name:</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control
                        type="input"
                        defaultValue={this.props.sensor.name}
                        ref={this.name}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="outputUnits">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Output Units:</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control
                        type="input"
                        defaultValue={this.props.sensor.output_unit}
                        ref={this.output_unit}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="category">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Category</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control
                        type="input"
                        defaultValue={this.props.sensor.category}
                        ref={this.category}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="lowerBound">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Lower Bound:</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control
                        type="number"
                        defaultValue={this.props.sensor.lower_bound}
                        ref={this.lower_bound}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="upperBound">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Upper Bound:</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control
                        type="number"
                        defaultValue={this.props.sensor.upper_bound}
                        ref={this.upper_bound}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="codeName">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Code Name:</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control
                        type="input"
                        defaultValue={this.props.sensor.code_name}
                        ref={this.code_name}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="canId">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>CAN ID</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control
                        type="input"
                        defaultValue={this.props.sensor.can_id}
                        ref={this.can_id}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="yellowLower">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Yellow Lower Bound:</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control
                        type="number"
                        defaultValue={this.props.sensor.yellow_lower}
                        ref={this.yellow_lower}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="yellowUpper">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Yellow Upper Bound:</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control
                        type="number"
                        defaultValue={this.props.sensor.yellow_upper}
                        ref={this.yellow_upper}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="redLower">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Red Lower Bound:</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control
                        type="number"
                        defaultValue={this.props.sensor.red_lower}
                        ref={this.red_lower}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="redUpper">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Red Upper Bound:</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control
                        type="number"
                        defaultValue={this.props.sensor.red_upper}
                        ref={this.red_upper}
                      />
                    </Col>
                  </Form.Group>
                  {this.state.buttonRender}
                </Form>
                <Row>{this.state.errorRender}</Row>
              </Jumbotron> */}
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
              {/* <Jumbotron>
                <Row>
                  <Col md={{ span: 2 }}>
                    <h4>Name:</h4>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <h4>{this.props.sensor.name}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 2 }}>
                    <h4>Output Units:</h4>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <h4>{this.props.sensor.output_unit}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 2 }}>
                    <h4>Category:</h4>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <h4>{this.props.sensor.category}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 2 }}>
                    <h4>Lower Bound:</h4>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <h4>{this.props.sensor.lower_bound}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 2 }}>
                    <h4>Upper Bound:</h4>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <h4>{this.props.sensor.upper_bound}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 2 }}>
                    <h4>Code Name:</h4>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <h4>{this.props.sensor.code_name}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 2 }}>
                    <h4>canID:</h4>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <h4>{this.props.sensor.can_id}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 2 }}>
                    <h4>Yellow Lower Bound:</h4>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <h4>{this.props.sensor.yellow_lower}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 2 }}>
                    <h4>Yellow Upper Bound:</h4>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <h4>{this.props.sensor.yellow_upper}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 2 }}>
                    <h4>Red Lower Bound:</h4>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <h4>{this.props.sensor.red_lower}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 2 }}>
                    <h4>Red Upper Bound:</h4>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <h4>{this.props.sensor.red}</h4>
                  </Col>
                </Row>
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
              </Jumbotron> */}
            </Col>
          </Row>
        </React.Fragment>
      );
    }
  }
}

export default SensorView;
