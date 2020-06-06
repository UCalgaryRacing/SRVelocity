import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Helmet } from "react-helmet";
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

    render = () => {
        return (
            <div style={{ textAlign: 'left' }}>

            </div>
        );
    }
}