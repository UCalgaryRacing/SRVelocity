import React from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import ReactGA from 'react-ga';
import "./desktop/styling/index.css";

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
import TopNav from './desktop/components/navigationComponents/topNav';

import SensorData from "./constants";

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	refreshPage = () => {
		this.setState({});
	}

	render = () => {
		return (
			<Router>
				<TopNav/>
				<Switch>
					<Route exact path="/" component={() => <HomePage />} />
					<Route exact path="/home" component={() => <HomePage />} />
					<Route exact path="/streaming" component={() => <StreamingPage refreshPage={this.refreshPage}/>} />
					<Route exact path="/historical" component={() => <HistoricalPage />} />
					<Route exact path="/manage" component={() => <ManagePage />} />
					<Route exact path="/about" component={() => <AboutPage />} />
					<Route exact path="/signIn" component={() => <SignInPage />} />
					<Route exact path="/licenses" component={() => <LicensesPage />} />
					<Route exact path="/signUp" component={() => <SignUpPage />} />
					{/* <Route component={() => <ErrorPage handleModeChange={this.handleModeChange} />} /> */}
				</Switch>
			</Router >
		);
	};
}

//Google analytics setup
ReactGA.initialize('UA-168625961-1');
ReactGA.pageview(window.location.pathname + window.location.search);
export default ReactGA;

ReactDOM.render(<App />, document.getElementById("root"));
