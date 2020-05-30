import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import Member from "./memberView";
import { withRouter } from "react-router-dom";

class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { memberRender: [], memberMode: false, selectedMember: {} };
  }

  async componentDidMount() {
    await this.createTeamMemberList();
  }

  async createTeamMemberList() {
    try {
      const members = this.groupBy(
        await this.fetchTeamMembers(),
        "subteam_name"
      );
      console.log(members);
      await this.renderTeamMembers(members);
    } catch (err) {
      console.log(err);
    }
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
        this.props.history.push("/signin");
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
    this.setState({
      memberMode: !this.state.memberMode,
      selectedMember: member,
    });
  };

  render() {
    if (this.state.memberMode) {
      return (
        <Member
          member={this.state.selectedMember}
          toggleMemberView={() => {
            this.toggleMemberView();
          }}
          refreshList={() => {
            this.createTeamMemberList();
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
      </React.Fragment>
    );
  }
}

export default withRouter(TeamList);
