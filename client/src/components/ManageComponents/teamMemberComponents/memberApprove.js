import React from "react";
import { Button } from "react-bootstrap";
import "../manageBox.css";

class MemberApprove extends React.Component {
  constructor(props) {
    super(props);
    this.state = { approved: false };
  }

  submitApproval = async () => {
    const requestURL = `teamMember/${this.props.member_id}/approve`;
    try {
      const req = await fetch(requestURL, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (req.ok) this.setState({ approved: true });
      else this.setState({ approved: false });
    } catch (error) {
      console.log(error);
      this.setState({ approved: false });
    }
  };

  render() {
    return (
      <div style={{ marginTop: "10px" }}>
        {this.state.approved ? (
          <p>User has been approved</p>
        ) : (
          <Button id="approveButton" onClick={this.submitApproval}>
            Approve
          </Button>
        )}
        &nbsp;
      </div>
    );
  }
}

export default MemberApprove;
