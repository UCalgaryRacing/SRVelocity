import React from "react";
import { Row, Col, Table } from "react-bootstrap";

class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { memberRender: [] };
  }

  async componentDidMount() {
    console.log("called");
    await this.createTeamMemberList();
  }

  async createTeamMemberList() {
    const members = await this.fetchTeamMembers();
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
      res = await res.json();
      return await res;
    } catch (err) {
      console.log(err);
    }
  };

  renderTeamMembers = async (members) => {
    let render = [];
    members.forEach((element) => {
      render.push(
        <tr>
          <td>{element.first_name}</td>
          <td>{element.last_name}</td>
          <td>{element.email}</td>
          <td>{element.subteam_name}</td>
        </tr>
      );
      console.log(element.first_name);
    });
    this.setState({ memberRender: render });
    console.log(render);
  };

  render() {
    return (
      <React.Fragment>
        <Table striped hover>
          <tbody>{this.state.memberRender}</tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default TeamList;
