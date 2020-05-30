import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import VehicleList from "./vehicleList";

class SensorDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleMode: true,
      vehicleTableRender: [],
      sensorRender: [],
      sensorMode: false,
      selectedSensor: {},
    };
  }

  async createSensorList() {
    try {
      const sensors = await this.fetchSensors();
      console.log(sensors);
      await this.renderSensorTable(sensors);
    } catch (err) {
      console.log(err);
    }
  }

  fetchSensors = async (vehicle) => {
    try {
      const requesturl =
        "http://localhost:7000/sensor/getSensors/" + vehicle.vehicle_id;
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

  toggleVehicleMode(vehicle) {
    console.log(vehicle);
    let res = this.fetchSensors(vehicle);
    this.setState({ sensorMode: true, vehicleMode: false });
  }

  renderSensorTable = async (sensor) => {
    let render = [];

    // Object.keys(members).forEach((ele) => {
    //   let innerRender = [];
    //   members[ele].forEach((memEle) => {
    //     innerRender.push(
    //       <tr
    //         key={memEle.email}
    //         onClick={(e) => {
    //           this.toggleMemberView(memEle);
    //         }}
    //       >
    //         <td>{memEle.first_name}</td>
    //         <td>{memEle.last_name}</td>
    //         <td>{memEle.email}</td>
    //         <td>{memEle.subteam_name}</td>
    //       </tr>
    //     );
    //   });
    //   render.push(innerRender);
    // });
    this.setState({ memberRender: render });
  };

  toggleMemberView = (member) => {
    this.setState({
      memberMode: !this.state.memberMode,
      selectedMember: member,
    });
  };

  render() {
    if (this.state.vehicleMode) {
      return (
        <React.Fragment>
          <VehicleList toggleVehicleMode={() => this.toggleVehicleMode} />
        </React.Fragment>
      );
    }
    if (this.state.sensorMode) {
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
        </React.Fragment>
      );
    }
    // if (this.state.vehicleMode) {
    //   return (
    //     <MemberEdit
    //       member={this.state.selectedMember}
    //       toggleMemberView={() => {
    //         this.toggleMemberView();
    //       }}
    //       refreshList={() => {
    //         this.createTeamMemberList();
    //       }}
    //     />
    //   );
    // }
    // return (
    //   <React.Fragment>
    //     <Row>
    //       <Col md={{ span: 8, offset: 2 }}>
    //         <Table striped style={{ borderRadius: "25px" }}>
    //           <thead
    //             style={{ backgroundColor: "rgb(194, 45, 45)", color: "white" }}
    //           >
    //             <tr>
    //               <th>First Name</th>
    //               <th>Last Name</th>
    //               <th>Email</th>
    //               <th>Subteam</th>
    //             </tr>
    //           </thead>
    //           <tbody>{this.state.memberRender}</tbody>
    //         </Table>
    //       </Col>
    //     </Row>
    //   </React.Fragment>
    // );
  }
}

export default withRouter(SensorDash);
