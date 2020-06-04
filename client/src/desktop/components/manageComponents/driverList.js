import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class DriverList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    await this.createDriverList();
  }

  async createDriverList() {
    try {
      const drivers = await this.fetchDrivers();
      await this.renderDriverTable(drivers);
    } catch (err) {
      console.log(err);
    }
  }

  fetchDrivers = async () => {
    try {
      const requesturl = "http://localhost:7000/driver/getDrivers";
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

  renderDriverTable = async (drivers) => {
    let render = [];
    drivers.forEach((ele) => {
      render.push(
        <tr
          key={ele.first_name + ele.last_name}
          onClick={() => this.props.toggleDriverMode(ele)}
        >
          <td>{ele.first_name}</td>
          <td>{ele.last_name}</td>
        </tr>
      );
    });
    this.setState({ DriverTableRender: render });
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
                  <th>First Name</th>
                  <th>Last Name</th>
                </tr>
              </thead>
              <tbody>{this.state.DriverTableRender}</tbody>
            </Table>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default withRouter(DriverList);
