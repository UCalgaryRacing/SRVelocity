import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import MemberEdit from "./memberView";

class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { memberRender: [], memberMode: false };
  }

  async componentDidMount() {
    console.log("called");
    await this.createTeamMemberList();
  }

  async createTeamMemberList() {
    const members = this.groupBy(await this.fetchTeamMembers(), "subteam_name");
    console.log(members);
    await this.renderTeamMembers(members);
  }

  fetchTeamMembers = async () => {
    try {
      let res = await fetch(
        "http://localhost:7000/teamMember/getAllTeamMembers",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 401) {
        console.log("LOG IN REQUIRED");
      }
      res = await res.json();
      return await res;
    } catch (err) {
      console.log(err);
    }
  };

  renderTeamMembers = async (members) => {
    let render = [];
    Object.keys(members).forEach((ele) => {
      let innerRender = [];
      console.log(members[ele]);
      members[ele].forEach((memEle) => {
        innerRender.push(
          <tr
            key={memEle.email}
            onClick={(e) => {
              this.toggleMemberView(memEle);
            }}
          >
            <td>{memEle.first_name}</td>
            <td>{memEle.last_name}</td>
            <td>{memEle.email}</td>
            <td>{memEle.subteam_name}</td>
          </tr>
        );
      });
      render.push(innerRender);
    });
    this.setState({ memberRender: render });
  };

  groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };

  toggleMemberView = (member) => {
    this.setState({ memberMode: !this.state.memberMode });
  };
  render() {
    if (this.state.memberMode) {
      return (
        <MemberEdit
          toggleMemberView={() => {
            this.toggleMemberView();
          }}
        />
      );
    }
    return (
      <React.Fragment>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Table striped style={{ borderRadius: "25px" }}>
              <thead
                style={{ backgroundColor: "rgb(194, 45, 45)", color: "white" }}
              >
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Subteam</th>
                </tr>
              </thead>
              <tbody>{this.state.memberRender}</tbody>
            </Table>
          </Col>
        </Row>
        {/* <Row>
          <Col md={{ span: 1, offset: 2 }}>
            <Button
              style={{ backgroundColor: "rgb(194, 45, 45)", color: "white" }}
            >
              Edit
            </Button>
          </Col>
        </Row> */}
        {/* <Row>{this.state.memberRender}</Row> */}
      </React.Fragment>
    );
  }
}

export default TeamList;
