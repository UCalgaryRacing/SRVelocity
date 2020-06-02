import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import './desktop/styling/index.css';

//Import desktop pages 
import HomePage from './desktop/pages/home';
import StreamingPage from './desktop/pages/streaming';
import AboutPage from './desktop/pages/about';
import SignInPage from './desktop/pages/signin';
import HistoricalPage from './desktop/pages/historical';
import ManagePage from './desktop/pages/manage';
import LicensesPage from './desktop/pages/licenses';
import ErrorPage from './desktop/pages/error';

import SensorData from './constants';

export default class App extends React.Component {
    render = () => {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={() => <HomePage />} />
                    <Route exact path="/home" component={() => <HomePage />} />
                    <Route exact path="/streaming" component={() => <StreamingPage />} />
                    <Route exact path="/historical" component={() => <HistoricalPage />} />
                    <Route exact path="/manage" component={() => <ManagePage />} />
                    <Route exact path="/about" component={() => <AboutPage />} />
                    <Route exact path="/signIn" component={() => <SignInPage />} />
                    <Route exact path="/licenses" component={() => <LicensesPage />} />
                    {/* <Route component={() => <ErrorPage handleModeChange={this.handleModeChange} />} /> */}
                </Switch>
                <div data-collapse="medium" data-animation="default" data-duration="400" class="navbar w-nav">
                    <div class="container w-container"><a href="/" class="nav-link w-nav-link">Schulich Velocity</a>
                        <nav role="navigation" class="nav-menu w-nav-menu"><a href="/streaming" class="nav-link-6 w-nav-link">Streaming</a><a href="/historical" class="nav-link-7 w-nav-link">Historical</a><a href="/manage" class="nav-link-8 w-nav-link">Manage</a><a href="/signin" class="nav-link-9 w-nav-link">Sign In</a><a href="/about" class="nav-link-10 w-nav-link">About</a></nav>
                        <div class="menu-button w-nav-button">
                            <div class="icon w-icon-nav-menu"></div>
                        </div>
                    </div>
                </div>
                <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.4.1.min.220afd743d.js?site=5ea6989e70b505c4b14abb56" type="text/javascript" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
                <script src="wTopBar/js/webflow.js" type="text/javascript"></script>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

