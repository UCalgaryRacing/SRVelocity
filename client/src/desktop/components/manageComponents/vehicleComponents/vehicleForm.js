import React from "react";
import { Table, Row, Col, Form } from "react-bootstrap";

class VehicleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.name = React.createRef();
    this.refs = {};
  }

  async componentDidMount() {
    this.renderVehicleFormContents(this.props.vehicle);
    this.refs = {
      name: this.name,
    };
    this.props.setReferences(this.refs);
    console.log(this.refs.name);
  }

  async renderVehicleFormContents(vehicle) {
    let render = [];
    render.push(
      <React.Fragment key={vehicle.name + "FRAG"}>
        <tr key={vehicle.name}>
          <th>Name</th>
          <td>
            <Form key={vehicle.name + "FORM"}>
              <Form.Group>
                <Form.Control
                  type="input"
                  defaultValue={vehicle.name}
                  ref={this.name}
                ></Form.Control>
              </Form.Group>
            </Form>
          </td>
        </tr>
      </React.Fragment>
    );
    await this.setState({ vehicleTableFormRender: render });
  }

  render() {
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
              <tbody>{this.state.vehicleTableFormRender}</tbody>
            </Table>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default VehicleForm;
