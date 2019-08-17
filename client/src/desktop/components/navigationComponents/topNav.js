import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TopNav extends React.Component {
    render = () => {
        return (
            <Navbar bg="dark" variant="dark" style={{ background: '#2A2B2A' }}>
                <Navbar.Brand href="/"><b>Schulich Velocity</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Nav className="mr-auto">
                    <Nav.Item>
                        <Nav.Link href="/streaming">Streaming</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav className='ml-auto'>
                    <Nav.Item>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/signin">Sign In</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        );
    }
}