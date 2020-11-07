import React from 'react'
import { Nav, Navbar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './_styling/topNav.css';

export default class TopNav extends React.Component {
    render = () => {
        return (
            <header>
                <Navbar id='top' collapseOnSelect expand="sm" bg="dark" variant="dark" fixed="top">
                    <Navbar.Brand className="link-0" href="/">SR Velocity</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='mr-auto'>
                        <Nav.Link className="link-1" href="/streaming">Streaming</Nav.Link> 
                        <Nav.Link className="link-2" href="/historical">Historical</Nav.Link> 
                        <Nav.Link className="link-3" href="/manage">Manage</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link className="link-4" href="/about">About</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
               </Navbar> 
            </header>
        );
    }
}

{/*
const topNav = () => {
    return (
        <div>
            <Navbar className="navBar" bg="dark" variant="dark" fixed="top" style={{fontSize: 8}}>
                <Navbar.Brand href="home" style={{fontSize: 32}}>SR Velocity</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="streaming">Streaming</Nav.Link>
                        <Nav.Link href="historical">Historical</Nav.Link>
                        <Nav.Link href="manage">Manage</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link eventKey={2} href="about">
                            About
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default topNav
*/}
{/* OLD CODE :::: import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Helmet } from "react-helmet";
import 'bootstrap/dist/css/bootstrap.min.css';
import './_styling/topNav.css';
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
                                                                    */}