import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {Switch} from "react-router";

class MemberPrivilegeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_approved: this.props.is_approved,
      is_lead: this.props.is_lead,
      approve_perms: true,
      lead_perms: true,
    };
    this.handleApproveChange = this.handleApproveChange.bind(this);
    this.handleLeadChange = this.handleLeadChange.bind(this);
  }

  handleApproveChange(is_approved) {
    const requestURL = "/teamMember/" + this.props.member_id + "/approve";
    fetch(requestURL, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          this.setState({ is_approved });
        } else {
          this.setState({ approve_perms: false });
        }
      })
      .catch((err) => {
        this.setState({ approve_perms: false });
      });
  }

  handleLeadChange(is_lead) {
    const requestURL = "/teamMember/" + this.props.member_id + "/togglelead";
    fetch(requestURL, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          this.setState({ is_lead });
        } else {
          this.setState({ lead_perms: false });
        }
      })
      .catch((err) => {
        this.setState({ lead_perms: false });
      });
  }

  render() {
    return (
      <div
        style={{
          textAlign: "center",
          fontSize: "14px",
          color: "#C22E2D",
          marginBottom: "5px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#000000",
            marginTop: "10px",
            marginBottom: "5px",
            paddingTop: "10px",
            borderTop: "1px solid",
          }}
        ></div>
        <div>
          <span>Approved</span>
        </div>
        <div>
          <Switch onChange={this.handleApproveChange} checked={this.state.is_approved} />
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#C22E2D",
            margin: "10px",
          }}
        >
          {this.state.approve_perms ? null : <p>Sorry, you do not have the permissions to edit approvals</p>}
        </div>
        <div>
          <span>Lead Permissions</span>
        </div>
        <div>
          <Switch onChange={this.handleLeadChange} checked={this.state.is_lead} />
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#C22E2D",
            margin: "10px",
          }}
        >
          {this.state.lead_perms ? null : <p>Sorry, you do not have the permissions to edit leads</p>}
        </div>
      </div>
    );
  }
}

export default MemberPrivilegeEdit;
