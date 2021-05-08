import React from "react";
import { Row, Col, Button, Jumbotron, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { fetchWrapper } from '../../fetchWrapper';

class Member extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      leadIsChecked: this.props.member.is_lead,
      approvedIsChecked: this.props.member.is_approved,
      optionRender: [],
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

  async fetchSubteams() {
    try {
      let res = await fetchWrapper.get("18.217.215.72:7000/subteam/getSubteams");
      if (res.status == 401) {
        console.log("LOG IN REQUIRED");
        this.props.history.push("/signin");
      }
      res = await res.json();
      return await res;
    } catch (err) {
      console.log(err);
    }
  }

  async createOptions() {
    let subteamRender = [];
    let subteamList = await this.fetchSubteams();
    console.log(subteamList);
    subteamList.forEach((ele) => {
      subteamRender.push(<option>{ele.name}</option>);
    });
    this.setState({ optionRender: subteamRender });
  }

  async componentDidMount() {
    this.createOptions();
  }

  async errorDisplay(res, resJSON) {
    if (res.status == 401) {
      this.props.history.push("/signin");
    } else if (res.status == 500) {
      this.setState({
        errorRender: [<p>ERROR 500: Something went wrong</p>],
      });
    } else if (res.status == 400) {
      this.setState({ errorRender: [<p>{resJSON.error}</p>] });
      console.log(res);
    } else if (res.status == 200) {
      this.props.refreshList();
      this.props.toggleMemberView();
    }
  }

  async submit() {
    try {
      const requestURL = "18.217.215.72:7000/teamMember/" + this.props.member.member_id;
      let body = {
        firstName: this.firstName.current.value,
        lastName: this.lastName.current.value,
        isLead: this.state.leadIsChecked,
        isApproved: this.state.approvedIsChecked,
        email: this.email.current.value,
        subteamName: this.subteam.current.value
      }
      const res = await fetchWrapper.put(requestURL, body);
      const resJSON = await res.json();
      this.errorDisplay(res, resJSON);
      // if (res.status == 401) {
      //   console.log("LOG IN REQUIRED");
      //   this.props.history.push("/signin");
      // } else if (res.status == 500) {
      //   console.log("ERROR");
      // } else if (res.status == 400) {
      //   console.log(res);
      // } else if (res.status == 200) {
      //   this.props.refreshList();
      //   this.props.toggleMemberView();
      // }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteMember() {
    try {
      const requestURL = "18.217.215.72:7000/teamMember/" + this.props.member.member_id;
      const res = await fetchWrapper.delete(requestURL);
      const resJSON = res.json();
      this.errorDisplay(res, resJSON);
      // if (res.status == 401) {
      //   console.log("LOG IN REQUIRED");
      //   this.props.history.push("/signin");
      // } else if (res.status == 500) {
      //   console.log("ERROR");
      // } else if (res.status == 400) {
      //   console.log(res);
      // } else if (res.status == 200) {
      //   this.props.refreshList();
      //   this.props.toggleMemberView();
      // }
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
                        as="select"
                        defaultValue={this.props.member.subteam_name}
                        ref={this.subteam}
                      >
                        {this.state.optionRender}
                      </Form.Control>
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
                      <div style={{ display: "inline-block", float: "right" }}>
                        <Button
                          style={{
                            backgroundColor: "rgb(194, 45, 45)",
                            color: "white",
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
                          }}
                          onClick={() => {
                            this.submit();
                          }}
                        >
                          Submit
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "rgb(194, 45, 45)",
                            color: "white",
                          }}
                          onClick={() => {
                            this.deleteMember();
                          }}
                        >
                          Delete User
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <Row>{this.state.errorRender}</Row>
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
                        float: "right",
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

export default withRouter(Member);
