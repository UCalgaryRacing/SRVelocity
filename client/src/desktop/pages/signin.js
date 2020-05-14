import React from "react";
import TopNav from "../components/navigationComponents/topNav";
import BottomNav from "../components/navigationComponents/bottomNav";
import { Jumbotron, Row, Col, FormGroup, Form, Button } from "react-bootstrap";
import "../styling/signin.css";

export default class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.emailForm = React.createRef();
    this.passwordForm = React.createRef();
  }

  handleEnterKey = async () => {};

  handleSignIn = async () => {
    const signInDetails = await fetch(
      "http://localhost:7000/teamMember/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.emailForm.current.value,
          password: this.passwordForm.current.value,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(signInDetails);
  };

  handleForgotPassword = () => {};

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
                className="forgotPasswordButton"
                onClick={this.handleForgotPassword}
              >
                <b>In Progress!</b>
              </Button>
            </Col>
          </Row>
        </Jumbotron>
        <BottomNav />
      </div>
    );
  };
}
