import React from "react";
import { Row, Col, Button, Jumbotron, Form } from "react-bootstrap";

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

  async componentDidMount() {}

  async submit() {
    try {
      const requestURL = "http://localhost:7000/postSensor";
      let res = await fetch(requestURL, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleId: this.props.vehicle.vehicle_id,
          name: this.name.current.value,
          outputUnit: this.output_unit.current.value,
          category: this.category.current.value,
          lowerBound: this.lower_bound.current.value,
          upperBound: this.upper_bound.current.value,
          codeName: this.code_name.current.value,
          canId: this.can_id.current.value,
          yellowUpper: this.yellow_upper.current.value,
          yellowLower: this.yellow_lower.current.value,
          redUpper: this.red_upper.current.value,
          redLower: this.red_lower.current.value,
        }),
      });
      if (res.status == 401) {
        console.log("LOG IN REQUIRED");
        this.props.history.push("/signin");
      } else if (res.status == 500) {
        console.log("ERROR");
      } else if (res.status == 400) {
        console.log(res);
      } else if (res.status == 200) {
        this.props.refreshList();
        this.props.toggleMemberView();
      }
    } catch (err) {
      console.log(err);
    }
  }

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }

  async deleteSensor() {
    try {
      const requestURL =
        "http://localhost:7000/teamMember/" + this.props.member.member_id;
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
      } else if (res.status == 500) {
        console.log("ERROR");
      } else if (res.status == 400) {
        console.log(res);
      } else if (res.status == 200) {
        this.props.refreshList();
        this.props.toggleMemberView();
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.editMode == true || this.props.add) {
      return (
        <React.Fragment>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Jumbotron>
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
                            this.deleteMember();
                          }}
                        >
                          Delete User
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Jumbotron>
            </Col>
          </Row>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Jumbotron>
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
              </Jumbotron>
            </Col>
          </Row>
        </React.Fragment>
      );
    }
  }
}

export default SensorView;
