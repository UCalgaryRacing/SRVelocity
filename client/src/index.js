import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import './desktop/styling/index.css';

//Import desktop pages 
import HomePage from './desktop/pages/home';
import StreamingPage from './desktop/pages/streaming';
import AboutPage from './desktop/pages/about';

export default class App extends React.Component {
    render = () => {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={() => <HomePage />} />
                    <Route exact path="/home" component={() => <HomePage />} />
                    <Route exact path="/streaming" component={() => <StreamingPage />} />
                    <Route exact path="/about" component={() => <AboutPage />} />
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


//COLOR SCHEME
//DARK GREY: #2A2B2A
//LIGHT GREY: #706C61
//DARK RED: #BA1833
//RED: #FF0000

