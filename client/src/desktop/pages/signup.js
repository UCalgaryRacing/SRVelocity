import React from "react";
import BottomNav from "../components/navigationComponents/bottomNav";
import { Jumbotron, Row, Col, FormGroup, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "../styling/signUp.css";

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
      showConfirmation: false,
    };
  }

  async submit() {
    // this.setState({ showConfirmation: true });
    // try {
    //   const requestURL = "http://localhost:7000/teamMember/postTeamMember";
    //   let res = await fetch(requestURL, {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       firstName: this.firstName.current.value,
    //       lastName: this.lastName.current.value,
    //       email: this.email.current.value,
    //       subteamName: this.subteam.current.value,
    //       password: this.password.current.value,
    //     }),
    //   });
    //   if (res.status == 500) {
    //     console.log("ERROR");
    //   } else if (res.status == 400) {
    //     console.log(res);
    //   } else if (res.status == 200) {
    //     this.props.history.push("/");
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  }

  async fetchSubteams() {
    try {
      let res = await fetch("http://localhost:7000/subteam/getSubteams", {
        method: "GET",
        //credentials: "include",
        headers: {
          "Content-Type": "application/json",
          apikey: "VQ2SBXW-1N14EQ7-PWX5JBZ-C5S45FA",
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
      <div id="signUp">
        <React.Fragment>
          <Jumbotron style={{ background: "white" }}>
            <Row id="row">
              <Col>
                <img id="logoImg" src={require("../../assets/logo.svg")} />
              </Col>
            </Row>
            <Row id="row">
              <Col>
                <Form className="emailForm">
                  <Form.Control
                    className="emailFormControl"
                    ref={this.firstName}
                    autoComplete="on"
                    placeHolder="First Name"
                    required
                  />
                </Form>
              </Col>
            </Row>
            <Row id="row">
              <Col>
                <Form className="emailForm">
                  <Form.Control
                    className="emailFormControl"
                    ref={this.lastName}
                    autoComplete="on"
                    placeHolder="Last Name"
                    required
                  />
                </Form>
              </Col>
            </Row>
            <Row id="row">
              <Col>
                <Form className="emailForm">
                  <Form.Control
                    className="emailFormControl"
                    ref={this.subteam}
                    autoComplete="on"
                    placeHolder="Subteam"
                    required
                  />
                </Form>
              </Col>
            </Row>
            <Row id="row">
              <Col>
                <Form className="emailForm">
                  <Form.Control
                    className="emailFormControl"
                    ref={this.email}
                    autoComplete="on"
                    placeHolder="Email"
                    required
                  />
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form className="passwordForm">
                  <Form.Control
                    className="passwordFormControl"
                    ref={this.password}
                    type="password"
                    autoComplete="on"
                    placeHolder="Password"
                    required
                  />
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  className="signInButton"
                  onClick={() => {
                    this.setState({ showConfirmation: true });
                  }}
                >
                  <b>Sign Up</b>
                </Button>
              </Col>
            </Row>
            {this.state.showConfirmation
              ? "Request completed! You will gain access once you are approved by an admin."
              : null}
          </Jumbotron>
          <BottomNav />
        </React.Fragment>
      </div>
    );
  };
}

export default withRouter(SignUpPage);
