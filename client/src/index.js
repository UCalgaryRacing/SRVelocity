import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import isMobile from 'react-device-detect';
import './desktop/styling/index.css';

//Import desktop pages 
import HomePage from './desktop/pages/home';
import StreamingPage from './desktop/pages/streaming';
import AboutPage from './desktop/pages/about';
import SignInPage from './desktop/pages/signin';
import LicensesPage from './desktop/pages/licenses';
import ErrorPage from './desktop/pages/error';

//Import mobile pages
import HomePageM from './mobile/pages/home';
import StreamingPageM from './mobile/pages/streaming';
import AboutPageM from './mobile/pages/about';
import SignInPageM from './mobile/pages/signIn';
import LicensesPageM from './mobile/pages/licenses';
import ErrorPageM from './mobile/pages/error';

export default class App extends React.Component {
    render = () => {
        if(!isMobile) {
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
            //Sup Ryan and James, this code basically just renders different components depending on the device that the user is using. What I would like you guys to do is see 
            //if you can make the about, error, home, licenses, notFound, Signin, and streaming pages for mobile, follow the same colour scheme as the rest of the site but
            //feel free to get creative! To do this, edit the code in the pages folder in the mobile folder, feel free to use the code for the desktop version as a reference. To see
            //how the site looks on mobile, cd client then npm i then npm start, then find your IP address and enter it into your browser along with :3000, so like this: IP:3000. You should then
            //be able to see what it's looking like. Please work on the mobile branch. Good luck guys, and have fun!
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

