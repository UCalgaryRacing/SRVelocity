import React from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import ReactGA from 'react-ga';
import { Redirect } from 'react-router-dom';
import "./desktop/styling/index.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import './wTopBar/css/normalize.css';
// import './wTopBar/css/webflow.css';
// import './wTopBar/css/schulich-velocity.webflow.css';

//Import desktop pages
import HomePage from "./desktop/pages/home";
import StreamingPage from "./desktop/pages/streaming";
import AboutPage from "./desktop/pages/about";
import SignInPage from "./desktop/pages/signin";
import HistoricalPage from "./desktop/pages/historical";
import ManagePage from "./desktop/pages/manage";
import LicensesPage from "./desktop/pages/licenses";
import ErrorPage from "./desktop/pages/error";
import SignUpPage from "./desktop/pages/signup";

import SensorData from "./constants";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSignedIn: false,
			redirect: false
		}
	}

	componentWillMount = () => {
		this.checkToken()
	}

	refreshPage = () => {
		this.checkToken();
	}

	checkToken = () => {
		fetch('18.217.215.72:7000/teamMember/checkToken', {
			method: 'GET',
			credentials: "include",
			headers: { 'Content-Type': 'application/json' }
		})
			.then(res => {
				if (res.status === 200) this.setState({ isSignedIn: true });
				else this.setState({ isSignedIn: false });
			})
			.catch(err => {
				this.setState({ isSignedIn: false });
			})
	}

	signOut = () => {
		fetch('18.217.215.72:7000/teamMember/stopSession', {
			method: 'GET',
			credentials: "include",
			headers: { 'Content-Type': 'application/json' }
		})
			.then(res => {
				if (res.status === 200) this.setState({ isSignedIn: false, redirect: true }, this.checkToken());
				else this.setState({ isSignedIn: false, redirect: true });
			})
			.catch(err => {
				this.setState({ isSignedIn: false, redirect: true });
			})
	}

	render = () => {
		if (this.state.redirect) window.history.replaceState(null, "New Page Title", "/signin")
		return (
			<React.Fragment>
				{/* {this.state.isSignedIn ?
					<div id='topBar'>
						<div data-collapse="medium" data-animation="default" data-duration="400" class="navbar w-nav">
							<div class="container w-container"><a href="/" class="nav-link w-nav-link">Schulich Velocity</a>
								<nav role="navigation" class="nav-menu w-nav-menu"><a href="/streaming" class="nav-link-6 w-nav-link">Streaming</a><a href="/historical" class="nav-link-7 w-nav-link">Historical</a><a href="/manage" class="nav-link-8 w-nav-link">Manage</a><a href="/signin" onClick={this.signOut} class="nav-link-10 w-nav-link">Sign Out</a><a class="nav-link-9 w-nav-link">About</a></nav>
								<div class="menu-button w-nav-button">
									<div class="icon w-icon-nav-menu"></div>
								</div>
							</div>
						</div>
					</div>
					:
					<div id='topBar'>
						<div data-collapse="medium" data-animation="default" data-duration="400" class="navbar w-nav">
							<div class="container w-container"><a href="/" class="nav-link w-nav-link">Schulich Velocity</a>
								<nav role="navigation" class="nav-menu w-nav-menu"><a href="/streaming" class="nav-link-6 w-nav-link">Streaming</a><a href="/historical" class="nav-link-7 w-nav-link">Historical</a><a href="/manage" class="nav-link-8 w-nav-link">Manage</a><a href="/signin" class="nav-link-10 w-nav-link">Sign In</a><a href="/about" class="nav-link-9 w-nav-link">About</a></nav>
								<div class="menu-button w-nav-button">
									<div class="icon w-icon-nav-menu"></div>
								</div>
							</div>
						</div>
					</div>
				} */}
				<Router>
					<Switch>
						<Route exact path="/" component={() => <HomePage />} />
						<Route exact path="/home" component={() => <HomePage />} />
						<Route exact path="/streaming" component={() => <StreamingPage refreshPage={this.refreshPage} />} />
						<Route exact path="/historical" component={() => <HistoricalPage refreshPage={this.refreshPage} />} />
						<Route exact path="/manage" component={() => <ManagePage refreshPage={this.refreshPage} />} />
						<Route exact path="/about" component={() => <AboutPage />} />
						<Route exact path="/signIn" component={() => <SignInPage refreshPage={this.refreshPage} />} />
						<Route exact path="/licenses" component={() => <LicensesPage />} />
						<Route exact path="/signUp" component={() => <SignUpPage />} />
						{/* <Route component={() => <ErrorPage handleModeChange={this.handleModeChange} />} /> */}

					</Switch>
				</Router >
			</React.Fragment>

		);
	};
}

console.log = console.warn = console.error = () => { };

//Google analytics setup
ReactGA.initialize('UA-168625961-1');
ReactGA.pageview(window.location.pathname + window.location.search);
export default ReactGA;

ReactDOM.render(<App />, document.getElementById("root"));
