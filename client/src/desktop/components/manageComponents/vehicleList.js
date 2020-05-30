import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class VehicleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    await this.createVehicleList();
  }

  async createVehicleList() {
    try {
      const vehicles = await this.fetchVehicles();
      await this.renderVehicleTable(vehicles);
    } catch (err) {
      console.log(err);
    }
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
        console.log("LOG IN REQUIRED");
        this.props.history.push("/signin");
      }
      res = await res.json();
      return await res;
    } catch (err) {
      console.log(err);
    }
  };

  renderVehicleTable = async (vehicles) => {
    let render = [];
    vehicles.forEach((ele) => {
      render.push(
        <tr key={ele.name} onClick={() => this.props.toggleVehicleMode(ele)}>
          <td>{ele.name}</td>
        </tr>
      );
    });
    this.setState({ vehicleTableRender: render });
  };

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
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>{this.state.vehicleTableRender}</tbody>
            </Table>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default withRouter(VehicleList);
