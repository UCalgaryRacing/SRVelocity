import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import {isMobile} from 'react-device-detect';

import './desktop/styling/index.css';

//Import desktop pages 
import HomePage from './desktop/pages/home';
import StreamingPage from './desktop/pages/streaming';
import AboutPage from './desktop/pages/about';
import SignInPage from './desktop/pages/signin';
import LicensesPage from './desktop/pages/licenses';
import ErrorPage from './desktop/pages/error';

//Import mobile pages
import HomePageM from './mobile/pages/homeM';
import StreamingPageM from './mobile/pages/streamingM';
import AboutPageM from './mobile/pages/aboutM';
import SignInPageM from './mobile/pages/signInM';
import LicensesPageM from './mobile/pages/licensesM';
import ErrorPageM from './mobile/pages/errorM';

export default class App extends React.Component {
    render = () => {
        if (!isMobile) {
            return (
                <Router>
                    <Switch>
                        <Route exact path="/" component={() => <HomePage />} />
                        <Route exact path="/home" component={() => <HomePage />} />
                        <Route exact path="/streaming" component={() => <StreamingPage />} />
                        <Route exact path="/about" component={() => <AboutPage />} />
                        <Route exact path="/signIn" component={() => <SignInPage />} />
                        <Route exact path="/licenses" component={() => <LicensesPage />} />
                        <Route component={() => <ErrorPage handleModeChange={this.handleModeChange} />} />
                    </Switch>
                </Router>
            );
        }
        else {
            return (
                <Router>
                    <Switch>
                        <Route exact path="/" component={() => <HomePageM />} />
                        <Route exact path="/home" component={() => <HomePageM />} />
                        <Route exact path="/streaming" component={() => <StreamingPageM />} />
                        <Route exact path="/about" component={() => <AboutPageM />} />
                        <Route exact path="/signIn" component={() => <SignInPageM />} />
                        <Route exact path="/licenses" component={() => <LicensesPageM />} />
                        <Route component={() => <ErrorPageM handleModeChange={this.handleModfeChange} />} />
                    </Switch>
                </Router>
            )
        }
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

//COLOR SCHEME
//DARK GREY: #2A2B2A
//LIGHT GREY: #706C61
//DARK RED: #BA1833
//RED: #FF0000

