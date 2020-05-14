import React from "react";

class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("called");
    this.createTeamMemberList();
  }

  createTeamMemberList() {
    const memberList = this.fetchTeamMembers();
    console.log(memberList);
  }

  fetchTeamMembers = async () => {
    const memberList = fetch(
      "http://localhost:7000/teamMember/getAllTeamMembers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    return memberList;
  };

  render() {
    return <p></p>;
  }
}

export default TeamList;
