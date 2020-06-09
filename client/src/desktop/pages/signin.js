import React from "react";
import BottomNav from "../components/navigationComponents/bottomNav";
import { Jumbotron, Row, Col, FormGroup, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "../styling/signin.css";

class SignInPage extends React.Component {
	constructor(props) {
		super(props);
		this.emailForm = React.createRef();
		this.passwordForm = React.createRef();
		this.state = {
			showErrorMessage: false,
			showConfirmationMessage: false,
			isSignedIn: false
		};
	}

	handleEnterKey = async () => { };

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
			const resJSON = await res.json();
			if (!res.ok) {
				this.setState({ showErrorMessage: true, showConfirmationMessage: false });
				throw new Error(res.status);
			}
			sessionStorage.setItem("Name", resJSON.firstName + " " + resJSON.lastName);
			sessionStorage.setItem("ID", resJSON.ID);
			this.setState({ isSignedIn: true, showErrorMessage: false, showConfirmationMessage: true });
		} catch (err) {
			console.log(err);
		}
	};

	handleForgotPassword = () => { };
	render = () => {
		return (
			<div id="signIn">
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
							{this.state.showErrorMessage ? <p><b>Oops! Please try again.</b></p>: null}
							{this.state.showConfirmationMessage ? <p><b>Success!</b></p>: null}
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
								href="/signup"
							>
								<b>Sign Up</b>
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
