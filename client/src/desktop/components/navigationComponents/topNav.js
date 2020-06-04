import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import {Helmet} from "react-helmet";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styling/topNav.css';
import './wTopBar/css/normalize.css';
import './wTopBar/css/webflow.css';
import './wTopBar/css/schulich-velocity.webflow.css';

export default class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            redirect: false
        }
    }

    componentWillMount = () => {
        this.checkToken();
    }

    checkToken = () => {
        fetch('http://localhost:7000/teamMember/checkToken', {
            method: 'GET',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if (res.status === 200) this.setState({ isSignedIn: true });
                else {
                    this.setState({ isSignedIn: false });
                }
            })
            .catch(err => { this.setState({ isSignedIn: false }); });
    }

    signOut = () => {
        fetch('http://localhost:7000/teamMember/stopSession', {
            method: 'GET',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if (res.status === 200) {
                    this.setState({ isSignedIn: false });
                }
            })
            .catch(err => { this.setState({ isSignedIn: false }) });
    }

    render = () => {
        return (
            <div style={{ textAlign: 'left' }}>
                {
                    this.state.isSignedIn ?
                        <div>
                            <div data-collapse="medium" data-animation="default" data-duration="400" class="navbar w-nav">
                                <div class="container w-container"><a href="/" class="nav-link w-nav-link">Schulich Velocity</a>
                                    <nav role="navigation" class="nav-menu w-nav-menu"><a href="/streaming" class="nav-link-6 w-nav-link">Streaming</a><a href="/historical" class="nav-link-7 w-nav-link">Historical</a><a href="/manage" class="nav-link-8 w-nav-link">Manage</a><a href="signin" onClick={this.signOut} class="nav-link-9 w-nav-link">Sign Out</a><a href="/about" class="nav-link-10 w-nav-link">About</a><a href="/about" class="nav-link-10 w-nav-link">About</a><a href="/signup" class="nav-link-9 w-nav-link" style={{display: 'none'}}>Sign Up</a></nav>
                                    <div class="menu-button w-nav-button">
                                        <div class="icon w-icon-nav-menu"></div>
                                    </div>
                                </div>
                            </div>
                            <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.4.1.min.220afd743d.js?site=5ea6989e70b505c4b14abb56" type="text/javascript" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
                            <script src="/wTopBar/js/webflow.js" async="true" type="text/javascript"></script>
                            <script src="http://localhost:3000/wTopBar/js/webflow.js" type="text/javascript"></script>
                        </div>
                        :
                        < div >
                            <div data-collapse="medium" data-animation="default" data-duration="400" class="navbar w-nav">
                                <div class="container w-container"><a href="/" class="nav-link w-nav-link">Schulich Velocity</a>
                                    <nav role="navigation" class="nav-menu w-nav-menu"><a href="/streaming" class="nav-link-6 w-nav-link">Streaming</a><a href="/signin" class="nav-link-9 w-nav-link">Sign In</a><a href="/about" class="nav-link-10 w-nav-link">About</a><a href="/signup" class="nav-link-9 w-nav-link" style={{display: 'none'}}>Sign Up</a></nav>
                                    <div class="menu-button w-nav-button">
                                        <div class="icon w-icon-nav-menu"></div>
                                    </div>
                                </div>
                            </div>
                            <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.4.1.min.220afd743d.js?site=5ea6989e70b505c4b14abb56" type="text/javascript" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
                            <script src="/wTopBar/js/webflow.js" async="true" type="text/javascript"></script>
                            <script src="http://localhost:3000/wTopBar/js/webflow.js" type="text/javascript"></script>
                        </div>
                }
            </div>
        );
    }
}