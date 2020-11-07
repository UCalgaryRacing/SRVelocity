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