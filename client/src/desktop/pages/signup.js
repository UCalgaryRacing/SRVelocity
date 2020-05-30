import React from "react";
import TopNav from "../components/navigationComponents/topNav";
import BottomNav from "../components/navigationComponents/bottomNav";
import { Jumbotron, Row, Col, FormGroup, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import "../styling/signin.css";

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.firstName = React.createRef();
    this.lastName = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
    this.subteam = React.createRef();
    this.state = {
      currentUser: "Not Logged In",
      optionRender: [],
    };
  }

  async submit() {
    try {
      const requestURL = "http://localhost:7000/teamMember/postTeamMember";
      let res = await fetch(requestURL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: this.firstName.current.value,
          lastName: this.lastName.current.value,
          email: this.email.current.value,
          subteamName: this.subteam.current.value,
          password: this.password.current.value,
        }),
      });
      if (res.status == 500) {
        console.log("ERROR");
      } else if (res.status == 400) {
        console.log(res);
      } else if (res.status == 200) {
        this.props.history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async fetchSubteams() {
    try {
      let res = await fetch("http://localhost:7000/subteam/getSubteams", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      res = await res.json();
      if (res.status == 401) {
        console.log("LOG IN REQUIRED");
        this.props.history.push("/signin");
      }
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

  render = () => {
    return (
      <React.Fragment>
        <Jumbotron>
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
                      <Form.Control type="input" ref={this.firstName} />
                    </Col>
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Last Name:</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control type="input" ref={this.lastName} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="email">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Email:</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control type="email" ref={this.email} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="password">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Password</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control type="password" ref={this.password} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="subteam">
                    <Col md={{ span: 2 }}>
                      <Form.Label>
                        <h4>Subteam</h4>
                      </Form.Label>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Form.Control as="select" ref={this.subteam}>
                        {this.state.optionRender}
                      </Form.Control>
                    </Col>
                  </Form.Group>
                  <Row>
                    <Col>
                      <Button
                        style={{
                          backgroundColor: "rgb(194, 45, 45)",
                          color: "white",
                          float: "right",
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
        </Jumbotron>
      </React.Fragment>
    );
  };
}

export default withRouter(SignUpPage);
