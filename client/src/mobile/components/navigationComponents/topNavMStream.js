import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../desktop/styling/sideNav.css';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default class TopNavM extends React.Component {

    render() {
        return (
            <React.Fragment>
                <SideNav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/streaming">Streaming</Nav.Link>
                        <div className="dropdown-divider" />
                        <Nav.Link href="/about">About</Nav.Link>
                        <NavDropdown title="Social Media" id="basic-nav-dropdown">
                            <NavDropdown.Item href="https://www.facebook.com/schulichracing/">
                                Facebook
                            </NavDropdown.Item>
                            <NavDropdown.Item href="https://www.instagram.com/schulich_fsae/">
                                Instagram
                            </NavDropdown.Item>
                            <NavDropdown.Item href="https://www.linkedin.com/company/schulich-racing/">
                                LinkedIn
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/licenses">Licenses</Nav.Link>
                    </Nav>
                </Navbar.Collapse>


                </SideNav>

            </React.Fragment>
        );
    }
}



