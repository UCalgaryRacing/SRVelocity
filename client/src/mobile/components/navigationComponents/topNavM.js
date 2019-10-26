import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TopNavM extends React.Component {
    state = {}
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <div Button />
                <Navbar.Brand href="/">
                    <b>Schulich Velocity</b>
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="/signIn">Sign In</Nav.Link>
                </Nav>
                <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/licenses">Licenses</Nav.Link>
                        <div className="dropdown-divider" />
                        <Nav.Link href="/streaming">Streaming</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}