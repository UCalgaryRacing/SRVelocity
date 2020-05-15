import React from "react";

class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    console.log("called");
    await this.createTeamMemberList();
  }

  async createTeamMemberList() {
    const members = await this.fetchTeamMembers();
    console.log(members);
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

  render() {
    return <React.Fragment />;
  }
}

export default TeamList;
