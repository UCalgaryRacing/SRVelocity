import React from "react";
import Sidebar from "react-sidebar"
import { NavItem } from '@trendmicro/react-sidenav';
import Collapsible from 'react-collapsible'
import Settings from '../settingsComponentsM/settingsM.js'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Nav } from 'react-bootstrap'

import '../../styling/sideNavM.css';
import '../../styling/sideNavToggleM.css'
import '../../styling/topNavM.css'
 
export default class SideNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          sidebarOpen: false
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
      }
    
    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }
    
    render(){
        return(
            <Sidebar
                sidebar={
                    <React.Fragment>
                        <NavItem eventKey='Dashboard' onSelect={() => {this.props.streamingContent.current.changeContent(this)}}>
                            <button class="tab-button">Dashboard</button>
                        </NavItem>
                        <NavItem eventKey='Suspension'>
                            <button class="tab-button">Suspension</button>
                        </NavItem>
                        <NavItem eventKey='Powertrain'>
                            <Collapsible trigger="Powertrain">
                                <button eventKey='RPM' class="collapse-content-button">RPM</button>
                                <button eventKey='TP' class="collapse-content-button">Throttle Position</button>
                                <button eventKey='IPW' class="collapse-content-button">Injector Pulse Width</button>
                                <button eventKey='Barometer' class="collapse-content-button">Barometer</button>
                                <button eventKey='MAP' class="collapse-content-button">Manifold Air Pressure</button>
                                <button eventKey='ATF' class="collapse-content-button">Air to Fuel</button>
                                <button eventKey='IAT' class="collapse-content-button">Intake Air Temperature</button>
                                <button eventKey='ET' class="collapse-content-button">Engine Temperature</button>
                                <button eventKey='OP' class="collapse-content-button">Oil Pressure</button>
                                <button eventKey='OT' class="collapse-content-button">Oil Temperature</button>
                                <button eventKey='FT' class="collapse-content-button">Fuel Temperature</button>
                            </Collapsible>
                        </NavItem>
                        <NavItem eventKey='Acceleration'>
                            <button class="tab-button">Acceleration</button>
                        </NavItem>
                        <NavItem eventKey='Roll'>
                            <button class="tab-button">Roll</button>
                        </NavItem>
                        <NavItem eventKey='Pitch'>
                            <button class="tab-button">Pitch</button>
                        </NavItem>
                        <NavItem eventKey='Yaw'>
                            <button class="tab-button">Yaw</button>
                        </NavItem>
                        <NavItem eventKey='TrackMap'>
                            <button class="tab-button">Track Map</button>
                        </NavItem>
                        <NavItem eventKey='Speed'>
                            <button class="tab-button">Speed</button>
                        </NavItem>
                        <NavItem eventKey='Distance'>
                            <button class="tab-button">Distance</button>
                        </NavItem>
                        <NavItem>
                            <Nav.Link className="navbar-nav-home" href="/">Home</Nav.Link>
                            <Nav.Link className="navbar-nav-about" href="/about">About</Nav.Link>
                            <Nav.Link className="navbar-nav-signIn" href="/signIn">Sign In</Nav.Link>
                            {/* <SettingsM class="settings-icon" /> */}
                        </NavItem>
                    </React.Fragment>
                }
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { width: "175px", height: "100%", background: "rgb(194, 45, 45)", position: "fixed" } }}
            >
                <div class="container" onClick={() => this.onSetSidebarOpen(true)}>
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                </div>
            </Sidebar>

        );
    }
}