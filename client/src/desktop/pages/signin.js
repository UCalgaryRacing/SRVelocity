import React from "react";
import TopNav from "../components/navigationComponents/topNav";
import BottomNav from "../components/navigationComponents/bottomNav";
import { Jumbotron, Row, Col, FormGroup, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import "../styling/signin.css";

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.emailForm = React.createRef();
    this.passwordForm = React.createRef();
    this.state = {
      errorMessage: null,
    };
  }

  handleEnterKey = async () => {};

  handleSignIn = async () => {
    try {
      const res = await fetch("http://localhost:7000/teamMember/authenticate", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.emailForm.current.value,
          password: this.passwordForm.current.value,
        }),
      });
      console.log(res.status);
      const resJSON = await res.json();

      if (!res.ok) {
        console.log(resJSON.error);
        this.setState({ errorMessage: resJSON.error });
        throw new Error(res.status);
      }

      this.props.history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  handleForgotPassword = () => {};

  handleSignUpRedirct() {
    this.props.history.push("/signup");
  }
  render = () => {
    return (
      <div id="signIn">
        <TopNav />
        <Jumbotron>
          <Row id="row1">
            <Col>
              <img id="logoImg" src={require("../../assets/logo.svg")} />
            </Col>
          </Row>
          <Row id="row2">
            <Col>
              <Form className="emailForm">
                <Form.Control
                  className="emailFormControl"
                  ref={this.emailForm}
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
                  ref={this.passwordForm}
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
              <Button className="signInButton" onClick={this.handleSignIn}>
                <b>Sign In</b>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                className="signInButton"
                onClick={() => {
                  this.handleSignUpRedirct();
                }}
              >
                <b>Sign Up</b>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                className="signInButton"
                onClick={this.handleForgotPassword}
              >
                <b>In Progress!</b>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <b>{this.state.errorMessage}</b>
            </Col>
          </Row>
        </Jumbotron>
        <BottomNav />
      </div>
    );
  };
}

export default withRouter(SignInPage);
