import React from "react";
import { Table, Row, Col, Form } from "react-bootstrap";

class DriverForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.first_name = React.createRef();
    this.last_name = React.createRef();
    this.refs = {};
  }

  fetchVehicles = async () => {
    try {
      const requesturl = "http://localhost:7000/vehicle/getVehicles/";
      let res = await fetch(requesturl, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status == 401) {
        this.props.history.push("/signin");
      }
      res = await res.json();
      return await res;
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    this.renderDriverFormContents(this.props.driver);
    this.refs = {
      first_name: this.first_name,
      last_name: this.last_name,
    };
    this.props.setReferences(this.refs);
    console.log(this.refs.name);
  }

  async renderDriverFormContents(driver) {
    let render = [];
    render.push(
      <React.Fragment key={"driverFormFragment"}>
        <tr>
          <th>First Name</th>
          <td>
            <Form>
              <Form.Group>
                <Form.Control
                  type="input"
                  defaultValue={driver.first_name}
                  ref={this.first_name}
                ></Form.Control>
              </Form.Group>
            </Form>
          </td>
        </tr>
        <tr>
          <th>Last Name</th>
          <td>
            <Form>
              <Form.Group>
                <Form.Control
                  type="input"
                  defaultValue={driver.last_name}
                  ref={this.last_name}
                ></Form.Control>
              </Form.Group>
            </Form>
          </td>
        </tr>
      </React.Fragment>
    );
    await this.setState({ driverTableFormRender: render });
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
              <tbody>{this.state.driverTableFormRender}</tbody>
            </Table>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default DriverForm;
