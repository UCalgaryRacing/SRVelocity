import React from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import SocialMedia from './socialMedia';
import '../../styling/bottomNav.css';

export default class BottomNav extends React.Component {
    render = () => {
        return (
            <footer>
                <Navbar id='bottom'>
                    <Navbar.Brand><SocialMedia /></Navbar.Brand>
                    <Nav className='ml-auto'>
                        <Button style={{zIndex: 1000}}className='licensesButton' href='/licenses'><b>Licenses & Attributions</b></Button>
                    </Nav>
                </Navbar>
                <div id='copyright'><p style={{bottom: '0px', position: 'absolute', textAlign: 'center', marginBottom: '13px', width: '100%'}}>Copyright © Schulich Racing FSAE. All Rights Reserved.</p></div>
            </footer>
        );
    }
}