import React from "react";
import { Row, Col, Button, Jumbotron, Form } from "react-bootstrap";

class Member extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      leadIsChecked: this.props.member.is_lead,
      approvedIsChecked: this.props.member.is_approved,
    };
    this.firstName = React.createRef();
    this.lastName = React.createRef();
    this.email = React.createRef();
    this.subteam = React.createRef();
    this.isLead = React.createRef();
    this.isApproved = React.createRef();
  }

  toggleLeadCheck() {
    this.setState({ leadIsChecked: !this.state.leadIsChecked });
  }
  toggleApproveCheck() {
    this.setState({ approvedIsChecked: !this.state.approvedIsChecked });
  }

  isTeamLeadText() {
    if (this.props.member.is_lead) {
      return "Yes";
    } else {
      return "No";
    }
  }

  isApprovedText() {
    if (this.props.member.is_approved) {
      return "Yes";
    } else {
      return "No";
    }
  }

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }

  async submit() {
    try {
      const requestURL =
        "http://localhost:7000/teamMember/" + this.props.member.member_id;
      let res = await fetch(requestURL, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: this.firstName.current.value,
          lastName: this.lastName.current.value,
          isLead: this.state.leadIsChecked,
          isApproved: this.state.approvedIsChecked,
          email: this.email.current.value,
          subteamName: this.subteam.current.value,
        }),
      });
      if (res.status == 401) {
        console.log("LOG IN REQUIRED");
        this.props.history.push("/signin");
      } else if (res.status == 500) {
        console.log("ERROR");
      } else if (res.status == 400) {
        console.log(res);
      } else if (res.status == 200) {
        this.props.refreshList();
        this.props.toggleMemberView();
      }
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    if (this.state.editMode == true) {
      return (
        <React.Fragment>
          <Row>
            <Col md={{ span: 1, offset: 0 }}>
              <Button
                style={{
                  backgroundColor: "rgb(194, 45, 45)",
                  color: "white",
                }}
                onClick={this.props.toggleMemberView}
              >
                Back
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Jumbotron>
                <Form>
                  <Form.Group as={Row} controlId="firstNameAndLastName">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>First Name:</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control
                        type="input"
                        defaultValue={this.props.member.first_name}
                        ref={this.firstName}
                      />
                    </Col>
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Last Name:</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control
                        type="input"
                        defaultValue={this.props.member.last_name}
                        ref={this.lastName}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="email">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Email:</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control
                        type="input"
                        defaultValue={this.props.member.email}
                        ref={this.email}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="subteam">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Subteam</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control
                        type="input"
                        defaultValue={this.props.member.subteam_name}
                        ref={this.subteam}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="leadAndApproved">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Team Lead: </h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control
                        type="checkbox"
                        checked={this.state.leadIsChecked}
                        onChange={() => {
                          this.toggleLeadCheck();
                        }}
                        ref={this.isLead}
                      />
                    </Col>
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Approved:</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control
                        type="checkbox"
                        checked={this.state.approvedIsChecked}
                        onChange={() => {
                          this.toggleApproveCheck();
                        }}
                        ref={this.isApproved}
                      />
                    </Col>
                  </Form.Group>
                  <Row>
                    <Col>
                      <Button
                        style={{
                          backgroundColor: "rgb(194, 45, 45)",
                          color: "white",
                          marginLeft: "93%",
                        }}
                        onClick={() => {
                          this.toggleEditMode();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "rgb(194, 45, 45)",
                          color: "white",
                          marginLeft: "93%",
                        }}
                        onClick={() => {
                          this.submit();
                        }}
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Jumbotron>
            </Col>
          </Row>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Row>
            <Col md={{ span: 1, offset: 0 }}>
              <Button
                style={{ backgroundColor: "rgb(194, 45, 45)", color: "white" }}
                onClick={this.props.toggleMemberView}
              >
                Back
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Jumbotron>
                <Row>
                  <Col md={{ span: 2 }}>
                    <h4>First Name: </h4>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <h4>{this.props.member.first_name}</h4>
                  </Col>
                  <Col md={{ span: 2 }}>
                    <h4>Last Name: </h4>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <h4>{this.props.member.last_name}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 2 }}>
                    <h4>Email: </h4>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <h4>{this.props.member.email}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 2 }}>
                    <h4>Subteam: </h4>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <h4>{this.props.member.subteam_name}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 2 }}>
                    <h4>Team Lead: </h4>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <h4>{this.isTeamLeadText()}</h4>
                  </Col>
                  <Col md={{ span: 2 }}>
                    <h4>Approved: </h4>
                  </Col>
                  <Col md={{ span: 4 }}>
                    <h4>{this.isApprovedText()}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      style={{
                        backgroundColor: "rgb(194, 45, 45)",
                        color: "white",
                        marginLeft: "93%",
                      }}
                      onClick={() => {
                        this.toggleEditMode();
                      }}
                    >
                      Edit
                    </Button>
                  </Col>
                </Row>
              </Jumbotron>
            </Col>
          </Row>
        </React.Fragment>
      );
    }
  }
}

export default Member;
