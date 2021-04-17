import React from "react";
import BottomNav from "../components/NavigationComponents/bottomNav";
import { Jumbotron, Row, Col, Form, Button, FormGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./_styling/signin.css";
import TopNav from "../components/NavigationComponents/topNav";

class SignInPage extends React.Component {
	constructor(props) {
		super(props);
		this.emailForm = React.createRef();
		this.passwordForm = React.createRef();
		this.state = {
			showErrorMessage: false,
			isSignedIn: false
		};
	}

	handleEnterKey = async (e) => {
		e.preventDefault();
		if (this.emailForm.current.value === "") {

		} else if (this.passwordForm.current.value === "") {

		} else this.handleSignIn();
	};

	handleSignIn = async () => {
		try {
			const res = await fetch("/teamMember/authenticate", {
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
			this.setState({ isSignedIn: true, showErrorMessage: false });
			this.props.refreshPage();
			this.props.history.push('/historical')
		} catch (err) {
			console.log(err);
		}
	};

	handleForgotPassword = () => { };

	render = () => {
		return (
			<div id="signIn">
				<TopNav />
				<Jumbotron>
					<Row id="row1">
						<Col>
							<img id="logoImg" src={require("../assets/logo.svg")} />
						</Col>
					</Row>
					<p style={{ textAlign: 'center' }}>Looking to log in? Email: guest@sv.com ; Password: fsae2020</p>
					<FormGroup onSubmit={this.handleEnterKey}>
						<Row id="row2">
							<Col>
								<Form className="emailForm">
									<Form.Control
										className="emailFormControl"
										ref={this.emailForm}
										autoComplete="on"
										placeHolder="Email"
										required
										onSubmit={this.handleEnterKey}
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
										onSubmit={this.handleEnterKey}
									/>
								</Form>
							</Col>
						</Row>
					</FormGroup>
					<Row>
						<Col>
							{this.state.showErrorMessage ? <p><b>Oops! Please try again.</b></p> : null}
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
