import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styling/topNavM.css';

export default class TopNavM extends React.Component {

    constructor(props) {
        super(props);
        this.prevYOffset = window.pageYOffset + 50;
        this.state = {
            width: window.innerWidth,
            opacity: 1
        };
    }

    componentDidMount = () => {
        window.addEventListener("resize", this.handleResize);
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount = () => {
        window.removeEventListener("resize", this.handleResize);
        window.removeEventListener("scroll", this.handleScroll)
    }

    handleScroll = () => {
        let currentY = window.pageYOffset;
        let ratio = (this.prevYOffset - currentY) / this.prevYOffset;
        if (ratio < 0) {
            this.setState({
                opacity: 0
            });
        }
        this.setState({
            opacity: ratio
        });
    }

    handleResize = () => {
        this.setState(
            {
                width: window.innerWidth
            }
        )
    }

    render() {
        if (this.state.opacity > 0) {
            return (
                <Navbar id="MobileNavBar" bg="dark" variant="dark" expand="lg" style={{ position: 'fixed', zIndex: '10001', paddingLeft: '20px', paddingRight: '20px', width: `${this.state.width}px`, opacity: `${this.state.opacity}` }}>
                    <Navbar.Brand href="/">
                        <b>Schulich Velocity</b>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/streaming">Streaming</Nav.Link>
                            <div className="dropdown-divider" />
                            <Nav.Link href="/about">About</Nav.Link>
                            <NavDropdown title="Social Media" id="basic-nav-dropdown">
                                <NavDropdown.Item href="https://www.facebook.com/schulichracing/">
                                    <SocialIcon id='socialNavIcon' url='https://www.facebook.com/schulichracing/' target='_blank' />
                                    Facebook
                                    </NavDropdown.Item>
                                <NavDropdown.Item href="https://www.instagram.com/schulich_fsae/">
                                    <SocialIcon id='socialNavIcon' url='https://www.instagram.com/schulich_fsae/' target='_blank' />
                                    Instagram
                                    </NavDropdown.Item>
                                <NavDropdown.Item href="https://www.linkedin.com/company/schulich-racing/">
                                    <SocialIcon id='socialNavIcon' url='https://www.linkedin.com/company/schulich-racing/' target='_blank' />
                                    LinkedIn
                                    </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/licenses">Licenses</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar >
            );
        }
        else {
            return (
                <React.Fragment />
            );
        }

    }
}
