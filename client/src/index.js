import React from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import ReactGA from "react-ga";
import "./index.css";
import { positions, Provider } from "react-alert";
import AlertTemplate from "./components/HistoricalComponents/AlertTemplate";

//Import desktop pages
import HomePage from "./pages/home";
import StreamingPage from "./pages/streaming";
import AboutPage from "./pages/about";
import SignInPage from "./pages/signin";
import HistoricalPage from "./pages/historical";
import ManagePage from "./pages/manage";
import LicensesPage from "./pages/licenses";
import ErrorPage from "./pages/error";
import SignUpPage from "./pages/signup";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isSignedIn: false
    };
  }

  componentWillMount = () => {
    this.checkToken();
  };

  refreshPage = () => {
    this.checkToken();
  };

  checkToken = () => {
    fetch("/teamMember/checkToken", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 200) this.setState({ isSignedIn: true });
        else this.setState({ isSignedIn: false });
      })
      .catch((err) => {
        this.setState({ isSignedIn: false });
      });
  };

  render = () => {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={() => <HomePage />} />
            <Route exact path="/home" component={() => <HomePage />} />
            <Route
              exact
              path="/streaming"
              component={() => <StreamingPage refreshPage={this.refreshPage} />}
            />
            <Route
              exact
              path="/historical"
              component={() => (
                <Provider template={AlertTemplate} timeout={5000} position={positions.BOTTOM_CENTER}>
                        <HistoricalPage refreshPage={this.refreshPage} />
                    </Provider>
              )}
            />
            <Route
              exact
              path="/manage"
              component={() => <ManagePage refreshPage={this.refreshPage} />}
            />
            <Route exact path="/about" component={() => <AboutPage />} />
            <Route
              exact
              path="/signIn"
              component={() => <SignInPage refreshPage={this.refreshPage} />}
            />
            <Route exact path="/licenses" component={() => <LicensesPage />} />
            <Route exact path="/signUp" component={() => <SignUpPage />} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  };
}

//console.log = console.warn = console.error = () => { };

//Google analytics setup
ReactGA.initialize("UA-168625961-1");
ReactGA.pageview(window.location.pathname + window.location.search);
export default ReactGA;

ReactDOM.render(<App />, document.getElementById("root"));
