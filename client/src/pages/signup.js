import React from "react";
import BottomNav from "../components/NavigationComponents/bottomNav";
import { Jumbotron, Row, Col, FormGroup, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./_styling/signup.css";

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
      showError: false,
      errorMsg: "",
    };
  }

  async submit() {
    try {
      const requestURL = "/teamMember";
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
        this.setState({ showError: true });
      } else if (res.status == 400) {
        let msg = await res.json();
        console.log(msg);
        this.setState({ errorMsg: msg.error });
        this.setState({ showError: true });
      } else if (res.status == 200) {
        this.setState({ showConfirmation: true });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // submit = () => {
  //   if (!this.firstName.current.value) this.setState({ showError: true });
  //   else if (!this.lastName.current.value) this.setState({ showError: true });
  //   else if (!this.email.current.value) this.setState({ showError: true });
  //   else if (!this.password.current.value) this.setState({ showError: true });
  //   else if (!this.subteam.current.value) this.setState({ showError: true });
  //   else this.setState({ showConfirmation: true });
  // };

  async fetchSubteams() {
    try {
      let res = await fetch("/subteam/getSubteams", {
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
      console.log(res);
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
                <img id="logoImg" src={require("../assets/logo.svg")} />
              </Col>
            </Row>
            {this.state.showConfirmation ? null : (
              <div>
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
                        as="select"
                        className="emailFormControl"
                        ref={this.subteam}
                        autoComplete="on"
                        placeHolder="Subteam"
                        required
                      >
                        {this.state.optionRender}
                      </Form.Control>
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
                        this.submit();
                      }}
                    >
                      <b>Sign Up</b>
                    </Button>
                  </Col>
                </Row>
              </div>
            )}
            {this.state.showConfirmation
              ? "Request completed! You will gain access once you are approved by an admin."
              : this.state.showError
              ? "Invalid credentials. Please ensure all fields are filled in and try again. " +
                this.state.errorMsg
              : null}
          </Jumbotron>
          <BottomNav />
        </React.Fragment>
      </div>
    );
  };
}

export default withRouter(SignUpPage);
